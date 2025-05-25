"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Network } from "lucide-react"
import { useLeaderboard } from "./leaderboard-context"

interface MatchPair {
  id: number
  term: string
  concept: string
  category: string
  difficulty: "سهل" | "متوسط" | "صعب"
  description: string
}

const allMatchPairs: MatchPair[] = [
  // البرمجة وتطوير الويب (20 زوج)
  {
    id: 1,
    term: "HTML",
    concept: "هيكل صفحات الويب",
    category: "تطوير الويب",
    difficulty: "سهل",
    description: "لغة ترميز النص التشعبي",
  },
  {
    id: 2,
    term: "CSS",
    concept: "تنسيق وتصميم الصفحات",
    category: "تطوير الويب",
    difficulty: "سهل",
    description: "أوراق الأنماط المتتالية",
  },
  {
    id: 3,
    term: "JavaScript",
    concept: "التفاعل والديناميكية",
    category: "تطوير الويب",
    difficulty: "متوسط",
    description: "لغة برمجة للويب",
  },
  {
    id: 4,
    term: "React",
    concept: "مكتبة واجهات المستخدم",
    category: "تطوير الويب",
    difficulty: "متوسط",
    description: "إطار عمل JavaScript",
  },
  {
    id: 5,
    term: "Node.js",
    concept: "تشغيل JavaScript على الخادم",
    category: "تطوير الويب",
    difficulty: "متوسط",
    description: "بيئة تشغيل JavaScript",
  },
  {
    id: 6,
    term: "Python",
    concept: "لغة برمجة متعددة الاستخدامات",
    category: "البرمجة",
    difficulty: "سهل",
    description: "لغة برمجة عالية المستوى",
  },
  {
    id: 7,
    term: "Java",
    concept: "اكتب مرة، شغل في أي مكان",
    category: "البرمجة",
    difficulty: "متوسط",
    description: "لغة برمجة كائنية التوجه",
  },
  {
    id: 8,
    term: "SQL",
    concept: "استعلام قواعد البيانات",
    category: "قواعد البيانات",
    difficulty: "متوسط",
    description: "لغة الاستعلام المهيكلة",
  },
  {
    id: 9,
    term: "Git",
    concept: "التحكم في إصدارات الكود",
    category: "أدوات التطوير",
    difficulty: "متوسط",
    description: "نظام التحكم في الإصدارات",
  },
  {
    id: 10,
    term: "API",
    concept: "واجهة تطبيق البرمجة",
    category: "التكامل",
    difficulty: "متوسط",
    description: "ربط التطبيقات ببعضها",
  },
  {
    id: 11,
    term: "JSON",
    concept: "تنسيق تبادل البيانات",
    category: "البيانات",
    difficulty: "سهل",
    description: "كائن JavaScript المُرمز",
  },
  {
    id: 12,
    term: "MongoDB",
    concept: "قاعدة بيانات غير علائقية",
    category: "قواعد البيانات",
    difficulty: "متوسط",
    description: "قاعدة بيانات NoSQL",
  },
  {
    id: 13,
    term: "Docker",
    concept: "حاويات التطبيقات",
    category: "أدوات التطوير",
    difficulty: "صعب",
    description: "منصة الحاويات",
  },
  {
    id: 14,
    term: "Bootstrap",
    concept: "إطار عمل CSS جاهز",
    category: "تطوير الويب",
    difficulty: "سهل",
    description: "مكتبة تصميم سريعة الاستجابة",
  },
  {
    id: 15,
    term: "Vue.js",
    concept: "إطار عمل JavaScript تدريجي",
    category: "تطوير الويب",
    difficulty: "متوسط",
    description: "إطار عمل واجهات المستخدم",
  },
  {
    id: 16,
    term: "TypeScript",
    concept: "JavaScript مع الأنواع",
    category: "البرمجة",
    difficulty: "متوسط",
    description: "لغة برمجة مطورة من JavaScript",
  },
  {
    id: 17,
    term: "GraphQL",
    concept: "لغة استعلام للـ APIs",
    category: "التكامل",
    difficulty: "صعب",
    description: "بديل لـ REST API",
  },
  {
    id: 18,
    term: "Redux",
    concept: "إدارة حالة التطبيق",
    category: "تطوير الويب",
    difficulty: "صعب",
    description: "مكتبة إدارة الحالة",
  },
  {
    id: 19,
    term: "Webpack",
    concept: "حزم وتجميع الملفات",
    category: "أدوات التطوير",
    difficulty: "صعب",
    description: "أداة بناء التطبيقات",
  },
  {
    id: 20,
    term: "Express.js",
    concept: "إطار عمل خادم Node.js",
    category: "تطوير الويب",
    difficulty: "متوسط",
    description: "إطار عمل خادم سريع",
  },

  // الشبكات والإنترنت (15 زوج)
  {
    id: 21,
    term: "HTTP",
    concept: "بروتوكول نقل النص التشعبي",
    category: "الشبكات",
    difficulty: "سهل",
    description: "بروتوكول الويب الأساسي",
  },
  {
    id: 22,
    term: "HTTPS",
    concept: "HTTP الآمن والمشفر",
    category: "الشبكات",
    difficulty: "سهل",
    description: "بروتوكول الويب المؤمن",
  },
  {
    id: 23,
    term: "DNS",
    concept: "ترجمة أسماء النطاقات",
    category: "الشبكات",
    difficulty: "متوسط",
    description: "نظام أسماء النطاقات",
  },
  {
    id: 24,
    term: "IP Address",
    concept: "عنوان الجهاز على الشبكة",
    category: "الشبكات",
    difficulty: "سهل",
    description: "معرف فريد للأجهزة",
  },
  {
    id: 25,
    term: "Router",
    concept: "توجيه البيانات بين الشبكات",
    category: "الشبكات",
    difficulty: "متوسط",
    description: "جهاز توجيه الشبكة",
  },
  {
    id: 26,
    term: "TCP",
    concept: "بروتوكول النقل الموثوق",
    category: "الشبكات",
    difficulty: "صعب",
    description: "بروتوكول التحكم في النقل",
  },
  {
    id: 27,
    term: "UDP",
    concept: "بروتوكول النقل السريع",
    category: "الشبكات",
    difficulty: "صعب",
    description: "بروتوكول البيانات المستخدم",
  },
  {
    id: 28,
    term: "FTP",
    concept: "نقل الملفات عبر الشبكة",
    category: "الشبكات",
    difficulty: "متوسط",
    description: "بروتوكول نقل الملفات",
  },
  {
    id: 29,
    term: "VPN",
    concept: "شبكة خاصة افتراضية",
    category: "الشبكات",
    difficulty: "متوسط",
    description: "اتصال آمن عبر الإنترنت",
  },
  {
    id: 30,
    term: "WiFi",
    concept: "شبكة لاسلكية محلية",
    category: "الشبكات",
    difficulty: "سهل",
    description: "تقنية الاتصال اللاسلكي",
  },
  {
    id: 31,
    term: "Ethernet",
    concept: "شبكة سلكية محلية",
    category: "الشبكات",
    difficulty: "سهل",
    description: "تقنية الشبكة السلكية",
  },
  {
    id: 32,
    term: "DHCP",
    concept: "توزيع عناوين IP تلقائياً",
    category: "الشبكات",
    difficulty: "متوسط",
    description: "بروتوكول التكوين الديناميكي",
  },
  {
    id: 33,
    term: "NAT",
    concept: "ترجمة عناوين الشبكة",
    category: "الشبكات",
    difficulty: "صعب",
    description: "تحويل العناوين الداخلية للخارجية",
  },
  {
    id: 34,
    term: "CDN",
    concept: "شبكة توزيع المحتوى",
    category: "الشبكات",
    difficulty: "صعب",
    description: "توزيع المحتوى جغرافياً",
  },
  {
    id: 35,
    term: "Load Balancer",
    concept: "توزيع الأحمال على الخوادم",
    category: "الشبكات",
    difficulty: "صعب",
    description: "موزع الأحمال",
  },

  // الأمن السيبراني (15 زوج)
  {
    id: 36,
    term: "Firewall",
    concept: "حاجز حماية الشبكة",
    category: "الأمن السيبراني",
    difficulty: "سهل",
    description: "جدار الحماية",
  },
  {
    id: 37,
    term: "Encryption",
    concept: "تشفير البيانات الحساسة",
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    description: "حماية البيانات بالتشفير",
  },
  {
    id: 38,
    term: "SSL/TLS",
    concept: "تأمين الاتصالات",
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    description: "بروتوكولات التشفير",
  },
  {
    id: 39,
    term: "2FA",
    concept: "المصادقة الثنائية",
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    description: "طبقة أمان إضافية",
  },
  {
    id: 40,
    term: "Phishing",
    concept: "التصيد الإلكتروني",
    category: "الأمن السيبراني",
    difficulty: "سهل",
    description: "خداع لسرقة المعلومات",
  },
  {
    id: 41,
    term: "Malware",
    concept: "البرمجيات الخبيثة",
    category: "الأمن السيبراني",
    difficulty: "سهل",
    description: "برامج ضارة",
  },
  {
    id: 42,
    term: "Antivirus",
    concept: "حماية من الفيروسات",
    category: "الأمن السيبراني",
    difficulty: "سهل",
    description: "برنامج مكافحة الفيروسات",
  },
  {
    id: 43,
    term: "DDoS",
    concept: "هجوم إنكار الخدمة",
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    description: "إغراق الخادم بالطلبات",
  },
  {
    id: 44,
    term: "Penetration Testing",
    concept: "اختبار اختراق الأنظمة",
    category: "الأمن السيبراني",
    difficulty: "صعب",
    description: "فحص الثغرات الأمنية",
  },
  {
    id: 45,
    term: "IDS",
    concept: "كشف التسلل والهجمات",
    category: "الأمن السيبراني",
    difficulty: "صعب",
    description: "نظام كشف التسلل",
  },
  {
    id: 46,
    term: "PKI",
    concept: "إدارة المفاتيح العامة",
    category: "الأمن السيبراني",
    difficulty: "صعب",
    description: "البنية التحتية للمفاتيح",
  },
  {
    id: 47,
    term: "SIEM",
    concept: "إدارة أحداث الأمان",
    category: "الأمن السيبراني",
    difficulty: "صعب",
    description: "مراقبة الأمان المتقدمة",
  },
  {
    id: 48,
    term: "Zero Trust",
    concept: "عدم الثقة في أي شيء",
    category: "الأمن السيبراني",
    difficulty: "صعب",
    description: "نموذج أمان متقدم",
  },
  {
    id: 49,
    term: "Ransomware",
    concept: "برمجية طلب الفدية",
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    description: "تشفير الملفات مقابل فدية",
  },
  {
    id: 50,
    term: "Social Engineering",
    concept: "الهندسة الاجتماعية",
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    description: "التلاعب النفسي للحصول على معلومات",
  },

  // الأجهزة والتقنيات (10 زوج)
  {
    id: 51,
    term: "CPU",
    concept: "وحدة المعالجة المركزية",
    category: "الأجهزة",
    difficulty: "سهل",
    description: "معالج الحاسوب الرئيسي",
  },
  {
    id: 52,
    term: "GPU",
    concept: "معالج الرسوميات",
    category: "الأجهزة",
    difficulty: "سهل",
    description: "وحدة معالجة الرسوميات",
  },
  {
    id: 53,
    term: "RAM",
    concept: "ذاكرة الوصول العشوائي",
    category: "الأجهزة",
    difficulty: "سهل",
    description: "الذاكرة المؤقتة",
  },
  {
    id: 54,
    term: "SSD",
    concept: "قرص صلب سريع",
    category: "الأجهزة",
    difficulty: "متوسط",
    description: "قرص الحالة الصلبة",
  },
  {
    id: 55,
    term: "Motherboard",
    concept: "اللوحة الرئيسية",
    category: "الأجهزة",
    difficulty: "سهل",
    description: "تربط جميع المكونات",
  },
  {
    id: 56,
    term: "BIOS",
    concept: "نظام الإدخال والإخراج",
    category: "الأجهزة",
    difficulty: "متوسط",
    description: "برنامج بدء التشغيل",
  },
  {
    id: 57,
    term: "Cache",
    concept: "ذاكرة مؤقتة سريعة",
    category: "الأجهزة",
    difficulty: "متوسط",
    description: "تخزين مؤقت للبيانات المتكررة",
  },
  {
    id: 58,
    term: "USB",
    concept: "منفذ اتصال عام",
    category: "الأجهزة",
    difficulty: "سهل",
    description: "ناقل تسلسلي عام",
  },
  {
    id: 59,
    term: "HDMI",
    concept: "منفذ الوسائط المتعددة",
    category: "الأجهزة",
    difficulty: "سهل",
    description: "نقل الصوت والصورة رقمياً",
  },
  {
    id: 60,
    term: "Cloud Computing",
    concept: "الحوسبة السحابية",
    category: "التقنيات الحديثة",
    difficulty: "متوسط",
    description: "خدمات الحاسوب عبر الإنترنت",
  },
]

