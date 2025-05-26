export interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  category: string
  difficulty: "سهل" | "متوسط" | "صعب"
  explanation: string
  // New property to track which games have used this question
  usedIn?: string[]
}

export interface MatchPair {
  id: number
  term: string
  concept: string
  category: string
  difficulty: "سهل" | "متوسط" | "صعب"
  description: string
  // New property to track which games have used this pair
  usedIn?: string[]
}

// Export all questions as a single source of truth
// These will be imported by individual games
export const questionPool: Question[] = [
  // أسئلة سهلة
  {
    id: 1,
    question: "ماذا يعني اختصار HTML؟",
    options: ["لغة ترميز النص التشعبي", "لغة التقنية الحديثة العالية", "لغة ترميز أدوات المنزل"],
    correct: 0,
    category: "الويب",
    difficulty: "سهل",
    explanation: "HTML تعني HyperText Markup Language وهي لغة ترميز صفحات الويب.",
    usedIn: [],
  },
  {
    id: 2,
    question: "ما هو نظام التشغيل الأكثر استخداماً للهواتف الذكية؟",
    options: ["iOS", "Android", "Windows"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "سهل",
    explanation: "Android هو نظام التشغيل الأكثر انتشاراً عالمياً للهواتف الذكية.",
    usedIn: [],
  },
  {
    id: 3,
    question: "ما هي وظيفة محرك البحث؟",
    options: ["تخزين الملفات", "البحث عن المعلومات", "إرسال البريد الإلكتروني"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "سهل",
    explanation: "محركات البحث تساعد في العثور على المعلومات على الإنترنت.",
    usedIn: [],
  },
  {
    id: 4,
    question: "ماذا يعني اختصار CPU؟",
    options: ["وحدة معالجة الحاسوب", "وحدة المعالجة المركزية", "وحدة البرنامج المركزي"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "سهل",
    explanation: "CPU تعني Central Processing Unit وهي وحدة المعالجة المركزية.",
    usedIn: [],
  },
  {
    id: 5,
    question: "أي بروتوكول آمن للويب؟",
    options: ["HTTP", "HTTPS", "FTP"],
    correct: 1,
    category: "الأمان",
    difficulty: "سهل",
    explanation: "HTTPS هو النسخة الآمنة من HTTP ويستخدم التشفير.",
    usedIn: [],
  },
  {
    id: 6,
    question: "ما هو الغرض من Git؟",
    options: ["تصفح الإنترنت", "التحكم في الإصدارات", "تشغيل البرامج"],
    correct: 1,
    category: "البرمجة",
    difficulty: "سهل",
    explanation: "Git هو نظام للتحكم في إصدارات الكود ومتابعة التغييرات.",
    usedIn: [],
  },
  {
    id: 7,
    question: "أي من هذه قواعد البيانات؟",
    options: ["HTML", "MySQL", "CSS"],
    correct: 1,
    category: "البيانات",
    difficulty: "سهل",
    explanation: "MySQL هي نظام إدارة قواعد البيانات العلائقية.",
    usedIn: [],
  },
  {
    id: 8,
    question: "ما هو الغرض من جدار الحماية؟",
    options: ["تسريع الإنترنت", "حماية الشبكة", "تخزين الملفات"],
    correct: 1,
    category: "الأمان",
    difficulty: "سهل",
    explanation: "جدار الحماية يحمي الشبكة من التهديدات الخارجية.",
    usedIn: [],
  },
  {
    id: 9,
    question: "ماذا يعني اختصار RAM؟",
    options: ["ذاكرة الوصول العشوائي", "ذاكرة القراءة فقط", "ذاكرة التخزين"],
    correct: 0,
    category: "الأجهزة",
    difficulty: "سهل",
    explanation: "RAM تعني Random Access Memory وهي الذاكرة المؤقتة.",
    usedIn: [],
  },
  {
    id: 10,
    question: "أي من هذه متصفحات الإنترنت؟",
    options: ["Windows", "Chrome", "Office"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "سهل",
    explanation: "Chrome هو متصفح إنترنت من شركة Google.",
    usedIn: [],
  },
  {
    id: 11,
    question: "ما هو الغرض من USB؟",
    options: ["تخزين البيانات فقط", "ربط الأجهزة", "تشغيل البرامج"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "سهل",
    explanation: "USB هو منفذ لربط الأجهزة المختلفة بالحاسوب.",
    usedIn: [],
  },
  {
    id: 12,
    question: "أي من هذه خدمات البريد الإلكتروني؟",
    options: ["Facebook", "Gmail", "YouTube"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "سهل",
    explanation: "Gmail هي خدمة بريد إلكتروني من Google.",
    usedIn: [],
  },
  {
    id: 13,
    question: "ما هو الغرض من كلمة المرور؟",
    options: ["تسريع الجهاز", "حماية الحساب", "تخزين الملفات"],
    correct: 1,
    category: "الأمان",
    difficulty: "سهل",
    explanation: "كلمة المرور تحمي الحساب من الوصول غير المصرح به.",
    usedIn: [],
  },
  {
    id: 14,
    question: "ما هو الإنترنت؟",
    options: ["جهاز كمبيوتر", "شبكة عالمية", "نظام تشغيل"],
    correct: 1,
    category: "الإنترنت",
    difficulty: "سهل",
    explanation: "الإنترنت يربط الشبكات حول العالم لتبادل المعلومات.",
    usedIn: [],
  },
  {
    id: 15,
    question: "ما هي الطابعة؟",
    options: ["جهاز إدخال", "جهاز إخراج", "وحدة معالجة"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "سهل",
    explanation: "الطابعة تحول المستندات الرقمية إلى نسخ ورقية.",
    usedIn: [],
  },
  {
    id: 16,
    question: "أي من هذه لغات البرمجة؟",
    options: ["Windows", "Java", "Excel"],
    correct: 1,
    category: "البرمجة",
    difficulty: "سهل",
    explanation: "Java هي لغة برمجة شائعة الاستخدام في تطوير التطبيقات.",
    usedIn: [],
  },
  {
    id: 17,
    question: "ما هي شبكة WiFi؟",
    options: ["كابل إنترنت", "شبكة لاسلكية", "قرص صلب"],
    correct: 1,
    category: "الشبكات",
    difficulty: "سهل",
    explanation: "WiFi هي تقنية للاتصال اللاسلكي بالإنترنت والشبكات.",
    usedIn: [],
  },
  {
    id: 18,
    question: "ما هو نظام التشغيل؟",
    options: ["برنامج حماية", "برنامج يدير الجهاز", "متصفح إنترنت"],
    correct: 1,
    category: "الأنظمة",
    difficulty: "سهل",
    explanation: "نظام التشغيل هو البرنامج الأساسي الذي يدير موارد الجهاز.",
    usedIn: [],
  },
  {
    id: 19,
    question: "ما هو الغرض من الماسح الضوئي؟",
    options: ["طباعة المستندات", "تحويل الوثائق إلى صور رقمية", "تخزين البيانات"],
    correct: 1,
    category: "الأجهزة",
    difficulty: "سهل",
    explanation: "الماسح الضوئي يحول المستندات والصور الورقية إلى ملفات رقمية.",
    usedIn: [],
  },
  {
    id: 20,
    question: "أي من هذه برامج مكافحة الفيروسات؟",
    options: ["Word", "Antivirus", "Calculator"],
    correct: 1,
    category: "الأمان",
    difficulty: "سهل",
    explanation: "برامج مكافحة الفيروسات تحمي الأجهزة من البرمجيات الضارة.",
    usedIn: [],
  },
  // Add UI Designer game questions
  {
    id: 101,
    question: "ما هو الهدف الأساسي من تصميم واجهة المستخدم؟",
    options: ["جعل التطبيق جميلاً فقط", "تسهيل تفاعل المستخدم مع النظام", "زيادة حجم التطبيق"],
    correct: 1,
    category: "تصميم الواجهات",
    difficulty: "سهل",
    explanation: "الهدف الأساسي هو تسهيل تفاعل المستخدم مع النظام وجعل التجربة بديهية.",
    usedIn: [],
  },
  {
    id: 102,
    question: "أي من هذه العناصر يعتبر عنصر إدخال (Input)؟",
    options: ["زر (Button)", "حقل نصي (Text Field)", "صورة (Image)"],
    correct: 1,
    category: "تصميم الواجهات",
    difficulty: "سهل",
    explanation: "حقل النص هو عنصر إدخال يسمح للمستخدم بإدخال البيانات.",
    usedIn: [],
  },
  {
    id: 103,
    question: "ما هو المقصود بمبدأ الاتساق في التصميم؟",
    options: ["استخدام ألوان عشوائية", "تكرار الأنماط والعناصر لتسهيل الفهم", "تغيير الخطوط في كل صفحة"],
    correct: 1,
    category: "تصميم الواجهات",
    difficulty: "متوسط",
    explanation: "الاتساق يعني تكرار الأنماط والعناصر لتسهيل الفهم على المستخدم.",
    usedIn: [],
  },
  {
    id: 104,
    question: "أي من هذه الأدوات تُستخدم لسحب وإفلات العناصر في التصميم؟",
    options: ["Drag & Drop", "Copy & Paste", "Zoom In/Out"],
    correct: 0,
    category: "تصميم الواجهات",
    difficulty: "سهل",
    explanation: "Drag & Drop تعني السحب والإفلات وهي تقنية شائعة في تصميم الواجهات.",
    usedIn: [],
  },
  {
    id: 105,
    question: "ما هو أفضل وصف لتجربة المستخدم (UX)؟",
    options: ["جمال الألوان فقط", "شعور ورضا المستخدم أثناء استخدام النظام", "عدد الأزرار في الصفحة"],
    correct: 1,
    category: "تصميم الواجهات",
    difficulty: "متوسط",
    explanation: "تجربة المستخدم تعني شعور ورضا المستخدم أثناء استخدام النظام.",
    usedIn: [],
  }
]

export const matchPairsPool: MatchPair[] = [
  // البرمجة وتطوير الويب
  {
    id: 1,
    term: "HTML",
    concept: "هيكل صفحات الويب",
    category: "تطوير الويب",
    difficulty: "سهل",
    description: "لغة ترميز النص التشعبي",
    usedIn: [],
  },
  // ... copy all other match pairs from matching-game.tsx and concept-data.ts
]

// Helper functions to manage question usage
export function getUnusedQuestions(gameId: string, count: number, category?: string, difficulty?: string, ignoreUsage: boolean = false): Question[] {
  // If ignoreUsage is true, return random questions from the pool without checking usage
  if (ignoreUsage) {
    // Just filter by category and difficulty if specified
    const filteredQuestions = questionPool.filter(q => 
      (category ? q.category === category : true) &&
      (difficulty ? q.difficulty === difficulty : true)
    );
    
    // Shuffle and pick random questions
    const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    
    // Still mark them as used
    selected.forEach(q => {
      if (!q.usedIn) q.usedIn = [];
      if (!q.usedIn.includes(gameId)) q.usedIn.push(gameId);
    });
    
    return selected;
  }
  
  // Normal behavior - filter questions that haven't been used in this game
  let availableQuestions = questionPool.filter(q => 
    !q.usedIn?.includes(gameId) && 
    (category ? q.category === category : true) &&
    (difficulty ? q.difficulty === difficulty : true)
  );
  
  // If not enough unused questions, reset usage for this game
  if (availableQuestions.length < count) {
    questionPool.forEach(q => {
      if (q.usedIn?.includes(gameId)) {
        q.usedIn = q.usedIn.filter(g => g !== gameId);
      }
    });
    
    // Refilter after reset
    availableQuestions = questionPool.filter(q => 
      !q.usedIn?.includes(gameId) &&
      (category ? q.category === category : true) &&
      (difficulty ? q.difficulty === difficulty : true)
    );
  }
  
  // Shuffle and pick random questions
  const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));
  
  // Mark selected questions as used in this game
  selected.forEach(q => {
    if (!q.usedIn) q.usedIn = [];
    if (!q.usedIn.includes(gameId)) q.usedIn.push(gameId);
  });
  
  return selected;
}

export function getUnusedMatchPairs(gameId: string, count: number, category?: string, difficulty?: string): MatchPair[] {
  // Similar logic as getUnusedQuestions but for match pairs
  let availablePairs = matchPairsPool.filter(p => 
    !p.usedIn?.includes(gameId) &&
    (category ? p.category === category : true) &&
    (difficulty ? p.difficulty === difficulty : true)
  );
  
  if (availablePairs.length < count) {
    matchPairsPool.forEach(p => {
      if (p.usedIn?.includes(gameId)) {
        p.usedIn = p.usedIn.filter(g => g !== gameId);
      }
    });
    
    availablePairs = matchPairsPool.filter(p => 
      !p.usedIn?.includes(gameId) &&
      (category ? p.category === category : true) &&
      (difficulty ? p.difficulty === difficulty : true)
    );
  }
  
  const shuffled = [...availablePairs].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);
  
  selected.forEach(p => {
    if (!p.usedIn) p.usedIn = [];
    if (!p.usedIn.includes(gameId)) p.usedIn.push(gameId);
  });
  
  return selected;
}

// Save and load question usage state to localStorage
export function saveQuestionUsageState() {
  const usageState = {
    questions: questionPool.map(q => ({ id: q.id, usedIn: q.usedIn || [] })),
    matchPairs: matchPairsPool.map(p => ({ id: p.id, usedIn: p.usedIn || [] })),
  };
  localStorage.setItem('questionUsageState', JSON.stringify(usageState));
}

export function loadQuestionUsageState() {
  const savedState = localStorage.getItem('questionUsageState');
  if (!savedState) return;
  
  try {
    const usageState = JSON.parse(savedState);
    
    // Update question usage state
    usageState.questions.forEach((state: {id: number, usedIn: string[]}) => {
      const question = questionPool.find(q => q.id === state.id);
      if (question) question.usedIn = state.usedIn;
    });
    
    // Update match pair usage state
    usageState.matchPairs.forEach((state: {id: number, usedIn: string[]}) => {
      const pair = matchPairsPool.find(p => p.id === state.id);
      if (pair) pair.usedIn = state.usedIn;
    });
  } catch (e) {
    console.error('Error loading question usage state:', e);
  }
}

export const cyberSecurityQuestions: Question[] = [
  {
    id: 1,
    question: "ما هو كلمة المرور القوية؟",
    options: [
      "123456",
      "password123",
      "P@ssw0rd!2024",
      "qwerty"
    ],
    correct: 2,
    category: "basics",
    difficulty: "سهل",
    explanation: "كلمة المرور القوية تحتوي على أحرف مختلفة وأرقام ورموز خاصة.",
    usedIn: [],
  },
  {
    id: 2,
    question: "ما هو أفضل إجراء لحماية حسابك على مواقع التواصل الاجتماعي؟",
    options: [
      "مشاركة كلمة المرور مع الأصدقاء",
      "تفعيل المصادقة الثنائية",
      "استخدام نفس كلمة المرور لجميع الحسابات",
      "عدم تغيير كلمة المرور أبداً"
    ],
    correct: 1,
    category: "basics",
    difficulty: "سهل",
    explanation: "تفعيل المصادقة الثنائية يعطيك أمانًا أكبر من مشاركة كلمة المرور مع الأصدقاء.",
    usedIn: [],
  },
  {
    id: 3,
    question: "ما هو الفيروس الحاسوبي؟",
    options: [
      "برنامج مفيد للحاسوب",
      "برنامج ضار ينتشر بين الأجهزة",
      "جهاز حماية للحاسوب",
      "برنامج مكافحة الفيروسات"
    ],
    correct: 1,
    category: "basics",
    difficulty: "سهل",
    explanation: "الفيروس الحاسوبي هو برنامج ضار ينتشر بين الأجهزة ويمكن أن يسبب ضرر كبير للنظام.",
    usedIn: [],
  },
  {
    id: 4,
    question: "ما هو HTTPS؟",
    options: [
      "بروتوكول غير آمن",
      "بروتوكول آمن للاتصال بالإنترنت",
      "نوع من الفيروسات",
      "برنامج مكافحة الفيروسات"
    ],
    correct: 1,
    category: "basics",
    difficulty: "سهل",
    explanation: "HTTPS هو بروتوكول آمن للاتصال بالإنترنت ويستخدم التشفير.",
    usedIn: [],
  },
  {
    id: 5,
    question: "ما هو أفضل إجراء عند تلقي بريد إلكتروني مشبوه؟",
    options: [
      "فتح المرفقات مباشرة",
      "الرد على البريد",
      "حذف البريد دون فتحه",
      "مشاركة البريد مع الأصدقاء"
    ],
    correct: 2,
    category: "basics",
    difficulty: "سهل",
    explanation: "حذف البريد دون فتحه هو أفضل إجراء لحماية البيانات والحساب.",
    usedIn: [],
  },
  {
    id: 6,
    question: "ما هو جدار الحماية (Firewall)؟",
    options: [
      "برنامج مكافحة الفيروسات",
      "نظام حماية يمنع الوصول غير المصرح به",
      "نوع من الفيروسات",
      "برنامج تصفح الإنترنت"
    ],
    correct: 1,
    category: "basics",
    difficulty: "سهل",
    explanation: "جدار الحماية يمنع الوصول غير المصرح به إلى الجهاز أو الشبكة.",
    usedIn: [],
  },
  {
    id: 7,
    question: "ما هو التشفير؟",
    options: [
      "تحويل البيانات إلى شكل غير مقروء",
      "حذف البيانات",
      "نسخ البيانات",
      "طباعة البيانات"
    ],
    correct: 0,
    category: "basics",
    difficulty: "سهل",
    explanation: "التشفير هو عملية تحويل البيانات إلى شكل غير مقروء لتحمية البيانات.",
    usedIn: [],
  },
  {
    id: 8,
    question: "ما هو أفضل إجراء لحماية هاتفك الذكي؟",
    options: [
      "تركه مفتوحاً دائماً",
      "تثبيت كلمة مرور قوية",
      "مشاركة كلمة المرور مع الأصدقاء",
      "عدم تحديث النظام أبداً"
    ],
    correct: 1,
    category: "basics",
    difficulty: "سهل",
    explanation: "تثبيت كلمة مرور قوية يعطيك أمانًا أكبر من مشاركة كلمة المرور مع الأصدقاء.",
    usedIn: [],
  },
  {
    id: 9,
    question: "ما هو التصيد الاحتيالي (Phishing)؟",
    options: [
      "صيد السمك عبر الإنترنت",
      "محاولة سرقة المعلومات الشخصية",
      "نوع من الألعاب",
      "برنامج مفيد"
    ],
    correct: 1,
    category: "basics",
    difficulty: "سهل",
    explanation: "التصيد الاحتيالي هو محاولة سرقة المعلومات الشخصية عبر الإنترنت.",
    usedIn: [],
  },
  {
    id: 10,
    question: "ما هو أفضل إجراء عند استخدام شبكة WiFi عامة؟",
    options: [
      "تسجيل الدخول إلى الحسابات المصرفية",
      "تجنب إدخال المعلومات الحساسة",
      "مشاركة كلمات المرور",
      "فتح جميع المواقع"
    ],
    correct: 1,
    category: "basics",
    difficulty: "سهل",
    explanation: "تجنب إدخال المعلومات الحساسة يعطيك أمانًا أكبر من مشاركة كلمات المرور.",
    usedIn: [],
  },
  {
    id: 11,
    question: "ما هو النسخ الاحتياطي (Backup)؟",
    options: [
      "حذف البيانات",
      "نسخ البيانات لحفظها",
      "تشفير البيانات",
      "مشاركة البيانات"
    ],
    correct: 1,
    category: "basics",
    difficulty: "سهل",
    explanation: "نسخ البيانات لحفظها يعطيك أمانًا إضافيًا عن طريق إنشاء نسخة احتياطية من البيانات.",
    usedIn: [],
  },
  {
    id: 12,
    question: "ما هو أفضل إجراء عند فقدان هاتفك؟",
    options: [
      "الانتظار حتى يعود",
      "تغيير كلمات المرور فوراً",
      "شراء هاتف جديد فقط",
      "عدم القلق"
    ],
    correct: 1,
    category: "basics",
    difficulty: "سهل",
    explanation: "تغيير كلمات المرور فوراً يعطيك أمانًا أكبر من الانتظار حتى يعود الهاتف.",
    usedIn: [],
  },
  {
    id: 13,
    question: "ما هو برنامج مكافحة الفيروسات؟",
    options: [
      "برنامج لحماية الحاسوب من البرمجيات الضارة",
      "نوع من الفيروسات",
      "برنامج تصفح الإنترنت",
      "برنامج تحرير الصور"
    ],
    correct: 0,
    category: "basics",
    difficulty: "سهل",
    explanation: "برنامج مكافحة الفيروسات يحمي الحاسوب من البرمجيات الضارة.",
    usedIn: [],
  },
  {
    id: 14,
    question: "ما هو أفضل إجراء عند استخدام مواقع التسوق الإلكتروني؟",
    options: [
      "استخدام شبكة WiFi عامة",
      "التحقق من أمان الموقع",
      "مشاركة بيانات البطاقة",
      "عدم التحقق من الموقع"
    ],
    correct: 1,
    category: "basics",
    difficulty: "سهل",
    explanation: "التحقق من أمان الموقع يعطيك أمانًا أكبر من مشاركة بيانات البطاقة.",
    usedIn: [],
  },
  {
    id: 15,
    question: "ما هو التحديث الأمني؟",
    options: [
      "تحديث يحسن أمان الجهاز",
      "تحديث المظهر فقط",
      "تحديث الألعاب",
      "تحديث التطبيقات فقط"
    ],
    correct: 0,
    category: "basics",
    difficulty: "سهل",
    explanation: "التحديث الأمني يحسن أمان الجهاز بتحديث البرامج والأنظمة.",
    usedIn: [],
  },
  {
    id: 16,
    question: "ما هو أفضل إجراء لحماية حسابك على البريد الإلكتروني؟",
    options: [
      "استخدام كلمة مرور بسيطة",
      "تفعيل المصادقة الثنائية",
      "مشاركة كلمة المرور",
      "عدم تغيير كلمة المرور"
    ],
    correct: 1,
    category: "basics",
    difficulty: "سهل",
    explanation: "تفعيل المصادقة الثنائية يعطيك أمانًا أكبر من مشاركة كلمة المرور.",
    usedIn: [],
  },
  {
    id: 17,
    question: "ما هو التصفح الآمن؟",
    options: [
      "تصفح جميع المواقع",
      "تصفح المواقع الآمنة فقط",
      "فتح جميع الروابط",
      "مشاركة البيانات"
    ],
    correct: 1,
    category: "basics",
    difficulty: "سهل",
    explanation: "تصفح المواقع الآمنة فقط يعطيك أمانًا أكبر من تصفح جميع المواقع.",
    usedIn: [],
  },
  {
    id: 18,
    question: "ما هو أفضل إجراء عند استخدام التطبيقات؟",
    options: [
      "تثبيت جميع التطبيقات",
      "التحقق من مصدر التطبيق",
      "تجاهل التقييمات",
      "عدم قراءة الأذونات"
    ],
    correct: 1,
    category: "basics",
    difficulty: "سهل",
    explanation: "التحقق من مصدر التطبيق يعطيك أمانًا أكبر من تثبيت جميع التطبيقات.",
    usedIn: [],
  },
  {
    id: 19,
    question: "ما هو حماية البيانات؟",
    options: [
      "حذف البيانات",
      "حماية المعلومات من السرقة",
      "مشاركة البيانات",
      "طباعة البيانات"
    ],
    correct: 1,
    category: "basics",
    difficulty: "سهل",
    explanation: "حماية البيانات تعني حماية المعلومات من السرقة أو التهديد.",
    usedIn: [],
  },
  {
    id: 20,
    question: "ما هو أفضل إجراء عند استخدام وسائل التواصل الاجتماعي؟",
    options: [
      "مشاركة كل شيء",
      "حماية الخصوصية",
      "قبول جميع الطلبات",
      "مشاركة الموقع"
    ],
    correct: 1,
    category: "basics",
    difficulty: "سهل",
    explanation: "حماية الخصوصية يعطيك أمانًا أكبر من مشاركة كل شيء.",
    usedIn: [],
  },
  {
    id: 21,
    question: "ما هو التشفير المتماثل؟",
    options: [
      "نوع من التشفير يستخدم مفتاحاً واحداً",
      "نوع من الفيروسات",
      "برنامج مكافحة الفيروسات",
      "نوع من الشبكات"
    ],
    correct: 0,
    category: "encryption",
    difficulty: "متوسط",
    explanation: "التشفير المتماثل يستخدم مفتاحاً واحداً لتشفير وفك تشفير البيانات.",
    usedIn: [],
  },
  {
    id: 22,
    question: "ما هو التشفير غير المتماثل؟",
    options: [
      "نوع من التشفير يستخدم مفتاحين",
      "نوع من الفيروسات",
      "برنامج مكافحة الفيروسات",
      "نوع من الشبكات"
    ],
    correct: 0,
    category: "encryption",
    difficulty: "متوسط",
    explanation: "التشفير غير المتماثل يستخدم مفتاحين لتشفير وفك تشفير البيانات.",
    usedIn: [],
  },
  {
    id: 23,
    question: "ما هو هجوم الوسيط (Man-in-the-Middle)؟",
    options: [
      "هجوم يتم فيه اعتراض الاتصال",
      "نوع من الفيروسات",
      "برنامج مكافحة الفيروسات",
      "نوع من الشبكات"
    ],
    correct: 0,
    category: "attacks",
    difficulty: "متوسط",
    explanation: "هجوم الوسيط يتم فيه اعتراض الاتصال بين الجهازين أو الشبكات.",
    usedIn: [],
  },
  {
    id: 24,
    question: "ما هو هجوم القوة الغاشمة (Brute Force)؟",
    options: [
      "محاولة تخمين كلمة المرور",
      "نوع من الفيروسات",
      "برنامج مكافحة الفيروسات",
      "نوع من الشبكات"
    ],
    correct: 0,
    category: "attacks",
    difficulty: "متوسط",
    explanation: "هجوم القوة الغاشمة يتم من خلال محاولة تخمين كلمة المرور.",
    usedIn: [],
  },
  {
    id: 25,
    question: "ما هو هجوم حقن SQL؟",
    options: [
      "هجوم على قواعد البيانات",
      "نوع من الفيروسات",
      "برنامج مكافحة الفيروسات",
      "نوع من الشبكات"
    ],
    correct: 0,
    category: "attacks",
    difficulty: "متوسط",
    explanation: "هجوم حقن SQL يتم من خلال إدراج أوامر SQL غير الصالحة في موقع إلكتروني.",
    usedIn: [],
  },
  {
    id: 26,
    question: "ما هو هجوم XSS؟",
    options: [
      "هجوم حقن البرمجيات النصية",
      "نوع من الفيروسات",
      "برنامج مكافحة الفيروسات",
      "نوع من الشبكات"
    ],
    correct: 0,
    category: "attacks",
    difficulty: "متوسط",
    explanation: "هجوم XSS يتم من خلال إدراج JavaScript غير صالح إلى موقع إلكتروني.",
    usedIn: [],
  },
  {
    id: 27,
    question: "ما هو هجوم CSRF؟",
    options: [
      "هجوم تزوير الطلبات",
      "نوع من الفيروسات",
      "برنامج مكافحة الفيروسات",
      "نوع من الشبكات"
    ],
    correct: 0,
    category: "attacks",
    difficulty: "متوسط",
    explanation: "هجوم CSRF يتم من خلال إرسال طلبات خاطئة إلى موقع إلكتروني.",
    usedIn: [],
  },
  {
    id: 28,
    question: "ما هو هجوم DDoS؟",
    options: [
      "هجوم رفض الخدمة الموزع",
      "نوع من الفيروسات",
      "برنامج مكافحة الفيروسات",
      "نوع من الشبكات"
    ],
    correct: 0,
    category: "attacks",
    difficulty: "متوسط",
    explanation: "هجوم DDoS يتم من خلال إرسال عدد كبير من الطلبات إلى موقع إلكتروني.",
    usedIn: [],
  },
  {
    id: 29,
    question: "ما هو هجوم التصيد الاحتيالي المتقدم؟",
    options: [
      "هجوم تصيد احتيالي أكثر تعقيداً",
      "نوع من الفيروسات",
      "برنامج مكافحة الفيروسات",
      "نوع من الشبكات"
    ],
    correct: 0,
    category: "attacks",
    difficulty: "متوسط",
    explanation: "هجوم التصيد الاحتيالي المتقدم يتم من خلال إرسال رسائل احتيالية أو مواقع خاطئة.",
    usedIn: [],
  },
  {
    id: 30,
    question: "ما هو هجوم حقن الأوامر؟",
    options: [
      "هجوم تنفيذ الأوامر عن بعد",
      "نوع من الفيروسات",
      "برنامج مكافحة الفيروسات",
      "نوع من الشبكات"
    ],
    correct: 0,
    category: "attacks",
    difficulty: "متوسط",
    explanation: "هجوم حقن الأوامر يتم من خلال إرسال أوامر غير صالحة إلى موقع إلكتروني.",
    usedIn: [],
  }
]
