'use client'

import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface CelebrationOverlayProps {
  score: number // percentage (0-100)
  correct: number
  total: number
  onClose?: () => void
}

export function CelebrationOverlay({ score, correct, total, onClose }: CelebrationOverlayProps) {
  const { width, height } = useWindowSize()
  const [message, setMessage] = useState('')
  const [emoji, setEmoji] = useState('')
  const [color, setColor] = useState('')

  useEffect(() => {
    if (score >= 90) {
      setMessage('Excellent! You\'re a superstar!')
      setEmoji('🌟')
      setColor('text-yellow-500')
    } else if (score >= 75) {
      setMessage('Great job! Well done!')
      setEmoji('🎉')
      setColor('text-blue-500')
    } else if (score >= 60) {
      setMessage('Good effort! Keep practicing!')
      setEmoji('👍')
      setColor('text-green-500')
    } else {
      setMessage('Keep trying! You can do it!')
      setEmoji('💪')
      setColor('text-orange-500')
    }
  }, [score])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Confetti Animation */}
      {score >= 60 && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={score >= 90 ? 500 : score >= 75 ? 300 : 200}
          gravity={0.3}
          colors={score >= 90 ? ['#FFD700', '#FFA500', '#FF6347'] : ['#4169E1', '#32CD32', '#FF69B4']}
        />
      )}

      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
      )}

      {/* Score Card */}
      <div className="bg-white rounded-3xl p-12 shadow-2xl text-center animate-bounce-in max-w-md relative">
        <div className={`text-8xl mb-6 ${color}`}>{emoji}</div>

        <h2 className="text-4xl font-bold mb-4 text-gray-800">{message}</h2>

        <div className={`text-7xl font-bold mb-4 ${color}`}>
          {score}%
        </div>

        <p className="text-2xl text-gray-600 mb-6">
          You got <span className="font-bold text-green-600">{correct}</span> out of{' '}
          <span className="font-bold text-gray-800">{total}</span> correct!
        </p>

        {score < 60 && (
          <p className="text-lg text-gray-500 italic">
            Don't worry! Practice makes perfect! 💫
          </p>
        )}

        {score >= 90 && (
          <p className="text-lg text-yellow-600 font-semibold">
            Outstanding performance! ⭐
          </p>
        )}
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </div>
  )
}