interface MatchingGameProps {
  onBack: () => void
  playerName: string
}

export default function MatchingGame({ onBack, playerName }: MatchingGameProps) {
  const [pairs, setPairs] = useState<MatchPair[]>([])
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [matchedCards, setMatchedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [difficulty, setDifficulty] = useState<"سهل" | "متوسط" | "صعب">("سهل")

  const { addScore } = useLeaderboard()

  useEffect(() => {
    const filteredPairs = allMatchPairs
      .filter((pair) => {
        if (difficulty === "سهل") return pair.difficulty === "سهل"
        if (difficulty === "متوسط") return pair.difficulty === "سهل" || pair.difficulty === "متوسط"
        return true
      })
      .sort(() => Math.random() - 0.5)
      .slice(0, 6)

    const duplicatedPairs = [...filteredPairs, ...filteredPairs].sort(() => Math.random() - 0.5)

    setPairs(duplicatedPairs)
    setStartTime(new Date())
  }, [difficulty])

  useEffect(() => {
    if (selectedCards.length === 2) {
      setMoves(moves + 1)
      const [firstIndex, secondIndex] = selectedCards

      if (pairs[firstIndex].id === pairs[secondIndex].id) {
        setMatchedCards([...matchedCards, pairs[firstIndex].id])
        setSelectedCards([])
      } else {
        setTimeout(() => {
          setSelectedCards([])
        }, 1000)
      }
    }
  }, [selectedCards, pairs, matchedCards, moves])

  useEffect(() => {
    if (
      pairs.length > 0 &&
      matchedCards.length ===
        pairs
          .slice(0, pairs.length / 2)
          .map((p) => p.id)
          .filter((v, i, a) => a.indexOf(v) === i).length
    ) {
      setGameComplete(true)
      handleSaveScore()
    }
  }, [matchedCards, pairs])

  const handleCardClick = (index: number) => {
    if (selectedCards.length < 2 && !selectedCards.includes(index) && !matchedCards.includes(pairs[index].id)) {
      setSelectedCards([...selectedCards, index])
    }
  }

  const handleSaveScore = () => {
    if (startTime) {
      const endTime = new Date()
      const timeTaken = Math.floor((endTime.getTime() - startTime.getTime()) / 1000)
      const difficultyMultiplier = difficulty === "صعب" ? 3 : difficulty === "متوسط" ? 2 : 1
      const percentage = Math.max(0, 100 - moves * difficultyMultiplier + 100 / timeTaken)

      addScore({
        playerName,
        game: "matching",
        score: 1,
        maxScore: 1,
        percentage,
        details: {
          attempts: moves,
        },
      })
    }
  }

  const resetGame = () => {
    setSelectedCards([])
    setMatchedCards([])
    setMoves(0)
    setGameComplete(false)

    const filteredPairs = allMatchPairs
      .filter((pair) => {
        if (difficulty === "سهل") return pair.difficulty === "سهل"
        if (difficulty === "متوسط") return pair.difficulty === "سهل" || pair.difficulty === "متوسط"
        return true
      })
      .sort(() => Math.random() - 0.5)
      .slice(0, 6)

    const duplicatedPairs = [...filteredPairs, ...filteredPairs].sort(() => Math.random() - 0.5)

    setPairs(duplicatedPairs)
    setStartTime(new Date())
  }

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "سهل":
        return "bg-green-500/20 text-green-300 border border-green-500/30"
      case "متوسط":
        return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
      case "صعب":
        return "bg-red-500/20 text-red-300 border border-red-500/30"
      default:
        return ""
    }
  }

  if (gameComplete) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4 relative overflow-hidden"
        dir="rtl"
      >
        {/* Animated background */}
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
                  <Network className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <CardTitle className="text-3xl text-white mb-2">تهانينا! أكملت التحدي!</CardTitle>
              <div className="text-emerald-300">كلية تقنية المعلومات - جامعة اجدابيا</div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {moves}
                  </div>
                  <div className="text-gray-300 text-sm">عدد المحاولات</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {difficulty}
                  </div>
                  <div className="text-gray-300 text-sm">مستوى الصعوبة</div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                <p className="text-white font-medium">أداء ممتاز! ذاكرة تقنية قوية!</p>
              </div>

              <div className="text-sm text-cyan-300">
                تم حفظ نقاطك تلقائياً باسم: <span className="font-bold text-white">{playerName}</span>
              </div>

              <div className="flex gap-3 justify-center flex-wrap">
                <Button
                  onClick={() => setDifficulty("سهل")}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                >
                  سهل
                </Button>
                <Button
                  onClick={() => setDifficulty("متوسط")}
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white"
                >
                  متوسط
                </Button>
                <Button
                  onClick={() => setDifficulty("صعب")}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white"
                >
                  صعب
                </Button>
                <Button onClick={onBack} variant="outline" className="border-white/30 text-white hover:bg-white/10">
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
      className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4 relative overflow-hidden"
      dir="rtl"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <Button onClick={onBack} variant="ghost" className="mb-4 text-white hover:text-green-300">
          <ArrowRight className="w-4 h-4 ml-2" />
          العودة للقائمة
        </Button>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Network className="w-8 h-8 text-green-400" />
              <CardTitle className="text-2xl text-white">شبكة المفاهيم التقنية</CardTitle>
            </div>
            <div className="text-center text-gray-300 mb-6">
              اربط المصطلحات التقنية بمفاهيمها في تحدي ذكي يختبر فهمك للعلاقات التقنية
            </div>

            <div className="flex justify-center gap-4 mb-4">
              <Button
                onClick={() => setDifficulty("سهل")}
                variant={difficulty === "سهل" ? "default" : "outline"}
                className={
                  difficulty === "سهل" ? "bg-green-600 text-white" : "border-white/30 text-white hover:bg-white/10"
                }
              >
                سهل
              </Button>
              <Button
                onClick={() => setDifficulty("متوسط")}
                variant={difficulty === "متوسط" ? "default" : "outline"}
                className={
                  difficulty === "متوسط" ? "bg-yellow-600 text-white" : "border-white/30 text-white hover:bg-white/10"
                }
              >
                متوسط
              </Button>
              <Button
                onClick={() => setDifficulty("صعب")}
                variant={difficulty === "صعب" ? "default" : "outline"}
                className={
                  difficulty === "صعب" ? "bg-red-600 text-white" : "border-white/30 text-white hover:bg-white/10"
                }
              >
                صعب
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {pairs.map((pair, index) => {
                const isFlipped = selectedCards.includes(index) || matchedCards.includes(pair.id)

                return (
                  <div
                    key={index}
                    className={`relative w-full h-32 rounded-lg shadow-md transition-transform duration-500 ease-in-out ${
                      isFlipped ? "transform-rotate-y-180" : ""
                    } ${matchedCards.includes(pair.id) ? "cursor-default" : "cursor-pointer"}`}
                    onClick={() => !isFlipped && handleCardClick(index)}
                  >
                    <div className="absolute w-full h-full flex items-center justify-center rounded-lg text-white text-lg font-bold backface-hidden">
                      {isFlipped ? (
                        <div className="flex flex-col items-center justify-center">
                          <div className="text-sm text-gray-300">{pair.category}</div>
                          <div className={`text-center ${getDifficultyColor()}`}>{pair.term}</div>
                          <div className="text-xs text-gray-400 mt-1">{pair.description}</div>
                        </div>
                      ) : (
                        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-2">؟</div>
                      )}
                    </div>
                    <div className="absolute w-full h-full bg-gray-800 rounded-lg backface-hidden transform rotate-y-180"></div>
                  </div>
                )
              })}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-300">
                المحاولات: <span className="font-bold text-white">{moves}</span>
              </div>
              <Button onClick={resetGame} variant="outline" className="border-white/30 text-white hover:bg-white/10">
                إعادة اللعبة
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
