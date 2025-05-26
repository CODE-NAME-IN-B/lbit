"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, Cpu } from "lucide-react"

interface PlayerNameModalProps {
  isOpen: boolean
  onSubmit: (name: string) => void
  title: string
  description: string
}

export default function PlayerNameModal({ isOpen, onSubmit, title, description }: PlayerNameModalProps) {
  const [playerName, setPlayerName] = useState("")

  if (!isOpen) return null

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-4 flex items-center justify-center relative overflow-hidden"
      dir="rtl"
    >
      {/* Animated background elements with Saudi colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-green-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-10 animate-pulse animation-delay-3000"></div>
      </div>

      <Card className="w-full max-w-md backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <GraduationCap className="w-16 h-16 text-green-400" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <Cpu className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl text-high-contrast game-title mb-2">{title}</CardTitle>
          <div className="text-green-300 font-medium mb-4 saudi-text-shadow">احتفال المملكة بالتقنية والمعرفة</div>
          <CardDescription className="text-medium-contrast">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={e => {
              e.preventDefault();
              onSubmit(playerName);
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="playerName" className="text-white">
                اسم الطالب
              </Label>
              <Input
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="أدخل اسمك هنا..."
                maxLength={20}
                autoFocus
                required
                className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400"
              />
            </div>
            <Button
              type="submit"
              className="w-full saudi-gradient hover:brightness-110 text-white font-bold shadow-lg transition-all duration-300"
            >
              ابدأ رحلة التعلم
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
