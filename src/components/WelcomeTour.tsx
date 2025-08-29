'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { X, ArrowRight, ArrowLeft } from 'lucide-react'

interface TourStep {
  target: string
  title: string
  content: string
  position: 'top' | 'bottom' | 'left' | 'right'
}

const tourSteps: TourStep[] = [
  {
    target: '[data-tour="usage-counter"]',
    title: 'Track Your Usage',
    content: 'Keep an eye on your monthly worksheet limit. Free accounts get 30 worksheets per month.',
    position: 'bottom'
  },
  {
    target: '[data-tour="generate-worksheet"]',
    title: 'Generate Worksheets',
    content: 'Click here to start creating personalized worksheets for your students with AI assistance.',
    position: 'top'
  },
  {
    target: '[data-tour="name-lists"]',
    title: 'Manage Student Names',
    content: 'Add your students\' names to personalize worksheet questions and make them more engaging.',
    position: 'top'
  },
  {
    target: '[data-tour="profile-settings"]',
    title: 'Customize Your Experience',
    content: 'Update your teaching preferences, curriculum settings, and account information here.',
    position: 'top'
  }
]

export default function WelcomeTour({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const updatePosition = useCallback(() => {
    const currentStepData = tourSteps[currentStep]
    if (!currentStepData) return

    const target = document.querySelector(currentStepData.target) as HTMLElement
    if (!target) return

    const rect = target.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    let top = 0
    let left = 0

    switch (currentStepData.position) {
      case 'bottom':
        top = rect.bottom + scrollTop + 10
        left = rect.left + rect.width / 2 - 175 // 350px width / 2
        break
      case 'top':
        top = rect.top + scrollTop - 10
        left = rect.left + rect.width / 2 - 175
        break
      case 'right':
        top = rect.top + scrollTop + rect.height / 2 - 75 // approximate card height / 2
        left = rect.right + 10
        break
      case 'left':
        top = rect.top + scrollTop + rect.height / 2 - 75
        left = rect.left - 360 // card width + 10px margin
        break
    }

    setPosition({ top, left })
  }, [currentStep])

  useEffect(() => {
    // Show tour after a brief delay
    const timer = setTimeout(() => {
      setIsVisible(true)
      updatePosition()
    }, 1000)

    return () => clearTimeout(timer)
  }, [updatePosition])

  useEffect(() => {
    if (isVisible) {
      updatePosition()
    }
  }, [currentStep, isVisible, updatePosition])

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    setIsVisible(false)
    onComplete()
  }

  const handleSkip = () => {
    setIsVisible(false)
    onComplete()
  }

  if (!isVisible || currentStep >= tourSteps.length) {
    return null
  }

  const currentStepData = tourSteps[currentStep]

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      
      {/* Tour Card */}
      <Card 
        className="fixed z-50 w-80 shadow-xl"
        style={{
          top: position.top,
          left: Math.max(10, Math.min(position.left, window.innerWidth - 330)) // Keep within viewport
        }}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-1">
                {currentStepData.title}
              </h3>
              <p className="text-sm text-slate-600">
                {currentStepData.content}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="ml-2 h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500">
              {currentStep + 1} of {tourSteps.length}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-3 w-3 mr-1" />
                Previous
              </Button>
              
              <Button
                size="sm"
                onClick={handleNext}
              >
                {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                {currentStep < tourSteps.length - 1 && (
                  <ArrowRight className="h-3 w-3 ml-1" />
                )}
              </Button>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="w-full text-xs"
            >
              Skip Tour
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}