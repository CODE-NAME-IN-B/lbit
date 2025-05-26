"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Trophy, Star, Target, Zap, Cpu } from "lucide-react"
import { useLeaderboard } from "./leaderboard-context"
import { Question, getUnusedQuestions, saveQuestionUsageState, loadQuestionUsageState } from "@/data/questions-repository"

// Game-specific identifier for tracking question usage
const GAME_ID = "flappy-tech-game";

// Number of questions to fetch for this game
const QUESTIONS_TO_FETCH = 30;

interface FlappyTechGameProps {
  onBack: () => void;
  playerName: string;
}

export default function FlappyTechGame({ onBack, playerName }: FlappyTechGameProps) {
  // Game state
  const [gameState, setGameState] = useState<"menu" | "playing" | "question" | "gameOver">("menu");
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  
  // Bird physics
  const [birdY, setBirdY] = useState(250);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [gravity, setGravity] = useState(0.5);
  const [jumpStrength, setJumpStrength] = useState(-10);
  
  // Game elements
  const [pipes, setPipes] = useState<{ x: number; y: number; passed: boolean }[]>([]);
  const [gameSpeed, setGameSpeed] = useState(3);
  const [gameTime, setGameTime] = useState(0);
  
  // Canvas reference
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  
  // Leaderboard integration
  const { addScore } = useLeaderboard();
  
  // Load questions from repository
  useEffect(() => {
    // Load question usage state from localStorage
    loadQuestionUsageState();
    
    // Get unused questions for this specific game
    let unusedQuestions = getUnusedQuestions(GAME_ID, QUESTIONS_TO_FETCH);
    
    // If there aren't enough unused questions, get more from the pool
    // This is a fallback to ensure the game always has questions
    if (unusedQuestions.length < 5) {
      // In a real implementation, we might want to reset usage state for some questions
      // For now, we'll just use any available questions
      unusedQuestions = getUnusedQuestions(GAME_ID, QUESTIONS_TO_FETCH, undefined, undefined, true);
    }
    
    // Save the updated usage state
    saveQuestionUsageState();
    
    // Shuffle questions and ensure we have at least some questions
    setQuestions(shuffleArray(unusedQuestions.length > 0 ? [...unusedQuestions] : []));
  }, []);
  
  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: Question[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  // Add key event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        if (gameState === "menu") {
          startGame();
        } else if (gameState === "playing") {
          jump();
        }
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameState]);
  
  // Game loop
  useEffect(() => {
    if (gameState === "playing") {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      
      const gameLoop = () => {
        // Update bird position
        setBirdY((prev) => prev + birdVelocity);
        setBirdVelocity((prev) => prev + gravity);
        
        // Update pipes
        setPipes((prevPipes) =>
          prevPipes.map((pipe) => ({
            ...pipe,
            x: pipe.x - gameSpeed,
            passed: pipe.passed || (pipe.x < 100 && !pipe.passed),
          })).filter((pipe) => pipe.x > -100)
        );
        
        // Add new pipes
        if (gameTime % 120 === 0) {
          const gap = 250; // زيادة المساحة بين الأنابيب من 200 إلى 250
          const minHeight = 30; // تقليل الحد الأدنى للارتفاع لجعل اللعبة أسهل
          const maxHeight = 250; // تقليل الحد الأقصى للارتفاع للمساعدة في اللعب
          const randomY = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
          
          setPipes((prevPipes) => [
            ...prevPipes,
            { x: 800, y: randomY, passed: false },
          ]);
        }
        
        // Check collisions
        const birdRect = { x: 150, y: birdY, width: 40, height: 30 };
        const collision = pipes.some((pipe) => {
          const topPipeRect = { x: pipe.x, y: 0, width: 80, height: pipe.y };
          const bottomPipeRect = { x: pipe.x, y: pipe.y + 250, width: 80, height: 500 }; // تعديل المسافة من 150 إلى 250 لتتوافق مع متغير gap
          
          return (
            rectIntersect(birdRect, topPipeRect) ||
            rectIntersect(birdRect, bottomPipeRect)
          );
        });
        
        // Check boundaries
        const outOfBounds = birdY < 0 || birdY > 500;
        
        // Check score
        const newPassedPipes = pipes.filter((pipe) => pipe.x < 100 && !pipe.passed);
        if (newPassedPipes.length > 0) {
          setScore((prev) => prev + 1);
          // عرض سؤال بعد عبور كل أنبوب
          if (questions.length > 0) {
            pauseGame();
            showQuestion();
          }
        }
        
        // Game over conditions
        if (collision || outOfBounds) {
          gameOver();
        }
        
        // Increment game time
        setGameTime((prev) => prev + 1);
        
        // Draw game
        drawGame(ctx);
        
        gameLoopRef.current = requestAnimationFrame(gameLoop);
      };
      
      gameLoopRef.current = requestAnimationFrame(gameLoop);
      
      return () => {
        if (gameLoopRef.current) {
          cancelAnimationFrame(gameLoopRef.current);
        }
      };
    }
  }, [gameState, birdY, birdVelocity, pipes, gameTime, score, questions]);
  
  // Check rectangle intersection
  const rectIntersect = (
    rect1: { x: number; y: number; width: number; height: number },
    rect2: { x: number; y: number; width: number; height: number }
  ) => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  };
  
  // Draw game elements
  const drawGame = (ctx: CanvasRenderingContext2D) => {
    // Clear canvas
    ctx.clearRect(0, 0, 800, 500);
    
    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, "#0f172a");
    gradient.addColorStop(1, "#1e293b");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 500);
    
    // Draw pipes
    pipes.forEach((pipe) => {
      // Top pipe
      ctx.fillStyle = "#059669";
      ctx.fillRect(pipe.x, 0, 80, pipe.y);
      
      // Bottom pipe
      ctx.fillRect(pipe.x, pipe.y + 250, 80, 500 - pipe.y - 250); // تعديل المسافة من 150 إلى 250
      
      // Pipe caps
      ctx.fillStyle = "#10b981";
      ctx.fillRect(pipe.x - 5, pipe.y - 20, 90, 20);
      ctx.fillRect(pipe.x - 5, pipe.y + 250, 90, 20); // تعديل المسافة من 150 إلى 250
    });
    
    // Draw bird
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.ellipse(150, birdY, 20, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw wing
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.ellipse(
      140,
      birdY + 5,
      10,
      8,
      Math.sin(gameTime * 0.2) * 0.5,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // Draw eye
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(160, birdY - 5, 5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(162, birdY - 5, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw beak
    ctx.fillStyle = "#f97316";
    ctx.beginPath();
    ctx.moveTo(170, birdY);
    ctx.lineTo(175, birdY - 5);
    ctx.lineTo(175, birdY + 5);
    ctx.closePath();
    ctx.fill();
    
    // Draw score
    ctx.fillStyle = "white";
    ctx.font = "bold 24px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${score}`, 400, 50);
  };
  
  // Game control functions
  const startGame = () => {
    setGameState("playing");
    setBirdY(250);
    setBirdVelocity(0);
    setPipes([]);
    setScore(0);
    setGameTime(0);
  };
  
  const pauseGame = () => {
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
  };
  
  const jump = () => {
    setBirdVelocity(jumpStrength);
  };
  
  const gameOver = () => {
    setGameState("gameOver");
    
    // Add score to leaderboard
    addScore({
      playerName,
      game: "flappy-tech",
      score,
      maxScore: 10,
      percentage: Math.min(100, Math.round((score / 10) * 100))
    });
  };
  
  const resetGame = () => {
    setGameState("menu");
    setScore(0);
    setBirdY(250);
    setBirdVelocity(0);
    setPipes([]);
    
    // Get fresh set of unused questions
    loadQuestionUsageState();
    const unusedQuestions = getUnusedQuestions(GAME_ID, QUESTIONS_TO_FETCH);
    saveQuestionUsageState();
    setQuestions(shuffleArray([...unusedQuestions]));
  };
  
  // Question handling
  const showQuestion = () => {
    if (questions.length > 0) {
      // Get the next question and remove it from the array
      const nextQuestion = questions[0];
      setCurrentQuestion(nextQuestion);
      setQuestions((prev) => prev.slice(1));
      setGameState("question");
    }
  };
  
  const handleQuestionAnswer = (selectedIndex: number) => {
    if (currentQuestion) {
      if (selectedIndex === currentQuestion.correct) {
        // Correct answer - continue game
        setGameState("playing");
        setCurrentQuestion(null);
        
        // Resume game loop
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          drawGame(ctx);
        }
      } else {
        // Wrong answer - game over
        gameOver();
      }
    }
  };
  
  // Function to get rank message based on score
  const getRankMessage = () => {
    if (score >= 8)
      return { 
        message: "طيران مذهل! خبير الكود الطائر!", 
        icon: <Star className="w-8 h-8 text-yellow-400" />, 
        color: "from-yellow-500 to-amber-500" 
      };
    if (score >= 5)
      return { 
        message: "مهارات طيران رائعة! مبرمج ماهر!", 
        icon: <Trophy className="w-8 h-8 text-yellow-400" />, 
        color: "from-yellow-500 to-orange-500" 
      };
    if (score >= 2)
      return { 
        message: "بداية جيدة! استمر في التدريب!", 
        icon: <Target className="w-8 h-8 text-green-400" />, 
        color: "from-green-500 to-blue-500" 
      };
    return { 
      message: "لا تستسلم! كل خبير بدأ من هنا!", 
      icon: <Zap className="w-8 h-8 text-blue-400" />, 
      color: "from-blue-500 to-purple-500" 
    };
  };
  
  // JSX rendering
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-indigo-950 to-slate-900 p-4">
      <div className="w-full max-w-4xl">
        <Card className="border-2 border-cyan-500/20 bg-black/40 backdrop-blur-sm shadow-xl shadow-cyan-500/10">
          <CardHeader className="border-b border-white/10 bg-black/30">
            <CardTitle className="text-center text-2xl font-bold text-white">
              <div className="flex items-center justify-center gap-2">
                <Cpu className="text-cyan-400 h-6 w-6" />
                لعبة الطائر التقني
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {gameState === "menu" && (
              <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
                <div className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                  طائر التكنولوجيا
                </div>
                <p className="text-gray-300 max-w-md">
                  اختبر معرفتك التقنية أثناء الطيران! اضغط على المسافة للقفز وتجنب العوائق.
                  ستواجه أسئلة تقنية كل 3 نقاط!
                </p>
                <div className="mt-4">
                  <Button
                    onClick={startGame}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-cyan-500/20 transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <Play className="w-5 h-5" />
                      ابدأ اللعب
                    </div>
                  </Button>
                </div>
                <div className="mt-4">
                  <Button
                    onClick={onBack}
                    className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white px-6 py-2 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <ArrowRight className="w-5 h-5 ml-2" />
                    العودة للقائمة
                  </Button>
                </div>
              </div>
            )}
            
            {(gameState === "playing" || gameState === "question" || gameState === "gameOver") && (
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={500}
                  onClick={gameState === "playing" ? jump : undefined}
                  className="w-full h-auto cursor-pointer rounded-md"
                />
                
                {gameState === "gameOver" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-lg">
                    <div className="text-center space-y-4 p-6 bg-gradient-to-b from-black/80 to-black/40 rounded-xl border border-white/10 max-w-md">
                      <h3 className="text-2xl font-bold text-red-500">انتهت اللعبة!</h3>
                      <div className={`text-xl font-bold py-2 px-4 rounded-lg bg-gradient-to-r ${getRankMessage().color}`}>
                        {getRankMessage().icon}
                        <p className="text-white">{getRankMessage().message}</p>
                      </div>
                      <div className="text-xl text-yellow-300 font-bold">
                        <Star className="w-6 h-6 text-yellow-400 inline-block ml-2" />
                        {score} نقطة
                      </div>
                      <div className="flex justify-center gap-4 pt-2">
                        <Button
                          onClick={resetGame}
                          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-orange-700/20 transform hover:scale-105 transition-all duration-300"
                        >
                          <div className="flex items-center gap-2">
                            <Play className="w-5 h-5" />
                            إعادة المحاولة
                          </div>
                        </Button>
                        <Button
                          onClick={onBack}
                          className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white px-6 py-2 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                          <ArrowRight className="w-5 h-5 ml-2" />
                          القائمة
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {gameState === "question" && currentQuestion && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-lg">
                    <div className="text-center space-y-4 p-6 bg-gradient-to-b from-black/80 to-black/40 rounded-xl border border-white/10 max-w-md">
                      <h3 className="text-xl font-bold text-cyan-300">سؤال تقني</h3>
                      <p className="text-white font-medium">{currentQuestion.question}</p>
                      <div className="grid grid-cols-1 gap-2 pt-2">
                        {currentQuestion.options.map((option, index) => (
                          <Button
                            key={index}
                            onClick={() => handleQuestionAnswer(index)}
                            className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-cyan-700 hover:to-cyan-900 text-white px-4 py-3 rounded-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-200 text-right"
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="bg-cyan-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                                {index + 1}
                              </div>
                              <span>{option}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {(gameState === "playing" || gameState === "question" || gameState === "gameOver") && (
              <div className="bg-gradient-to-r from-black/30 to-black/10 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                <div className="text-sm text-gray-300 flex items-center justify-center gap-2">
                  <span className="text-orange-300 font-bold">•</span>
                  اضغط على اللوحة أو مفتاح المسافة للقفز
                  <span className="text-orange-300 font-bold">•</span>
                  أجب على الأسئلة للمرور عبر العوائق
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
