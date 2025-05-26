"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Trophy, Medal, Award, Search, Brain, Network, Cpu, GraduationCap, Trash2, Pencil, Check, X, AlertTriangle, Shield, Layout } from "lucide-react"
import { useLeaderboard } from "./leaderboard-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

interface LeaderboardProps {
  onBack: () => void
}

export default function Leaderboard({ onBack }: LeaderboardProps) {
  const { getTopScores, getPlayerStats, clearAllScores, deleteScore, editPlayerName, getAllPlayers } = useLeaderboard()
  const [searchPlayer, setSearchPlayer] = useState("")
  const [playerStats, setPlayerStats] = useState<any>(null)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [editingScoreId, setEditingScoreId] = useState<string | null>(null)
  const [newPlayerName, setNewPlayerName] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<string[]>([])
  const [showAutocomplete, setShowAutocomplete] = useState(false)

  const handlePlayerSearch = () => {
    if (searchPlayer.trim()) {
      const stats = getPlayerStats(searchPlayer.trim())
      setPlayerStats({ ...stats, playerName: searchPlayer.trim() })
    }
  }

  const handleClearScores = () => {
    // التحقق من أن المستخدم هو DeNgO قبل السماح بحذف سجل المتصدرين
    const adminName = "DeNgO";
    const currentPlayerName = localStorage.getItem("techGamePlayerName");
    
    if (currentPlayerName === adminName) {
      clearAllScores();
      setShowClearConfirm(false);
      setPlayerStats(null);
    } else {
      alert("فقط المسؤول يمكنه حذف سجل المتصدرين");
      setShowClearConfirm(false);
    }
  }
  
  const handleStartEditing = (id: string, currentName: string) => {
    setEditingScoreId(id)
    setNewPlayerName(currentName)
  }
  
  const handleSaveEdit = (id: string) => {
    if (newPlayerName.trim()) {
      editPlayerName(id, newPlayerName)
      setEditingScoreId(null)
      setNewPlayerName("")
      
      // Update player stats if we're viewing this player
      if (playerStats && playerStats.playerName.toLowerCase() === newPlayerName.toLowerCase()) {
        setPlayerStats({
          ...playerStats,
          playerName: newPlayerName.trim()
        })
      }
    }
  }
  
  const handleCancelEdit = () => {
    setEditingScoreId(null)
    setNewPlayerName("")
  }
  
  const handleDeleteScore = (id: string) => {
    // التحقق من أن المستخدم هو DeNgO قبل السماح بحذف أي سجل
    const adminName = "DeNgO";
    const currentPlayerName = localStorage.getItem("techGamePlayerName");
    
    if (currentPlayerName === adminName) {
      deleteScore(id);
      setShowDeleteConfirm(null);
      
      // If we deleted a score from the player we're viewing, refresh stats
      if (playerStats) {
        const stats = getPlayerStats(playerStats.playerName);
        if (stats.totalGames === 0) {
          setPlayerStats(null); // Player has no more scores
        } else {
          setPlayerStats({
            ...stats,
            playerName: playerStats.playerName
          });
        }
      }
    } else {
      alert("فقط المسؤول يمكنه حذف سجلات المتصدرين");
      setShowDeleteConfirm(null);
    }
  }
  
  const handleSearchInputChange = (value: string) => {
    setSearchPlayer(value)
    
    if (value.trim().length > 1) {
      const allPlayers = getAllPlayers()
      const filtered = allPlayers.filter(name => 
        name.toLowerCase().includes(value.toLowerCase())
      )
      setAutocompleteSuggestions(filtered.slice(0, 5))
      setShowAutocomplete(filtered.length > 0)
    } else {
      setShowAutocomplete(false)
    }
  }
  
  const handleSelectSuggestion = (name: string) => {
    setSearchPlayer(name)
    setShowAutocomplete(false)
    // Auto search with the selected name
    const stats = getPlayerStats(name)
    setPlayerStats({ ...stats, playerName: name })
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ar-SA", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getGameIcon = (game: string) => {
    switch (game) {
      case "quiz":
        return <Brain className="w-4 h-4" />
      case "matching":
        return <Network className="w-4 h-4" />
      case "flappy-tech":
        return <Cpu className="w-4 h-4" />
      case "cyber-security":
        return <Shield className="w-4 h-4" />
      case "ui-design":
        return <Layout className="w-4 h-4" />
      default:
        return <Trophy className="w-4 h-4" />
    }
  }

  const getGameName = (game: string) => {
    switch (game) {
      case "quiz":
        return "تحدي الاختبار التقني"
      case "matching":
        return "شبكة المفاهيم التقنية"
      case "flappy-tech":
        return "مغامرة الكود الطائر"
      case "cyber-security":
        return "تحدي الأمن السيبراني"
      case "ui-design":
        return "تصميم واجهات المستخدم"
      default:
        return game
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-400" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-300" />
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-400">#{rank}</span>
    }
  }

  const ScoreTable = ({ scores, showGame = false }: { scores: any[]; showGame?: boolean }) => (
    <div className="space-y-3">
      {scores.length === 0 ? (
        <div className="text-center py-12">
          <div className="relative mx-auto mb-4">
            <Trophy className="w-16 h-16 mx-auto text-gray-500 opacity-50" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
              <GraduationCap className="w-3 h-3 text-white" />
            </div>
          </div>
          <p className="text-high-contrast text-lg">لا توجد نقاط بعد</p>
          <p className="text-medium-contrast text-sm mt-2">كن أول من يحقق إنجازاً في كلية تقنية المعلومات!</p>
        </div>
      ) : (
        scores.map((score, index) => (
          <Card
            key={score.id}
            className="backdrop-blur-lg bg-white/5 border-white/20 hover:bg-white/10 transition-all duration-300"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">{getRankIcon(index + 1)}</div>
                  <div className="flex-grow">
                    {editingScoreId === score.id ? (
                      <div className="flex items-center gap-2">
                        <Input 
                          value={newPlayerName} 
                          onChange={(e) => setNewPlayerName(e.target.value)}
                          className="border-blue-500/50 bg-blue-500/10 text-high-contrast w-full"
                          placeholder="اسم اللاعب"
                        />
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => handleSaveEdit(score.id)}
                          className="text-green-500 hover:text-green-400 hover:bg-green-500/10"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={handleCancelEdit}
                          className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="font-bold text-high-contrast text-lg">{score.playerName}</div>
                    )}
                    <div className="text-sm text-medium-contrast flex items-center gap-3">
                      {showGame && (
                        <>
                          <Badge variant="outline" className="border-blue-500/50 text-blue-300 badge-high-contrast">
                            {getGameName(score.game)}
                          </Badge>
                          <span className="text-gray-500">•</span>
                        </>
                      )}
                      <span>{formatDate(score.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="font-bold text-2xl bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                      {score.percentage}%
                    </div>
                    <div className="text-sm text-medium-contrast">
                      {score.score}/{score.maxScore} نقطة
                    </div>
                  </div>
                  {/* Edit and Delete Buttons */}
                  <div className="flex flex-col gap-1 mr-3">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => handleStartEditing(score.id, score.playerName)}
                      className="h-7 w-7 text-blue-500 hover:text-blue-400 hover:bg-blue-500/10"
                      disabled={editingScoreId !== null}
                    >
                      <Pencil className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => setShowDeleteConfirm(score.id)}
                      className="h-7 w-7 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                      disabled={editingScoreId !== null}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Delete Confirmation */}
              {showDeleteConfirm === score.id && (
                <div className="mt-3 p-2 bg-red-500/20 border border-red-500/40 rounded-md flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-200">
                    <AlertTriangle className="w-4 h-4" />
                    <span>هل أنت متأكد من حذف هذا السجل؟</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => handleDeleteScore(score.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      حذف
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setShowDeleteConfirm(null)}
                      className="border-red-500/50 text-red-200 hover:bg-red-500/10"
                    >
                      إلغاء
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden"
      dir="rtl"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <Button onClick={onBack} variant="ghost" className="mb-4 text-white hover:text-purple-300">
          <ArrowRight className="w-4 h-4 ml-2" />
          العودة للقائمة
        </Button>

        <Card className="mb-6 backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Trophy className="w-8 h-8 text-yellow-400" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <CardTitle className="text-3xl text-white">قاعة المتميزين</CardTitle>
                  <p className="text-purple-300 font-medium">كلية تقنية المعلومات - جامعة اجدابيا</p>
                </div>
              </div>
              <Button
                onClick={() => setShowClearConfirm(true)}
                variant="outline"
                className="border-red-500/30 text-red-300 hover:bg-red-500/10 hover:border-red-500/50"
              >
                <Trash2 className="w-4 h-4 ml-2" />
                مسح البيانات
              </Button>
            </div>
            <p className="text-center text-gray-300">تكريم للطلاب المتميزين في الألعاب التعليمية التفاعلية</p>
          </CardHeader>
        </Card>

        {/* Clear confirmation dialog */}
        {showClearConfirm && (
          <Card className="mb-6 backdrop-blur-lg bg-red-900/20 border-red-500/30 shadow-2xl">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-white">تأكيد مسح البيانات</h3>
                <p className="text-gray-300">هل أنت متأكد من أنك تريد مسح جميع النقاط والإحصائيات؟</p>
                <p className="text-red-300 text-sm">هذا الإجراء لا يمكن التراجع عنه!</p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={handleClearScores} className="bg-red-600 hover:bg-red-700 text-white">
                    نعم، امسح البيانات
                  </Button>
                  <Button
                    onClick={() => setShowClearConfirm(false)}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    إلغاء
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overall" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="overall" className="data-[state=active]:bg-white/20 text-white">
              عام
            </TabsTrigger>
            <TabsTrigger value="quiz" className="data-[state=active]:bg-white/20 text-white">
              الاختبار
            </TabsTrigger>
            <TabsTrigger value="matching" className="data-[state=active]:bg-white/20 text-white">
              الشبكة
            </TabsTrigger>
            <TabsTrigger value="flappy" className="data-[state=active]:bg-white/20 text-white">
              المغامرة
            </TabsTrigger>
            <TabsTrigger value="cyber-security" className="data-[state=active]:bg-white/20 text-white">
              الأمن السيبراني
            </TabsTrigger>
            <TabsTrigger value="ui-design" className="data-[state=active]:bg-white/20 text-white">
              التصميم
            </TabsTrigger>
            <TabsTrigger value="player" className="data-[state=active]:bg-white/20 text-white">
              إحصائيات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overall">
            <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  أفضل الطلاب - جميع الألعاب
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScoreTable scores={getTopScores(undefined, 20)} showGame={true} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quiz">
            <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-6 h-6 text-blue-400" />
                  تحدي الاختبار التقني - أعلى النقاط
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScoreTable scores={getTopScores("quiz")} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matching">
            <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Network className="w-6 h-6 text-green-400" />
                  شبكة المفاهيم التقنية - أعلى النقاط
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScoreTable scores={getTopScores("matching")} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flappy">
            <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-orange-400" />
                  مغامرة الكود الطائر - أعلى النقاط
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScoreTable scores={getTopScores("flappy-tech")} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cyber-security">
            <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-6 h-6 text-green-400" />
                  تحدي الأمن السيبراني - أعلى النقاط
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScoreTable scores={getTopScores("cyber-security")} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ui-design">
            <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Layout className="w-6 h-6 text-purple-400" />
                  تصميم واجهات المستخدم - أعلى النقاط
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScoreTable scores={getTopScores("ui-design")} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="player">
            <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">إحصائيات الطالب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <Input
                      placeholder="ابحث عن لاعب"
                      value={searchPlayer}
                      onChange={(e) => handleSearchInputChange(e.target.value)}
                      className="bg-white/5 border-white/20 text-high-contrast"
                    />
                    <Button
                      onClick={handlePlayerSearch}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Autocomplete suggestions */}
                  {showAutocomplete && (
                    <div className="absolute z-10 top-12 left-0 right-16 bg-black/90 border border-white/20 rounded-md shadow-lg py-1">
                      {autocompleteSuggestions.map((name, i) => (
                        <button
                          key={i}
                          onClick={() => handleSelectSuggestion(name)}
                          className="w-full text-right py-2 px-4 hover:bg-white/10 text-high-contrast transition-colors"
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {playerStats && (
                  <div className="space-y-6">
                    <div className="text-center p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
                      <h3 className="text-2xl font-bold text-white">{playerStats.playerName}</h3>
                      <p className="text-purple-300 text-sm">طالب في كلية تقنية المعلومات</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="p-4 text-center bg-white/5 border-white/20">
                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          {playerStats.totalGames}
                        </div>
                        <div className="text-sm text-gray-300">إجمالي الألعاب</div>
                      </Card>
                      <Card className="p-4 text-center bg-white/5 border-white/20">
                        <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                          {Math.round(playerStats.averageScore)}%
                        </div>
                        <div className="text-sm text-gray-300">متوسط النقاط</div>
                      </Card>
                      <Card className="p-4 text-center bg-white/5 border-white/20">
                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {playerStats.gamesPlayed.quiz}
                        </div>
                        <div className="text-sm text-gray-300">ألعاب الاختبار</div>
                      </Card>
                      <Card className="p-4 text-center bg-white/5 border-white/20">
                        <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                          {playerStats.gamesPlayed.matching + playerStats.gamesPlayed.flappy}
                        </div>
                        <div className="text-sm text-gray-300">ألعاب أخرى</div>
                      </Card>
                    </div>

                    {playerStats.bestGame && (
                      <Card className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                        <h4 className="font-bold text-white mb-4 text-lg">🏆 أفضل أداء</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getGameIcon(playerStats.bestGame.game)}
                            <div>
                              <div className="text-white font-medium">{getGameName(playerStats.bestGame.game)}</div>
                              <div className="text-gray-300 text-sm">{formatDate(playerStats.bestGame.timestamp)}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-2xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                              {playerStats.bestGame.percentage}%
                            </div>
                            <div className="text-sm text-gray-400">
                              {playerStats.bestGame.score}/{playerStats.bestGame.maxScore}
                            </div>
                          </div>
                        </div>
                      </Card>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
