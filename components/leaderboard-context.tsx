"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface ScoreEntry {
  id: string
  playerName: string
  game: "quiz" | "matching" | "flappy-tech" | "cyber-security" | "ui-design"
  score: number
  maxScore: number
  percentage: number
  timestamp: Date
  details?: {
    timeBonus?: number
    accuracy?: number
    attempts?: number
    difficulty?: string
    hintsUsed?: number
    questionsAnswered?: number
    totalQuestions?: number
    elementsPlaced?: number
    styleChanges?: number
  }
}

interface LeaderboardContextType {
  scores: ScoreEntry[]
  addScore: (score: Omit<ScoreEntry, "id" | "timestamp">) => void
  getTopScores: (game?: "quiz" | "matching" | "flappy-tech" | "cyber-security" | "ui-design", limit?: number) => ScoreEntry[]
  getPlayerStats: (playerName: string) => {
    totalGames: number
    averageScore: number
    bestGame: ScoreEntry | null
    gamesPlayed: { quiz: number; matching: number; "flappy-tech": number; "cyber-security": number; "ui-design": number }
  }
  clearAllScores: () => void
  deleteScore: (id: string) => void
  editPlayerName: (id: string, newName: string) => void
  getAllPlayers: () => string[]
}

const LeaderboardContext = createContext<LeaderboardContextType | undefined>(undefined)

export function LeaderboardProvider({ children }: { children: ReactNode }) {
  const [scores, setScores] = useState<ScoreEntry[]>([])

  // Load scores from localStorage on mount
  useEffect(() => {
    const savedScores = localStorage.getItem("techGameScoresArabic")
    if (savedScores) {
      try {
        const parsedScores = JSON.parse(savedScores).map((score: any) => ({
          ...score,
          timestamp: new Date(score.timestamp),
        }))
        setScores(parsedScores)
      } catch (error) {
        console.error("Error loading scores:", error)
      }
    }
  }, [])

  // Save scores to localStorage whenever scores change
  useEffect(() => {
    localStorage.setItem("techGameScoresArabic", JSON.stringify(scores))
  }, [scores])

  const addScore = (newScore: Omit<ScoreEntry, "id" | "timestamp">) => {
    const scoreEntry: ScoreEntry = {
      ...newScore,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    }
    setScores((prev) => [...prev, scoreEntry].sort((a, b) => b.percentage - a.percentage))
  }

  const getTopScores = (game?: "quiz" | "matching" | "flappy-tech" | "cyber-security" | "ui-design", limit = 10) => {
    let filteredScores = scores
    if (game) {
      filteredScores = scores.filter((score) => score.game === game)
    }
    return filteredScores.slice(0, limit)
  }

  const getPlayerStats = (playerName: string) => {
    const playerScores = scores.filter((score) => score.playerName.toLowerCase() === playerName.toLowerCase())

    const gamesPlayed = {
      quiz: playerScores.filter((s) => s.game === "quiz").length,
      matching: playerScores.filter((s) => s.game === "matching").length,
      "flappy-tech": playerScores.filter((s) => s.game === "flappy-tech").length,
      "cyber-security": playerScores.filter((s) => s.game === "cyber-security").length,
      "ui-design": playerScores.filter((s) => s.game === "ui-design").length
    }

    const totalGames = playerScores.length
    const averageScore =
      totalGames > 0 ? playerScores.reduce((sum, score) => sum + score.percentage, 0) / totalGames : 0
    const bestGame =
      playerScores.length > 0
        ? playerScores.reduce((best, current) => (current.percentage > best.percentage ? current : best))
        : null

    return {
      totalGames,
      averageScore,
      bestGame,
      gamesPlayed,
    }
  }

  const clearAllScores = () => {
    setScores([])
    localStorage.removeItem("techGameScoresArabic")
  }

  const deleteScore = (id: string) => {
    setScores(prev => prev.filter(score => score.id !== id))
  }

  const editPlayerName = (id: string, newName: string) => {
    if (!newName.trim()) return
    
    setScores(prev => prev.map(score => 
      score.id === id ? { ...score, playerName: newName.trim() } : score
    ))
  }

  const getAllPlayers = () => {
    const uniquePlayers = new Set(scores.map(score => score.playerName))
    return Array.from(uniquePlayers)
  }

  return (
    <LeaderboardContext.Provider value={{ 
      scores, 
      addScore, 
      getTopScores, 
      getPlayerStats, 
      clearAllScores, 
      deleteScore, 
      editPlayerName, 
      getAllPlayers 
    }}>
      {children}
    </LeaderboardContext.Provider>
  )
}

export function useLeaderboard() {
  const context = useContext(LeaderboardContext)
  if (context === undefined) {
    throw new Error("useLeaderboard must be used within a LeaderboardProvider")
  }
  return context
}
