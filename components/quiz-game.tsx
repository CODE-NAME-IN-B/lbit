"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, CheckCircle, XCircle, Trophy, Star, Brain, Zap } from "lucide-react"
import { useLeaderboard } from "./leaderboard-context"

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  category: string
  difficulty: "سهل" | "متوسط" | "صعب"
  explanation: string
}

const allQuestions: Question[] = [
  // أسئلة البرمجة (40 سؤال)
  {
    id: 1,
    question: "ما هي لغة البرمجة المعروفة بشعار 'اكتب مرة واحدة، شغل في أي مكان'؟",
    options: ["بايثون", "جافا سكريبت", "جافا", "سي++"],
    correct: 2,
    category: "البرمجة",
    difficulty: "سهل",
    explanation: "جافا تتميز بالاستقلالية عن المنصة من خلال الآلة الافتراضية مما يجعلها مناسبة لبيئات مختلفة.",
  },
  {
    id: 2,
    question: "في بايثون، أي هيكل بيانات مرتب وقابل للتغيير ويسمح بالقيم المكررة؟",
    options: ["مجموعة", "قاموس", "قائمة", "صف"],
    correct: 2,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "القوائم في بايثون هي مجموعات مرتبة وقابلة للتغيير يمكن أن تحتوي على عناصر مكررة.",
  },
  {
    id: 3,
    question: "ما هو الغرض من استخدام Git في البرمجة؟",
    options: ["تشغيل البرامج", "إدارة قواعد البيانات", "التحكم في الإصدارات", "تصميم الواجهات"],
    correct: 2,
    category: "البرمجة",
    difficulty: "سهل",
    explanation: "Git هو نظام للتحكم في الإصدارات يساعد المطورين في تتبع التغييرات في الكود.",
  },
  {
    id: 4,
    question: "أي من هذه ليست لغة برمجة؟",
    options: ["Python", "HTML", "JavaScript", "C++"],
    correct: 1,
    category: "البرمجة",
    difficulty: "سهل",
    explanation: "HTML هي لغة ترميز وليست لغة برمجة، بينما الباقي لغات برمجة حقيقية.",
  },
  {
    id: 5,
    question: "ما هو الفرق بين == و === في JavaScript؟",
    options: ["لا يوجد فرق", "=== يقارن النوع أيضاً", "== أسرع", "=== للنصوص فقط"],
    correct: 1,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "=== يقارن القيمة والنوع معاً، بينما == يقارن القيمة فقط مع تحويل النوع.",
  },
  {
    id: 6,
    question: "ما هو الغرض من استخدام CSS؟",
    options: ["قاعدة البيانات", "التنسيق والتصميم", "البرمجة", "الأمان"],
    correct: 1,
    category: "البرمجة",
    difficulty: "سهل",
    explanation: "CSS تستخدم لتنسيق وتصميم صفحات الويب وتحديد مظهرها.",
  },
  {
    id: 7,
    question: "أي من هذه المفاهيم يصف البرمجة الكائنية؟",
    options: ["الوراثة", "التغليف", "تعدد الأشكال", "جميع ما سبق"],
    correct: 3,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "البرمجة الكائنية تشمل الوراثة والتغليف وتعدد الأشكال كمفاهيم أساسية.",
  },
  {
    id: 8,
    question: "ما هو الغرض من استخدام API؟",
    options: ["تخزين البيانات", "ربط التطبيقات", "تصميم الواجهات", "كتابة الكود"],
    correct: 1,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "API تسمح للتطبيقات المختلفة بالتواصل وتبادل البيانات مع بعضها البعض.",
  },
  {
    id: 9,
    question: "أي من هذه قواعد البيانات العلائقية؟",
    options: ["MongoDB", "MySQL", "Redis", "Cassandra"],
    correct: 1,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "MySQL هي قاعدة بيانات علائقية، بينما الأخريات قواعد بيانات غير علائقية.",
  },
  {
    id: 10,
    question: "ما هو الغرض من استخدام JSON؟",
    options: ["تشفير البيانات", "تنسيق البيانات", "ضغط الملفات", "إنشاء الواجهات"],
    correct: 1,
    category: "البرمجة",
    difficulty: "سهل",
    explanation: "JSON هو تنسيق لتبادل البيانات بين التطبيقات بطريقة مقروءة.",
  },
  {
    id: 11,
    question: "أي من هذه أطر عمل JavaScript؟",
    options: ["Django", "React", "Laravel", "Spring"],
    correct: 1,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "React هو إطار عمل JavaScript، بينما الأخريات أطر عمل للغات أخرى.",
  },
  {
    id: 12,
    question: "ما هو الغرض من استخدام Docker؟",
    options: ["كتابة الكود", "حاويات التطبيقات", "تصميم قواعد البيانات", "إنشاء الواجهات"],
    correct: 1,
    category: "البرمجة",
    difficulty: "صعب",
    explanation: "Docker يستخدم لإنشاء حاويات تحتوي على التطبيقات وجميع متطلباتها.",
  },
  {
    id: 13,
    question: "أي من هذه لغات البرمجة مفسرة؟",
    options: ["C++", "Java", "Python", "C#"],
    correct: 2,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "Python هي لغة مفسرة تنفذ الكود مباشرة دون الحاجة للترجمة المسبقة.",
  },
  {
    id: 14,
    question: "ما هو الغرض من استخدام المتغيرات في البرمجة؟",
    options: ["تخزين القيم", "تنفيذ الأوامر", "إنشاء الواجهات", "ربط الشبكات"],
    correct: 0,
    category: "البرمجة",
    difficulty: "سهل",
    explanation: "المتغيرات تستخدم لتخزين القيم والبيانات في الذاكرة أثناء تنفيذ البرنامج.",
  },
  {
    id: 15,
    question: "أي من هذه أنواع البيانات الأساسية؟",
    options: ["Array", "Object", "Integer", "Function"],
    correct: 2,
    category: "البرمجة",
    difficulty: "سهل",
    explanation: "Integer (العدد الصحيح) هو نوع بيانات أساسي، بينما الأخريات أنواع مركبة.",
  },
  {
    id: 16,
    question: "ما هو الغرض من استخدام الدوال (Functions) في البرمجة؟",
    options: ["تخزين البيانات", "تنظيم الكود وإعادة الاستخدام", "تصميم الواجهات", "إدارة الذاكرة"],
    correct: 1,
    category: "البرمجة",
    difficulty: "سهل",
    explanation: "الدوال تساعد في تنظيم الكود وتجنب التكرار وتحسين قابلية القراءة والصيانة.",
  },
  {
    id: 17,
    question: "أي من هذه أنماط التصميم (Design Patterns)؟",
    options: ["Singleton", "HTML", "CSS", "JSON"],
    correct: 0,
    category: "البرمجة",
    difficulty: "صعب",
    explanation: "Singleton هو نمط تصميم يضمن وجود نسخة واحدة فقط من الكلاس في التطبيق.",
  },
  {
    id: 18,
    question: "ما هو الفرق بين Frontend و Backend؟",
    options: ["لا يوجد فرق", "Frontend للمستخدم، Backend للخادم", "Frontend أسرع", "Backend للتصميم"],
    correct: 1,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "Frontend هو الجزء الذي يراه المستخدم، بينما Backend هو منطق الخادم وقاعدة البيانات.",
  },
  {
    id: 19,
    question: "أي من هذه لغات البرمجة تستخدم للذكاء الاصطناعي؟",
    options: ["HTML", "Python", "CSS", "XML"],
    correct: 1,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "Python هي اللغة الأكثر شيوعاً في مجال الذكاء الاصطناعي وتعلم الآلة.",
  },
  {
    id: 20,
    question: "ما هو الغرض من استخدام المصفوفات (Arrays)؟",
    options: ["تخزين عنصر واحد", "تخزين مجموعة من العناصر", "إنشاء الواجهات", "إدارة الشبكة"],
    correct: 1,
    category: "البرمجة",
    difficulty: "سهل",
    explanation: "المصفوفات تستخدم لتخزين مجموعة من العناصر من نفس النوع في مكان واحد.",
  },
  {
    id: 21,
    question: "أي من هذه أنظمة إدارة قواعد البيانات؟",
    options: ["React", "PostgreSQL", "Angular", "Vue"],
    correct: 1,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "PostgreSQL هو نظام إدارة قواعد بيانات علائقية متقدم ومفتوح المصدر.",
  },
  {
    id: 22,
    question: "ما هو الغرض من استخدام التعليقات (Comments) في الكود؟",
    options: ["تسريع التنفيذ", "توثيق وشرح الكود", "تقليل حجم الملف", "زيادة الأمان"],
    correct: 1,
    category: "البرمجة",
    difficulty: "سهل",
    explanation: "التعليقات تستخدم لتوثيق الكود وشرح منطق البرنامج للمطورين الآخرين.",
  },
  {
    id: 23,
    question: "أي من هذه بيئات التطوير المتكاملة (IDE)؟",
    options: ["Chrome", "Visual Studio Code", "Firefox", "Safari"],
    correct: 1,
    category: "البرمجة",
    difficulty: "سهل",
    explanation: "Visual Studio Code هو محرر كود متقدم وبيئة تطوير شائعة بين المطورين.",
  },
  {
    id: 24,
    question: "ما هو الغرض من استخدام الحلقات (Loops) في البرمجة؟",
    options: ["تخزين البيانات", "تكرار تنفيذ الكود", "إنشاء الواجهات", "إدارة الذاكرة"],
    correct: 1,
    category: "البرمجة",
    difficulty: "سهل",
    explanation: "الحلقات تستخدم لتكرار تنفيذ مجموعة من التعليمات عدة مرات.",
  },
  {
    id: 25,
    question: "أي من هذه أطر عمل CSS؟",
    options: ["React", "Bootstrap", "Node.js", "Express"],
    correct: 1,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "Bootstrap هو إطار عمل CSS يوفر مكونات جاهزة لتطوير واجهات المستخدم.",
  },
  {
    id: 26,
    question: "ما هو الغرض من استخدام الشروط (Conditions) في البرمجة؟",
    options: ["تخزين البيانات", "اتخاذ القرارات في الكود", "تصميم الواجهات", "إدارة الملفات"],
    correct: 1,
    category: "البرمجة",
    difficulty: "سهل",
    explanation: "الشروط تسمح للبرنامج باتخاذ قرارات وتنفيذ كود مختلف حسب الحالة.",
  },
  {
    id: 27,
    question: "أي من هذه لغات البرمجة تستخدم لتطوير تطبيقات الأندرويد؟",
    options: ["Swift", "Kotlin", "C#", "Ruby"],
    correct: 1,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "Kotlin هي اللغة المفضلة حالياً لتطوير تطبيقات الأندرويد من قبل Google.",
  },
  {
    id: 28,
    question: "ما هو الغرض من استخدام الاستثناءات (Exceptions) في البرمجة؟",
    options: ["تسريع البرنامج", "التعامل مع الأخطاء", "تصميم الواجهات", "تخزين البيانات"],
    correct: 1,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "الاستثناءات تستخدم للتعامل مع الأخطاء والحالات غير المتوقعة في البرنامج.",
  },
  {
    id: 29,
    question: "أي من هذه أدوات إدارة الحزم (Package Managers)؟",
    options: ["Chrome", "npm", "Firefox", "Safari"],
    correct: 1,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "npm هو مدير الحزم الافتراضي لـ Node.js ويستخدم لإدارة مكتبات JavaScript.",
  },
  {
    id: 30,
    question: "ما هو الغرض من استخدام الوراثة (Inheritance) في البرمجة الكائنية؟",
    options: ["تخزين البيانات", "إعادة استخدام الكود", "تصميم الواجهات", "إدارة الذاكرة"],
    correct: 1,
    category: "البرمجة",
    difficulty: "صعب",
    explanation: "الوراثة تسمح للكلاسات بوراثة خصائص وطرق من كلاسات أخرى لإعادة استخدام الكود.",
  },
  {
    id: 31,
    question: "أي من هذه أنواع قواعد البيانات؟",
    options: ["HTML", "NoSQL", "CSS", "XML"],
    correct: 1,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "NoSQL هو نوع من قواعد البيانات غير العلائقية التي تتعامل مع البيانات بمرونة أكبر.",
  },
  {
    id: 32,
    question: "ما هو الغرض من استخدام التشفير (Encryption) في البرمجة؟",
    options: ["تسريع البرنامج", "حماية البيانات", "تصميم الواجهات", "تقليل حجم الملفات"],
    correct: 1,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "التشفير يستخدم لحماية البيانات الحساسة من الوصول غير المصرح به.",
  },
  {
    id: 33,
    question: "أي من هذه أدوات اختبار الكود؟",
    options: ["Photoshop", "Jest", "Word", "Excel"],
    correct: 1,
    category: "البرمجة",
    difficulty: "صعب",
    explanation: "Jest هو إطار عمل لاختبار كود JavaScript ويستخدم بكثرة في مشاريع React.",
  },
  {
    id: 34,
    question: "ما هو الغرض من استخدام المؤشرات (Pointers) في البرمجة؟",
    options: ["تصميم الواجهات", "الإشارة إلى عناوين الذاكرة", "تخزين النصوص", "إدارة الملفات"],
    correct: 1,
    category: "البرمجة",
    difficulty: "صعب",
    explanation: "المؤشرات تحتوي على عناوين الذاكرة وتستخدم للوصول المباشر للبيانات في الذاكرة.",
  },
  {
    id: 35,
    question: "أي من هذه لغات البرمجة تستخدم لتطوير تطبيقات iOS؟",
    options: ["Java", "Swift", "Python", "PHP"],
    correct: 1,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "Swift هي لغة البرمجة الرسمية لتطوير تطبيقات iOS من شركة Apple.",
  },
  {
    id: 36,
    question: "ما هو الغرض من استخدام الخوارزميات (Algorithms) في البرمجة؟",
    options: ["تصميم الواجهات", "حل المشاكل بطريقة منهجية", "تخزين البيانات", "إدارة الشبكة"],
    correct: 1,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "الخوارزميات هي مجموعة من الخطوات المنطقية لحل مشكلة معينة بطريقة فعالة.",
  },
  {
    id: 37,
    question: "أي من هذه أنواع هياكل البيانات؟",
    options: ["HTML", "Stack", "CSS", "XML"],
    correct: 1,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "Stack (المكدس) هو هيكل بيانات يعمل بنظام LIFO (آخر داخل، أول خارج).",
  },
  {
    id: 38,
    question: "ما هو الغرض من استخدام التحكم في الإصدارات (Version Control)؟",
    options: ["تسريع البرنامج", "تتبع تغييرات الكود", "تصميم الواجهات", "إدارة قواعد البيانات"],
    correct: 1,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "التحكم في الإصدارات يساعد في تتبع التغييرات والتعاون بين المطورين.",
  },
  {
    id: 39,
    question: "أي من هذه أطر عمل Python؟",
    options: ["React", "Django", "Angular", "Vue"],
    correct: 1,
    category: "البرمجة",
    difficulty: "متوسط",
    explanation: "Django هو إطار عمل Python قوي لتطوير تطبيقات الويب بسرعة وأمان.",
  },
  {
    id: 40,
    question: "ما هو الغرض من استخدام التوازي (Parallelism) في البرمجة؟",
    options: ["تقليل استهلاك الذاكرة", "تحسين الأداء", "تصميم الواجهات", "تخزين البيانات"],
    correct: 1,
    category: "البرمجة",
    difficulty: "صعب",
    explanation: "التوازي يسمح بتنفيذ عدة مهام في نفس الوقت لتحسين أداء البرنامج.",
  },

  // أسئلة الأجهزة (30 سؤال)
  {
    id: 41,
    question: "ماذا يعني اختصار CPU؟",
    options: ["وحدة المعالجة المركزية", "وحدة معالجة الحاسوب", "وحدة البرنامج المركزي", "وحدة برنامج الحاسوب"],
    correct: 0,
    category: "الأجهزة",
    difficulty: "سهل",
    explanation: "CPU تعني وحدة المعالجة المركزية، وهي المكون الرئيسي الذي ينفذ التعليمات.",
  },
  {
    id: 42,
    question: "ماذا يعني اختصار RAM في أجهزة الحاسوب؟",
    options: ["ذاكرة الوصول العشوائي", "ذاكرة الوصول للقراءة", "ذاكرة الوصول السريع", "ذاكرة الوصول البعيد"],
    correct: 0,
    category: "الأجهزة",
    difficulty: "سهل",
    explanation: "RAM (ذاكرة الوصول العشوائي) توفر تخزيناً مؤقتاً للبيانات المستخدمة حالياً.",
  },
  {
    id: 43,
    question: "ما هو الغرض من كرت الرسوميات (GPU)؟",
    options: ["معالجة الصوت", "معالجة الرسوميات", "تخزين البيانات", "إدارة الشبكة"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "سهل",
    explanation: "GPU مخصص لمعالجة الرسوميات والعمليات المتوازية المعقدة.",
  },
  {
    id: 44,
    question: "أي من هذه وحدات التخزين الأسرع؟",
    options: ["HDD", "SSD", "CD-ROM", "فلاش درايف"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "متوسط",
    explanation: "SSD (القرص الصلب الحالة الصلبة) أسرع من HDD التقليدي لعدم وجود أجزاء متحركة.",
  },
  {
    id: 45,
    question: "ما هو الغرض من اللوحة الأم (Motherboard)؟",
    options: ["تشغيل البرامج", "ربط جميع المكونات", "تخزين البيانات", "عرض الصور"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "سهل",
    explanation: "اللوحة الأم تربط جميع مكونات الحاسوب وتسمح لها بالتواصل مع بعضها.",
  },
  {
    id: 46,
    question: "ماذا يعني اختصار BIOS؟",
    options: ["نظام الإدخال والإخراج الأساسي", "نظام البيانات الأساسي", "نظام التشغيل الأساسي", "نظام الأمان الأساسي"],
    correct: 0,
    category: "الأجهزة",
    difficulty: "متوسط",
    explanation: "BIOS هو نظام الإدخال والإخراج الأساسي الذي يبدأ تشغيل الحاسوب.",
  },
  {
    id: 47,
    question: "أي من هذه منافذ الاتصال؟",
    options: ["CPU", "RAM", "USB", "GPU"],
    correct: 2,
    category: "الأجهزة",
    difficulty: "سهل",
    explanation: "USB هو منفذ اتصال لربط الأجهزة الخارجية بالحاسوب.",
  },
  {
    id: 48,
    question: "ما هو الغرض من مزود الطاقة (PSU)؟",
    options: ["معالجة البيانات", "تحويل التيار الكهربائي", "تخزين الملفات", "عرض الصور"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "سهل",
    explanation: "مزود الطاقة يحول التيار المتردد إلى تيار مستمر لتشغيل مكونات الحاسوب.",
  },
  {
    id: 49,
    question: "أي من هذه أنواع الذاكرة المؤقتة؟",
    options: ["HDD", "SSD", "Cache", "ROM"],
    correct: 2,
    category: "الأجهزة",
    difficulty: "متوسط",
    explanation: "Cache هي ذاكرة مؤقتة سريعة جداً تخزن البيانات المستخدمة بكثرة.",
  },
  {
    id: 50,
    question: "ما هو الفرق بين 32-bit و 64-bit؟",
    options: ["السرعة فقط", "حجم البيانات المعالجة", "نوع المعالج", "حجم الذاكرة فقط"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "صعب",
    explanation: "الفرق في حجم البيانات التي يمكن معالجتها في دورة واحدة وحجم الذاكرة المدعومة.",
  },
  {
    id: 51,
    question: "أي من هذه شركات تصنيع المعالجات؟",
    options: ["Microsoft", "Intel", "Adobe", "Oracle"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "سهل",
    explanation: "Intel هي إحدى أكبر شركات تصنيع المعالجات في العالم.",
  },
  {
    id: 52,
    question: "ما هو الغرض من مروحة التبريد؟",
    options: ["زيادة السرعة", "منع ارتفاع الحرارة", "توفير الطاقة", "تحسين الصوت"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "سهل",
    explanation: "مروحة التبريد تمنع ارتفاع حرارة المكونات الإلكترونية لحمايتها من التلف.",
  },
  {
    id: 53,
    question: "ماذا يعني اختصار ROM؟",
    options: ["ذاكرة القراءة فقط", "ذاكرة الوصول العشوائي", "ذاكرة التشغيل", "ذاكرة التخزين"],
    correct: 0,
    category: "الأجهزة",
    difficulty: "متوسط",
    explanation: "ROM هي ذاكرة القراءة فقط التي تحتوي على بيانات ثابتة لا تتغير.",
  },
  {
    id: 54,
    question: "أي من هذه أنواع شاشات العرض؟",
    options: ["CPU", "LED", "RAM", "HDD"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "سهل",
    explanation: "LED هي تقنية إضاءة تستخدم في شاشات العرض الحديثة.",
  },
  {
    id: 55,
    question: "ما هو الغرض من كرت الصوت؟",
    options: ["معالجة الرسوميات", "معالجة الصوت", "تخزين البيانات", "إدارة الشبكة"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "سهل",
    explanation: "كرت الصوت يعالج الإشارات الصوتية ويحولها لتشغيلها عبر السماعات.",
  },
  {
    id: 56,
    question: "أي من هذه أنواع الذاكرة الدائمة؟",
    options: ["RAM", "Cache", "Flash Memory", "Register"],
    correct: 2,
    category: "الأجهزة",
    difficulty: "متوسط",
    explanation: "Flash Memory هي ذاكرة دائمة تحتفظ بالبيانات حتى بعد انقطاع الطاقة.",
  },
  {
    id: 57,
    question: "ما هو الغرض من المعالج المساعد (Coprocessor)؟",
    options: ["تخزين البيانات", "مساعدة المعالج الرئيسي", "عرض الصور", "إدارة الشبكة"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "صعب",
    explanation: "المعالج المساعد يساعد المعالج الرئيسي في تنفيذ مهام محددة لتحسين الأداء.",
  },
  {
    id: 58,
    question: "أي من هذه وحدات قياس سرعة المعالج؟",
    options: ["GB", "MHz", "TB", "KB"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "متوسط",
    explanation: "MHz (ميجاهرتز) و GHz (جيجاهرتز) هي وحدات قياس سرعة المعالج.",
  },
  {
    id: 59,
    question: "ما هو الغرض من الناقل (Bus) في الحاسوب؟",
    options: ["تخزين البيانات", "نقل البيانات بين المكونات", "عرض الصور", "تشغيل البرامج"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "متوسط",
    explanation: "الناقل هو مجموعة من الأسلاك التي تنقل البيانات والإشارات بين مكونات الحاسوب.",
  },
  {
    id: 60,
    question: "أي من هذه أنواع منافذ العرض؟",
    options: ["USB", "HDMI", "Ethernet", "Audio"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "سهل",
    explanation: "HDMI هو منفذ رقمي عالي الدقة لنقل الصوت والصورة إلى شاشات العرض.",
  },
  {
    id: 61,
    question: "ما هو الغرض من وحدة التحكم في الذاكرة؟",
    options: ["تشغيل البرامج", "إدارة الوصول للذاكرة", "عرض الصور", "تخزين الملفات"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "صعب",
    explanation: "وحدة التحكم في الذاكرة تدير عمليات القراءة والكتابة في الذاكرة.",
  },
  {
    id: 62,
    question: "أي من هذه أنواع الطابعات؟",
    options: ["CPU", "Laser", "RAM", "GPU"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "سهل",
    explanation: "Laser هو نوع من الطابعات التي تستخدم تقنية الليزر للطباعة عالية الجودة.",
  },
  {
    id: 63,
    question: "ما هو الغرض من المقاطعات (Interrupts) في الحاسوب؟",
    options: ["تخزين البيانات", "إيقاف المعالج مؤقتاً للتعامل مع حدث", "عرض الصور", "تشغيل البرامج"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "صعب",
    explanation: "المقاطعات تسمح للأجهزة بإيقاف المعالج مؤقتاً للتعامل مع أحداث مهمة.",
  },
  {
    id: 64,
    question: "أي من هذه أنواع الماسحات الضوئية؟",
    options: ["CRT", "Flatbed", "LCD", "OLED"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "متوسط",
    explanation: "Flatbed هو نوع من الماسحات الضوئية المسطحة التي تمسح المستندات والصور.",
  },
  {
    id: 65,
    question: "ما هو الغرض من وحدة الحساب والمنطق (ALU)؟",
    options: ["تخزين البيانات", "تنفيذ العمليات الحسابية والمنطقية", "عرض الصور", "إدارة الشبكة"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "متوسط",
    explanation: "ALU هي جزء من المعالج تنفذ جميع العمليات الحسابية والمنطقية.",
  },
  {
    id: 66,
    question: "أي من هذه أنواع أجهزة الإدخال؟",
    options: ["Monitor", "Keyboard", "Speaker", "Printer"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "سهل",
    explanation: "لوحة المفاتيح هي جهاز إدخال يسمح للمستخدم بإدخال النصوص والأوامر.",
  },
  {
    id: 67,
    question: "ما هو الغرض من الذاكرة الافتراضية (Virtual Memory)؟",
    options: ["تسريع المعالج", "توسيع الذاكرة المتاحة", "عرض الصور", "تخزين البرامج"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "صعب",
    explanation: "الذاكرة الافتراضية تستخدم جزء من القرص الصلب كذاكرة إضافية عند امتلاء RAM.",
  },
  {
    id: 68,
    question: "أي من هذه أنواع أجهزة الإخراج؟",
    options: ["Mouse", "Speaker", "Keyboard", "Scanner"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "سهل",
    explanation: "السماعة هي جهاز إخراج يحول الإشارات الرقمية إلى أصوات مسموعة.",
  },
  {
    id: 69,
    question: "ما هو الغرض من وحدة التحكم (Control Unit)؟",
    options: ["تخزين البيانات", "التحكم في تنفيذ التعليمات", "عرض الصور", "معالجة الصوت"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "متوسط",
    explanation: "وحدة التحكم تدير وتنسق تنفيذ التعليمات في المعالج.",
  },
  {
    id: 70,
    question: "أي من هذه تقنيات التخزين السحابي؟",
    options: ["HDD", "SSD", "Cloud Storage", "RAM"],
    correct: 2,
    category: "الأجهزة",
    difficulty: "متوسط",
    explanation: "التخزين السحابي يسمح بحفظ البيانات على خوادم بعيدة عبر الإنترنت.",
  },

  // أسئلة الإنترنت والشبكات (30 سؤال)
  {
    id: 71,
    question: "أي بروتوكول يُستخدم بشكل أساسي للتصفح الآمن على الويب؟",
    options: ["HTTP", "FTP", "HTTPS", "SMTP"],
    correct: 2,
    category: "الإنترنت",
    difficulty: "متوسط",
    explanation: "HTTPS (HTTP الآمن) يشفر نقل البيانات بين المتصفحات والخوادم.",
  },
  {
    id: 72,
    question: "ماذا يعني اختصار DNS في الشبكات؟",
    options: ["نظام شبكة البيانات", "نظام أسماء النطاقات", "خدمة الشبكة الرقمية", "خادم الأسماء الديناميكي"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "متوسط",
    explanation: "DNS يترجم أسماء النطاقات المقروءة للبشر إلى عناوين IP التي تفهمها أجهزة الحاسوب.",
  },
  {
    id: 73,
    question: "ما هو عنوان IP؟",
    options: ["اسم الموقع", "عنوان الجهاز على الشبكة", "نوع المتصفح", "سرعة الإنترنت"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "سهل",
    explanation: "عنوان IP هو رقم فريد يحدد موقع الجهاز على الشبكة.",
  },
  {
    id: 74,
    question: "أي من هذه متصفحات الإنترنت؟",
    options: ["Windows", "Chrome", "Office", "Photoshop"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "سهل",
    explanation: "Chrome هو متصفح إنترنت من شركة Google.",
  },
  {
    id: 75,
    question: "ما هو الغرض من بروتوكول FTP؟",
    options: ["إرسال الإيميل", "نقل الملفات", "تصفح الويب", "الدردشة"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "متوسط",
    explanation: "FTP (بروتوكول نقل الملفات) يستخدم لرفع وتحميل الملفات من وإلى الخوادم.",
  },
  {
    id: 76,
    question: "ماذا يعني WWW؟",
    options: ["شبكة الويب العالمية", "نظام ويندوز العالمي", "شبكة الاتصالات العالمية", "نظام المعلومات العالمي"],
    correct: 0,
    category: "الإنترنت",
    difficulty: "سهل",
    explanation: "WWW تعني شبكة الويب العالمية، وهي نظام المعلومات المترابط على الإنترنت.",
  },
  {
    id: 77,
    question: "أي من هذه خدمات البريد الإلكتروني؟",
    options: ["Facebook", "Gmail", "YouTube", "Wikipedia"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "سهل",
    explanation: "Gmail هي خدمة بريد إلكتروني من شركة Google.",
  },
  {
    id: 78,
    question: "ما هو الغرض من الراوتر (Router)؟",
    options: ["تخزين البيانات", "توجيه البيانات بين الشبكات", "عرض الصفحات", "تشغيل البرامج"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "متوسط",
    explanation: "الراوتر يوجه البيانات بين الشبكات المختلفة ويربط الأجهزة بالإنترنت.",
  },
  {
    id: 79,
    question: "أي من هذه سرعات الإنترنت؟",
    options: ["GB", "Mbps", "Hz", "Watts"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "سهل",
    explanation: "Mbps (ميجابت في الثانية) هي وحدة قياس سرعة الإنترنت.",
  },
  {
    id: 80,
    question: "ما هو الغرض من ملفات تعريف الارتباط (Cookies)؟",
    options: ["حماية الجهاز", "تخزين معلومات المستخدم", "تسريع التصفح", "منع الفيروسات"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "متوسط",
    explanation: "Cookies تخزن معلومات عن المستخدم وتفضيلاته لتحسين تجربة التصفح.",
  },
  {
    id: 81,
    question: "أي من هذه محركات البحث؟",
    options: ["Windows", "Google", "Office", "Photoshop"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "سهل",
    explanation: "Google هو أشهر محرك بحث على الإنترنت.",
  },
  {
    id: 82,
    question: "ما هو الغرض من عنوان URL؟",
    options: ["تشفير البيانات", "تحديد موقع الصفحة", "قياس السرعة", "حماية الجهاز"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "سهل",
    explanation: "URL هو العنوان الذي يحدد موقع صفحة أو مورد معين على الإنترنت.",
  },
  {
    id: 83,
    question: "ماذا يعني اختصار ISP؟",
    options: ["مزود خدمة الإنترنت", "بروتوكول الأمان الداخلي", "نظام معلومات الإنترنت", "خادم الإنترنت الرئيسي"],
    correct: 0,
    category: "الإنترنت",
    difficulty: "متوسط",
    explanation: "ISP هو مزود خدمة الإنترنت الذي يوفر الاتصال بالإنترنت للمستخدمين.",
  },
  {
    id: 84,
    question: "أي من هذه بروتوكولات البريد الإلكتروني؟",
    options: ["HTTP", "SMTP", "FTP", "DNS"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "متوسط",
    explanation: "SMTP (بروتوكول نقل البريد البسيط) يستخدم لإرسال رسائل البريد الإلكتروني.",
  },
  {
    id: 85,
    question: "ما هو الغرض من الخادم الوكيل (Proxy Server)؟",
    options: ["تخزين الملفات", "الوساطة بين العميل والخادم", "تشغيل البرامج", "عرض الصفحات"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "صعب",
    explanation: "الخادم الوكيل يعمل كوسيط بين العميل والخادم ويمكن أن يوفر الأمان والتخزين المؤقت.",
  },
  {
    id: 86,
    question: "أي من هذه أنواع الشبكات؟",
    options: ["HTML", "LAN", "CSS", "XML"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "سهل",
    explanation: "LAN (الشبكة المحلية) هي شبكة تربط أجهزة في منطقة جغرافية محدودة.",
  },
  {
    id: 87,
    question: "ما هو الغرض من بروتوكول TCP؟",
    options: ["تصفح الويب", "ضمان التسليم الموثوق للبيانات", "إرسال الإيميل", "تشفير البيانات"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "صعب",
    explanation: "TCP يضمن التسليم الموثوق والمرتب للبيانات عبر الشبكة.",
  },
  {
    id: 88,
    question: "أي من هذه عناوين IP صحيحة؟",
    options: ["192.168.1.1", "999.999.999.999", "abc.def.ghi.jkl", "256.256.256.256"],
    correct: 0,
    category: "الإنترنت",
    difficulty: "متوسط",
    explanation: "192.168.1.1 هو عنوان IP صحيح، حيث كل رقم يجب أن يكون بين 0 و 255.",
  },
  {
    id: 89,
    question: "ما هو الغرض من بروتوكول UDP؟",
    options: ["تصفح الويب", "النقل السريع بدون ضمانات", "إرسال الإيميل", "تشفير البيانات"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "صعب",
    explanation: "UDP يوفر نقل سريع للبيانات بدون ضمانات التسليم، مناسب للتطبيقات الفورية.",
  },
  {
    id: 90,
    question: "أي من هذه أدوات تحليل الشبكة؟",
    options: ["Word", "Wireshark", "Excel", "PowerPoint"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "صعب",
    explanation: "Wireshark هو أداة قوية لتحليل حركة الشبكة ومراقبة البروتوكولات.",
  },
  {
    id: 91,
    question: "ما هو الغرض من DHCP؟",
    options: ["تشفير البيانات", "توزيع عناوين IP تلقائياً", "تصفح الويب", "إرسال الإيميل"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "متوسط",
    explanation: "DHCP يوزع عناوين IP وإعدادات الشبكة تلقائياً للأجهزة المتصلة.",
  },
  {
    id: 92,
    question: "أي من هذه طبقات نموذج OSI؟",
    options: ["HTML", "Physical", "CSS", "JSON"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "صعب",
    explanation: "Physical Layer هي الطبقة الأولى في نموذج OSI وتتعامل مع الإشارات الفيزيائية.",
  },
  {
    id: 93,
    question: "ما هو الغرض من NAT؟",
    options: ["تسريع الإنترنت", "ترجمة عناوين الشبكة", "تشفير البيانات", "تخزين الملفات"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "صعب",
    explanation: "NAT يترجم عناوين IP الداخلية إلى عناوين خارجية للوصول للإنترنت.",
  },
  {
    id: 94,
    question: "أي من هذه أنواع الكابلات الشبكية؟",
    options: ["HDMI", "Ethernet", "USB", "VGA"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "سهل",
    explanation: "كابل Ethernet يستخدم لربط الأجهزة بالشبكة المحلية.",
  },
  {
    id: 95,
    question: "ما هو الغرض من VPN؟",
    options: ["تسريع الإنترنت", "إنشاء اتصال آمن عبر الإنترنت", "تخزين الملفات", "تشغيل البرامج"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "متوسط",
    explanation: "VPN ينشئ نفق آمن ومشفر للاتصال عبر الإنترنت لحماية الخصوصية.",
  },
  {
    id: 96,
    question: "أي من هذه معايير الشبكة اللاسلكية؟",
    options: ["HTTP", "WiFi", "FTP", "SMTP"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "سهل",
    explanation: "WiFi هو معيار للشبكات اللاسلكية يسمح بالاتصال بالإنترنت بدون كابلات.",
  },
  {
    id: 97,
    question: "ما هو الغرض من CDN؟",
    options: ["تشفير البيانات", "توزيع المحتوى جغرافياً", "إرسال الإيميل", "تخزين كلمات المرور"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "صعب",
    explanation: "CDN يوزع المحتوى على خوادم متعددة جغرافياً لتحسين سرعة التحميل.",
  },
  {
    id: 98,
    question: "أي من هذه بروتوكولات الأمان؟",
    options: ["HTTP", "SSL/TLS", "FTP", "SMTP"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "متوسط",
    explanation: "SSL/TLS هي بروتوكولات تشفير تؤمن الاتصالات عبر الإنترنت.",
  },
  {
    id: 99,
    question: "ما هو الغرض من Load Balancer؟",
    options: ["تخزين البيانات", "توزيع الحمولة على الخوادم", "تشفير البيانات", "تصفح الويب"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "صعب",
    explanation: "Load Balancer يوزع طلبات المستخدمين على عدة خوادم لتحسين الأداء والموثوقية.",
  },
  {
    id: 100,
    question: "أي من هذه أنواع الهجمات الشبكية؟",
    options: ["HTML", "DDoS", "CSS", "JSON"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "متوسط",
    explanation: "DDoS هو هجوم يهدف لإغراق الخادم بالطلبات لجعله غير متاح للمستخدمين الشرعيين.",
  },

  // أسئلة الأمن السيبراني (50 سؤال)
  {
    id: 101,
    question: "ما هو الغرض الأساسي من جدار الحماية في الأمن السيبراني؟",
    options: ["تسريع الإنترنت", "تخزين كلمات المرور", "تصفية حركة الشبكة", "ضغط الملفات"],
    correct: 2,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "جدران الحماية تراقب وتتحكم في حركة الشبكة الواردة والصادرة بناءً على قواعد الأمان.",
  },
  {
    id: 102,
    question: "أي طريقة تشفير تستخدم نفس المفتاح للتشفير وفك التشفير؟",
    options: ["التشفير غير المتماثل", "التشفير المتماثل", "تشفير التجزئة", "التوقيع الرقمي"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "التشفير المتماثل يستخدم مفتاحاً واحداً مشتركاً لعمليتي التشفير وفك التشفير.",
  },
  {
    id: 103,
    question: "ما هو الغرض من برامج مكافحة الفيروسات؟",
    options: ["تسريع الجهاز", "حماية من البرمجيات الخبيثة", "تنظيف الملفات", "تحديث البرامج"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "سهل",
    explanation: "برامج مكافحة الفيروسات تحمي الجهاز من البرمجيات الخبيثة والفيروسات.",
  },
  {
    id: 104,
    question: "أي من هذه كلمة مرور قوية؟",
    options: ["123456", "password", "MyP@ssw0rd2024!", "admin"],
    correct: 2,
    category: "الأمن السيبراني",
    difficulty: "سهل",
    explanation: "كلمة المرور القوية تحتوي على أحرف كبيرة وصغيرة وأرقام ورموز خاصة.",
  },
  {
    id: 105,
    question: "ما هو التصيد الإلكتروني (Phishing)؟",
    options: ["نوع من الألعاب", "محاولة سرقة المعلومات", "برنامج تصفح", "نوع من التشفير"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "التصيد الإلكتروني هو محاولة خداع المستخدمين للحصول على معلوماتهم الحساسة.",
  },
  {
    id: 106,
    question: "ما هو الغرض من المصادقة الثنائية (2FA)؟",
    options: ["تسريع الدخول", "زيادة الأمان", "توفير الذاكرة", "تحسين الأداء"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "المصادقة الثنائية تضيف طبقة أمان إضافية تتطلب عاملين للتحقق من الهوية.",
  },
  {
    id: 107,
    question: "أي من هذه يعتبر برمجية خبيثة؟",
    options: ["Microsoft Word", "Trojan", "Google Chrome", "Adobe Reader"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "سهل",
    explanation: "Trojan (حصان طروادة) هو نوع من البرمجيات الخبيثة التي تتنكر كبرنامج مفيد.",
  },
  {
    id: 108,
    question: "ما هو الغرض من شهادات SSL؟",
    options: ["تسريع الموقع", "تشفير الاتصال", "تحسين التصميم", "زيادة الزوار"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "شهادات SSL تشفر الاتصال بين المتصفح والخادم لحماية البيانات المنقولة.",
  },
  {
    id: 109,
    question: "أي من هذه ممارسة أمنية جيدة؟",
    options: ["استخدام نفس كلمة المرور للجميع", "تحديث البرامج بانتظام", "فتح جميع الروابط", "مشاركة كلمات المرور"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "سهل",
    explanation: "تحديث البرامج بانتظام يضمن الحصول على أحدث تصحيحات الأمان.",
  },
  {
    id: 110,
    question: "ما هو الغرض من النسخ الاحتياطي؟",
    options: ["توفير المساحة", "حماية البيانات من الفقدان", "تسريع الجهاز", "تحسين الأداء"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "سهل",
    explanation: "النسخ الاحتياطي يحمي البيانات المهمة من الفقدان في حالة تعطل الجهاز أو الهجمات.",
  },
  {
    id: 111,
    question: "أي من هذه يعتبر هجوم إلكتروني؟",
    options: ["تحديث البرنامج", "DDoS Attack", "تصفح الإنترنت", "إرسال إيميل"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "DDoS Attack هو هجوم يهدف لإغراق الخادم بالطلبات لجعله غير متاح للمستخدمين.",
  },
  {
    id: 112,
    question: "ما هو الغرض من التشفير النهائي (End-to-End Encryption)؟",
    options: ["تسريع الرسائل", "حماية الرسائل من المرسل للمستقبل", "ضغط الملفات", "تحسين الجودة"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "التشفير النهائي يضمن أن الرسائل مشفرة من المرسل إلى المستقبل دون إمكانية قراءتها من الوسطاء.",
  },
  {
    id: 113,
    question: "أي من هذه أنواع الهجمات الاجتماعية؟",
    options: ["SQL Injection", "Social Engineering", "Buffer Overflow", "Cross-Site Scripting"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "الهندسة الاجتماعية تستخدم التلاعب النفسي للحصول على معلومات سرية من الأشخاص.",
  },
  {
    id: 114,
    question: "ما هو الغرض من IDS في الأمن السيبراني؟",
    options: ["تسريع الشبكة", "كشف التسلل والهجمات", "تخزين البيانات", "تشغيل البرامج"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "IDS (نظام كشف التسلل) يراقب الشبكة لاكتشاف الأنشطة المشبوهة والهجمات.",
  },
  {
    id: 115,
    question: "أي من هذه خوارزميات التشفير؟",
    options: ["HTML", "AES", "CSS", "JSON"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "AES (معيار التشفير المتقدم) هو خوارزمية تشفير قوية ومعتمدة عالمياً.",
  },
  {
    id: 116,
    question: "ما هو الغرض من Honeypot في الأمن السيبراني؟",
    options: ["تسريع الشبكة", "جذب المهاجمين لدراسة أساليبهم", "تخزين البيانات", "تشفير الملفات"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "Honeypot هو نظام طعم يجذب المهاجمين لدراسة أساليبهم وحماية الأنظمة الحقيقية.",
  },
  {
    id: 117,
    question: "أي من هذه أنواع البرمجيات الخبيثة؟",
    options: ["Antivirus", "Ransomware", "Firewall", "VPN"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "Ransomware هو نوع من البرمجيات الخبيثة التي تشفر الملفات وتطلب فدية لفك التشفير.",
  },
  {
    id: 118,
    question: "ما هو الغرض من PKI؟",
    options: ["تسريع الإنترنت", "إدارة المفاتيح العامة", "تخزين الملفات", "تشغيل البرامج"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "PKI (البنية التحتية للمفاتيح العامة) تدير إنشاء وتوزيع وإلغاء الشهادات الرقمية.",
  },
  {
    id: 119,
    question: "أي من هذه تقنيات المصادقة البيومترية؟",
    options: ["كلمة المرور", "بصمة الإصبع", "رمز PIN", "بطاقة الهوية"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "بصمة الإصبع هي تقنية مصادقة بيومترية تستخدم الخصائص الفيزيائية الفريدة للشخص.",
  },
  {
    id: 120,
    question: "ما هو الغرض من SIEM؟",
    options: ["تسريع الشبكة", "إدارة معلومات وأحداث الأمان", "تخزين البيانات", "تشغيل البرامج"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "SIEM يجمع ويحلل بيانات الأمان من مصادر متعددة لاكتشاف التهديدات.",
  },
  {
    id: 121,
    question: "أي من هذه هجمات تطبيقات الويب؟",
    options: ["Physical Attack", "SQL Injection", "Social Engineering", "Shoulder Surfing"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "SQL Injection هو هجوم يستغل ثغرات في تطبيقات الويب للوصول لقاعدة البيانات.",
  },
  {
    id: 122,
    question: "ما هو الغرض من Digital Forensics؟",
    options: ["تسريع الحاسوب", "التحقيق في الجرائم الرقمية", "تصميم البرامج", "إدارة الشبكات"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "الطب الشرعي الرقمي يحقق في الجرائم الإلكترونية ويجمع الأدلة الرقمية.",
  },
  {
    id: 123,
    question: "أي من هذه بروتوكولات المصادقة؟",
    options: ["HTTP", "Kerberos", "FTP", "SMTP"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "Kerberos هو بروتوكول مصادقة آمن يستخدم التذاكر للتحقق من هوية المستخدمين.",
  },
  {
    id: 124,
    question: "ما هو الغرض من Penetration Testing؟",
    options: ["تسريع الشبكة", "اختبار أمان الأنظمة", "تخزين البيانات", "تطوير البرامج"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "اختبار الاختراق يحاكي الهجمات الحقيقية لاكتشاف الثغرات الأمنية.",
  },
  {
    id: 125,
    question: "أي من هذه أنواع التشفير؟",
    options: ["Symmetric", "HTML", "CSS", "JSON"],
    correct: 0,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "التشفير المتماثل يستخدم نفس المفتاح للتشفير وفك التشفير.",
  },
  {
    id: 126,
    question: "ما هو الغرض من Access Control؟",
    options: ["تسريع الوصول", "التحكم في صلاحيات المستخدمين", "تخزين البيانات", "تشغيل البرامج"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "التحكم في الوصول يحدد من يمكنه الوصول لأي موارد وما يمكنه فعله بها.",
  },
  {
    id: 127,
    question: "أي من هذه تقنيات إخفاء البيانات؟",
    options: ["Encryption", "Steganography", "Compression", "Backup"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "Steganography هي تقنية إخفاء البيانات داخل ملفات أخرى بحيث لا تكون مرئية.",
  },
  {
    id: 128,
    question: "ما هو الغرض من Zero Trust Security؟",
    options: ["تسريع الشبكة", "عدم الثقة في أي شيء افتراضياً", "تخزين البيانات", "تطوير البرامج"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "Zero Trust يفترض أن كل شيء غير آمن ويتطلب التحقق من كل طلب وصول.",
  },
  {
    id: 129,
    question: "أي من هذه أدوات مراقبة الأمان؟",
    options: ["Word", "Splunk", "Excel", "PowerPoint"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "Splunk هي منصة قوية لجمع وتحليل ومراقبة بيانات الأمان والأحداث.",
  },
  {
    id: 130,
    question: "ما هو الغرض من Incident Response؟",
    options: ["تطوير البرامج", "الاستجابة للحوادث الأمنية", "تخزين البيانات", "تسريع الشبكة"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "الاستجابة للحوادث هي عملية منظمة للتعامل مع الحوادث الأمنية وتقليل أضرارها.",
  },
  {
    id: 131,
    question: "أي من هذه معايير الأمان؟",
    options: ["HTML5", "ISO 27001", "CSS3", "JSON"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "ISO 27001 هو معيار دولي لإدارة أمن المعلومات ونظم الإدارة الأمنية.",
  },
  {
    id: 132,
    question: "ما هو الغرض من Vulnerability Assessment؟",
    options: ["تطوير البرامج", "تقييم الثغرات الأمنية", "تخزين البيانات", "تسريع الشبكة"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "تقييم الثغرات يحدد ويصنف نقاط الضعف في الأنظمة والتطبيقات.",
  },
  {
    id: 133,
    question: "أي من هذه أنواع الهجمات؟",
    options: ["Backup", "Man-in-the-Middle", "Update", "Install"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "هجوم الرجل في المنتصف يعترض الاتصالات بين طرفين لسرقة أو تعديل البيانات.",
  },
  {
    id: 134,
    question: "ما هو الغرض من Security Awareness Training؟",
    options: ["تطوير البرامج", "تثقيف المستخدمين حول الأمان", "تخزين البيانات", "تسريع الشبكة"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "سهل",
    explanation: "التدريب على الوعي الأمني يعلم المستخدمين كيفية التعرف على التهديدات وتجنبها.",
  },
  {
    id: 135,
    question: "أي من هذه تقنيات الحماية من البرمجيات الخبيثة؟",
    options: ["Antivirus", "Word", "Excel", "PowerPoint"],
    correct: 0,
    category: "الأمن السيبراني",
    difficulty: "سهل",
    explanation: "برامج مكافحة الفيروسات تكتشف وتزيل البرمجيات الخبيثة من الأجهزة.",
  },
  {
    id: 136,
    question: "ما هو الغرض من Risk Assessment؟",
    options: ["تطوير البرامج", "تقييم المخاطر الأمنية", "تخزين البيانات", "تسريع الشبكة"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "تقييم المخاطر يحدد ويحلل التهديدات المحتملة وتأثيرها على المؤسسة.",
  },
  {
    id: 137,
    question: "أي من هذه أدوات التشفير؟",
    options: ["Notepad", "GPG", "Calculator", "Paint"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "GPG (GNU Privacy Guard) هي أداة تشفير مفتوحة المصدر لحماية البيانات والاتصالات.",
  },
  {
    id: 138,
    question: "ما هو الغرض من Security Policy؟",
    options: ["تطوير البرامج", "تحديد قواعد وإجراءات الأمان", "تخزين البيانات", "تسريع الشبكة"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "سياسة الأمان تحدد القواعد والإجراءات التي يجب اتباعها لحماية المعلومات.",
  },
  {
    id: 139,
    question: "أي من هذه أنواع المصادقة؟",
    options: ["Something you know", "HTML", "CSS", "JSON"],
    correct: 0,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "Something you know (شيء تعرفه) مثل كلمة المرور هو أحد عوامل المصادقة الثلاثة.",
  },
  {
    id: 140,
    question: "ما هو الغرض من Secure Coding؟",
    options: ["تسريع البرمجة", "كتابة كود آمن خالي من الثغرات", "تقليل حجم الكود", "تحسين التصميم"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "البرمجة الآمنة تتبع ممارسات تقلل من الثغرات الأمنية في التطبيقات.",
  },
  {
    id: 141,
    question: "أي من هذه أنواع الشهادات الرقمية؟",
    options: ["HTML Certificate", "SSL Certificate", "CSS Certificate", "JSON Certificate"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "شهادة SSL تؤكد هوية الموقع وتشفر الاتصال بينه وبين المستخدمين.",
  },
  {
    id: 142,
    question: "ما هو الغرض من Data Loss Prevention؟",
    options: ["تسريع نقل البيانات", "منع تسرب البيانات الحساسة", "ضغط البيانات", "تخزين البيانات"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "منع فقدان البيانات يراقب ويحمي البيانات الحساسة من التسرب أو السرقة.",
  },
  {
    id: 143,
    question: "أي من هذه تقنيات الأمان السحابي؟",
    options: ["CASB", "HTML", "CSS", "JSON"],
    correct: 0,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "CASB (وسيط أمان الوصول السحابي) يوفر الأمان والتحكم في استخدام الخدمات السحابية.",
  },
  {
    id: 144,
    question: "ما هو الغرض من Threat Intelligence؟",
    options: ["تطوير البرامج", "جمع معلومات عن التهديدات", "تخزين البيانات", "تسريع الشبكة"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "استخبارات التهديدات تجمع وتحلل معلومات عن التهديدات الحالية والناشئة.",
  },
  {
    id: 145,
    question: "أي من هذه أدوات اختبار الأمان؟",
    options: ["Word", "Nessus", "Excel", "PowerPoint"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "Nessus هي أداة قوية لفحص الثغرات الأمنية في الأنظمة والشبكات.",
  },
  {
    id: 146,
    question: "ما هو الغرض من Security Orchestration؟",
    options: ["تطوير البرامج", "تنسيق وأتمتة العمليات الأمنية", "تخزين البيانات", "تسريع الشبكة"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "تنسيق الأمان يربط ويؤتمت أدوات وعمليات الأمان المختلفة لتحسين الاستجابة.",
  },
  {
    id: 147,
    question: "أي من هذه معايير التشفير؟",
    options: ["HTML5", "AES-256", "CSS3", "JSON"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "AES-256 هو معيار تشفير قوي يستخدم مفاتيح بطول 256 بت لحماية البيانات.",
  },
  {
    id: 148,
    question: "ما هو الغرض من Compliance في الأمن السيبراني؟",
    options: ["تطوير البرامج", "الامتثال للقوانين والمعايير", "تخزين البيانات", "تسريع الشبكة"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "الامتثال يضمن أن المؤسسة تتبع القوانين والمعايير الأمنية المطلوبة.",
  },
  {
    id: 149,
    question: "أي من هذه أنواع الهجمات المتقدمة؟",
    options: ["Simple Password", "APT", "Basic Virus", "Email"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "صعب",
    explanation: "APT (التهديد المستمر المتقدم) هو هجوم معقد ومستمر يستهدف منظمات محددة.",
  },
  {
    id: 150,
    question: "ما هو الغرض من Security Metrics؟",
    options: ["تطوير البرامج", "قياس فعالية الأمان", "تخزين البيانات", "تسريع الشبكة"],
    correct: 1,
    category: "الأمن السيبراني",
    difficulty: "متوسط",
    explanation: "مقاييس الأمان تقيس وتتتبع فعالية الضوابط والعمليات الأمنية في المؤسسة.",
  },
]

interface QuizGameProps {
  onBack: () => void
  playerName: string
}

export default function QuizGame({ onBack, playerName }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([])

  const { addScore } = useLeaderboard()

  // Shuffle questions on game start
  useEffect(() => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 20) // Take 20 random questions
    setShuffledQuestions(shuffled)
    setStartTime(new Date())
  }, [])

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !gameComplete && shuffledQuestions.length > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer()
    }
  }, [timeLeft, showResult, gameComplete, shuffledQuestions])

  const handleAnswer = () => {
    setShowResult(true)
    if (selectedAnswer === shuffledQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setTimeLeft(30)
    } else {
      setGameComplete(true)
      handleSaveScore()
    }
  }

  const handleSaveScore = () => {
    if (startTime) {
      const endTime = new Date()
      const timeTaken = Math.floor((endTime.getTime() - startTime.getTime()) / 1000)
      const timeBonus = Math.max(0, (shuffledQuestions.length * 30 - timeTaken) / 10)
      const percentage = Math.round((score / shuffledQuestions.length) * 100)

      addScore({
        playerName,
        game: "quiz",
        score,
        maxScore: shuffledQuestions.length,
        percentage,
        details: {
          timeBonus: Math.round(timeBonus),
        },
      })
    }
  }

  const resetGame = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 20)
    setShuffledQuestions(shuffled)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setGameComplete(false)
    setTimeLeft(30)
    setStartTime(new Date())
  }

  if (shuffledQuestions.length === 0) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 flex items-center justify-center"
        dir="rtl"
      >
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <Brain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-400" />
          </div>
          <p className="text-white text-lg">جاري تحضير التحدي التقني...</p>
          <p className="text-blue-300 text-sm mt-2">خلط الأسئلة وإعداد التحدي المخصص لك</p>
        </div>
      </div>
    )
  }

  const currentQ = shuffledQuestions[currentQuestion]

  if (gameComplete) {
    const percentage = Math.round((score / shuffledQuestions.length) * 100)
    const getRankMessage = () => {
      if (percentage >= 90)
        return {
          message: "ممتاز! خبير تقني متميز!",
          icon: <Star className="w-8 h-8 text-yellow-400" />,
          color: "from-yellow-500 to-amber-500",
        }
      if (percentage >= 80)
        return {
          message: "عمل ممتاز! مهندس تقني ماهر!",
          icon: <Trophy className="w-8 h-8 text-yellow-400" />,
          color: "from-yellow-500 to-orange-500",
        }
      if (percentage >= 60)
        return {
          message: "عمل جيد! تقدم ملحوظ!",
          icon: <Zap className="w-8 h-8 text-blue-400" />,
          color: "from-blue-500 to-purple-500",
        }
      return {
        message: "استمر في التعلم وحاول مرة أخرى!",
        icon: <Brain className="w-8 h-8 text-purple-400" />,
        color: "from-purple-500 to-pink-500",
      }
    }

    const rankInfo = getRankMessage()

    return (
      <div
        className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 relative overflow-hidden"
        dir="rtl"
      >
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          <Button onClick={onBack} variant="ghost" className="mb-4 text-white hover:text-blue-300">
            <ArrowRight className="w-4 h-4 ml-2" />
            العودة للقائمة
          </Button>

          <Card className="text-center backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
            <CardHeader>
              <div className="flex justify-center mb-6">
                <div className={`p-4 rounded-full bg-gradient-to-r ${rankInfo.color}`}>{rankInfo.icon}</div>
              </div>
              <CardTitle className="text-3xl text-white mb-2">اكتمل التحدي التقني!</CardTitle>
              <div className="text-cyan-300">كلية تقنية المعلومات - جامعة اجدابيا</div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {score}/{shuffledQuestions.length}
                  </div>
                  <div className="text-gray-300 text-sm">النقاط المحققة</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    {percentage}%
                  </div>
                  <div className="text-gray-300 text-sm">نسبة النجاح</div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                <p className="text-white font-medium">{rankInfo.message}</p>
              </div>

              <div className="text-sm text-cyan-300">
                تم حفظ نقاطك تلقائياً باسم: <span className="font-bold text-white">{playerName}</span>
              </div>

              <div className="flex gap-3 justify-center">
                <Button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  تحدي جديد
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
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 relative overflow-hidden"
      dir="rtl"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <Button onClick={onBack} variant="ghost" className="mb-4 text-white hover:text-blue-300">
          <ArrowRight className="w-4 h-4 ml-2" />
          العودة للقائمة
        </Button>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-300">
                السؤال {currentQuestion + 1} من {shuffledQuestions.length}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium text-cyan-300 bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-500/30">
                  {currentQ.category}
                </div>
                <div
                  className={`text-sm font-medium px-3 py-1 rounded-full border ${
                    currentQ.difficulty === "سهل"
                      ? "text-green-300 bg-green-500/20 border-green-500/30"
                      : currentQ.difficulty === "متوسط"
                        ? "text-yellow-300 bg-yellow-500/20 border-yellow-500/30"
                        : "text-red-300 bg-red-500/20 border-red-500/30"
                  }`}
                >
                  {currentQ.difficulty}
                </div>
              </div>
            </div>

            <Progress value={(currentQuestion / shuffledQuestions.length) * 100} className="mb-6 h-2 bg-white/10" />

            <div className="flex justify-between items-start gap-4">
              <CardTitle className="text-xl text-white leading-relaxed flex-1">{currentQ.question}</CardTitle>
              <div className="text-center min-w-[80px]">
                <div
                  className={`text-3xl font-bold ${timeLeft <= 10 ? "text-red-400 animate-pulse" : "text-orange-400"}`}
                >
                  {timeLeft}
                </div>
                <div className="text-xs text-gray-400">ثانية</div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                className={`w-full text-right justify-start h-auto p-4 transition-all duration-300 ${
                  showResult
                    ? index === currentQ.correct
                      ? "bg-green-500/20 border-green-500 text-green-300 hover:bg-green-500/30"
                      : selectedAnswer === index
                        ? "bg-red-500/20 border-red-500 text-red-300 hover:bg-red-500/30"
                        : "bg-white/5 border-white/20 text-gray-300"
                    : selectedAnswer === index
                      ? "bg-blue-500/20 border-blue-500 text-blue-300"
                      : "bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                }`}
                onClick={() => !showResult && setSelectedAnswer(index)}
                disabled={showResult}
              >
                <div className="flex items-center w-full">
                  {showResult && index === currentQ.correct && (
                    <CheckCircle className="w-5 h-5 ml-auto text-green-400" />
                  )}
                  {showResult && selectedAnswer === index && index !== currentQ.correct && (
                    <XCircle className="w-5 h-5 ml-auto text-red-400" />
                  )}
                  <span className="flex-1 text-right">{option}</span>
                  <span className="w-8 h-8 rounded-full border-2 border-current mr-3 flex items-center justify-center text-sm font-bold">
                    {String.fromCharCode(1571 + index)} {/* Arabic letters أ ب ج د */}
                  </span>
                </div>
              </Button>
            ))}

            {showResult && (
              <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <p className="text-blue-300 text-sm leading-relaxed">
                  <strong className="text-blue-200">التفسير:</strong> {currentQ.explanation}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/10">
              <div className="text-sm text-gray-300">
                النقاط: <span className="text-white font-bold">{score}</span>/{currentQuestion + (showResult ? 1 : 0)}
              </div>
              {!showResult ? (
                <Button
                  onClick={handleAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:opacity-50"
                >
                  إرسال الإجابة
                </Button>
              ) : (
                <Button
                  onClick={nextQuestion}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                >
                  {currentQuestion < shuffledQuestions.length - 1 ? "السؤال التالي" : "عرض النتائج"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
