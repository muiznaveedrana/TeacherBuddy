'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Brain, CheckCircle } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'

interface WorksheetGenerationLoaderProps {
  className?: string
  onComplete?: () => void
  estimatedTimeMs?: number
}

const generationSteps = [
  { id: 'analyzing', label: 'Analyzing curriculum requirements', icon: BookOpen, duration: 1500 },
  { id: 'generating', label: 'Creating worksheet content', icon: Brain, duration: 3000 },
  { id: 'formatting', label: 'Formatting and finalizing', icon: CheckCircle, duration: 1500 }
]

export function WorksheetGenerationLoader({
  className = "",
  onComplete,
  estimatedTimeMs = 6000
}: WorksheetGenerationLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  useEffect(() => {
    const totalDuration = generationSteps.reduce((sum, step) => sum + step.duration, 0)
    let elapsed = 0
    
    const interval = setInterval(() => {
      elapsed += 100
      
      // Calculate progress percentage
      const progressPercentage = Math.min((elapsed / totalDuration) * 100, 100)
      setProgress(progressPercentage)
      
      // Update current step
      let cumulativeDuration = 0
      let newCurrentStep = 0
      const newCompletedSteps: string[] = []
      
      for (let i = 0; i < generationSteps.length; i++) {
        cumulativeDuration += generationSteps[i].duration
        if (elapsed >= cumulativeDuration) {
          newCompletedSteps.push(generationSteps[i].id)
          newCurrentStep = Math.min(i + 1, generationSteps.length - 1)
        } else if (elapsed > cumulativeDuration - generationSteps[i].duration) {
          newCurrentStep = i
          break
        }
      }
      
      setCurrentStep(newCurrentStep)
      setCompletedSteps(newCompletedSteps)
      
      // Complete when finished
      if (elapsed >= totalDuration) {
        clearInterval(interval)
        setProgress(100)
        setTimeout(() => {
          onComplete?.()
        }, 500)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <Card className={`w-full max-w-md mx-auto ${className}`}>
      <CardContent className="pt-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-3 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6 text-blue-600 animate-pulse" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Generating Your Worksheet
          </h3>
          <p className="text-sm text-gray-600">
            This usually takes about {Math.round(estimatedTimeMs / 1000)} seconds
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="w-full h-2" />
        </div>

        {/* Generation Steps */}
        <div className="space-y-3">
          {generationSteps.map((step, index) => {
            const Icon = step.icon
            const isCompleted = completedSteps.includes(step.id)
            const isCurrent = index === currentStep && !isCompleted

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                  isCurrent ? 'bg-blue-50 border border-blue-200' : 
                  isCompleted ? 'bg-green-50' : 'bg-gray-50'
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-green-100 text-green-600' :
                  isCurrent ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Icon className={`w-4 h-4 ${isCurrent ? 'animate-pulse' : ''}`} />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    isCompleted ? 'text-green-800' :
                    isCurrent ? 'text-blue-800' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </p>
                </div>
                {isCurrent && (
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Encouragement text */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Creating high-quality, curriculum-aligned content...
          </p>
        </div>
      </CardContent>
    </Card>
  )
}