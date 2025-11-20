'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { parseWorksheet } from '@/lib/utils/worksheetParser'
import { calculateScore } from '@/lib/utils/answerValidator'
import { Button } from '@/components/ui/button'
import { CelebrationOverlay } from './CelebrationOverlay'
import { FullscreenController } from './FullscreenController'
import { ScoreTracker } from './ScoreTracker'
import type { LibraryWorksheet } from '@/lib/types/library'

interface InteractiveModeProps {
  htmlContent: string
  worksheet: LibraryWorksheet
  onExit: () => void
}

export function InteractiveMode({ htmlContent, worksheet, onExit }: InteractiveModeProps) {
  const [parsed, setParsed] = useState<ReturnType<typeof parseWorksheet> | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [scoreResult, setScoreResult] = useState<any>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const answersRef = useRef<Record<string, string>>({}) // Keep answers in ref to avoid re-render issues
  const nextFocusRef = useRef<string | null>(null) // Track which input should receive focus after re-render

  useEffect(() => {
    const result = parseWorksheet(htmlContent)
    setParsed(result)
    console.log('Parsed worksheet:', result)
  }, [htmlContent])

  useEffect(() => {
    if (!parsed) return

    let cleanupFn: (() => void) | null = null

    // Wait for React to render the dangerouslySetInnerHTML content
    const timer = setTimeout(() => {
      // Add event listeners to input fields to capture answers
      const inputs = document.querySelectorAll('.interactive-answer-input')

      console.log(`🎯 Found ${inputs.length} input fields, attaching event listeners...`)

      const handleInput = (e: Event) => {
        const input = e.target as HTMLInputElement | HTMLTextAreaElement
        const questionId = input.dataset.questionId || '0'

        console.log(`✍️ Input changed for question ${questionId}:`, input.value)

        // Update the ref immediately (no re-render, no interruption to typing)
        answersRef.current[questionId] = input.value
      }

      const handleFocus = (e: Event) => {
        const input = e.target as HTMLInputElement | HTMLTextAreaElement
        const questionId = input.dataset.questionId || '0'

        console.log(`👁️ Focus on question ${questionId}`)

        // Track which input has focus
        nextFocusRef.current = questionId
      }

      const handleBlur = (e: Event) => {
        const input = e.target as HTMLInputElement | HTMLTextAreaElement
        const questionId = input.dataset.questionId || '0'

        console.log(`✅ Input completed for question ${questionId}:`, input.value)

        // Defer state update to allow the next input to receive focus first
        // This prevents the re-render from stealing focus from the clicked input
        setTimeout(() => {
          setAnswers({...answersRef.current})
        }, 0) // Defer to next event loop tick
      }

      inputs.forEach(input => {
        input.addEventListener('input', handleInput)
        input.addEventListener('focus', handleFocus)
        input.addEventListener('blur', handleBlur) // Update on blur instead of during typing

        // Restore any existing values from ref (critical after re-renders)
        const htmlInput = input as HTMLInputElement | HTMLTextAreaElement
        const questionId = htmlInput.dataset.questionId || '0'
        const savedValue = answersRef.current[questionId] || ''
        if (htmlInput.value !== savedValue) {
          htmlInput.value = savedValue
          if (savedValue) console.log(`🔄 Restored value for question ${questionId}: "${savedValue}"`)
        }

        // Restore focus to the input that user was trying to click
        if (nextFocusRef.current === questionId) {
          console.log(`🎯 Restoring focus to question ${questionId}`)
          htmlInput.focus()
          nextFocusRef.current = null // Clear after restoring
        }
      })

      // Store cleanup function
      cleanupFn = () => {
        console.log('🧹 Cleaning up event listeners...')
        inputs.forEach(input => {
          input.removeEventListener('input', handleInput)
          input.removeEventListener('focus', handleFocus)
          input.removeEventListener('blur', handleBlur)
        })
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      if (cleanupFn) cleanupFn()
    }
  }, [parsed, answers]) // Re-run when answers change to restore values after re-render

  const handleSubmit = () => {
    if (!parsed) return

    const correctAnswers: Record<number, string> = {}
    parsed.questions.forEach(q => {
      correctAnswers[q.id] = q.correctAnswer
    })

    const result = calculateScore(answers, correctAnswers)
    setScoreResult(result)
    setSubmitted(true)
    setShowCelebration(true)

    console.log('Score result:', result)

    // Auto-hide celebration after 5 seconds
    setTimeout(() => setShowCelebration(false), 5000)
  }

  const handleTryAgain = () => {
    answersRef.current = {} // Clear ref
    setAnswers({})
    setSubmitted(false)
    setScoreResult(null)
    setShowCelebration(false)

    // Clear input fields
    const inputs = document.querySelectorAll('.interactive-answer-input') as NodeListOf<HTMLInputElement>
    inputs.forEach(input => {
      input.value = ''
    })
  }

  if (!parsed) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Loading interactive worksheet...</div>
          <div className="text-gray-600">Preparing your questions...</div>
        </div>
      </div>
    )
  }

  if (!parsed.metadata.hasAnswerKey) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md p-8 bg-yellow-50 border-2 border-yellow-400 rounded-lg">
          <div className="text-4xl mb-4">⚠️</div>
          <div className="text-xl font-bold mb-2">No Answer Key Available</div>
          <div className="text-gray-700 mb-4">
            This worksheet doesn&apos;t have an answer key, so we can&apos;t automatically check your answers.
            You can still practice, but you&apos;ll need to check your own work!
          </div>
          <Button onClick={onExit} variant="outline">
            Back to Worksheet
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="interactive-worksheet-container min-h-screen bg-gray-50">
      {/* Inject original worksheet styles */}
      {parsed?.stylesheet && (
        <style dangerouslySetInnerHTML={{ __html: parsed.stylesheet }} />
      )}

      {/* Fullscreen Controller */}
      <FullscreenController
        isFullscreen={isFullscreen}
        isLocked={isLocked}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        onToggleLock={() => setIsLocked(!isLocked)}
      />

      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b-4 border-blue-500 shadow-md">
        <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-700">{worksheet.title}</h1>
            <p className="text-gray-600">Interactive Mode - Answer all questions below</p>
          </div>
          <Button onClick={onExit} variant="outline" size="sm">
            Exit
          </Button>
        </div>
      </div>

      {/* Score Tracker (replaces old progress indicator) */}
      {!submitted && (
        <ScoreTracker
          current={Object.keys(answers).length}
          total={parsed.questions.length}
          showPercentage={true}
        />
      )}

      {/* Questions */}
      <div className="questions-container max-w-4xl mx-auto p-6" key="questions-wrapper">
        {parsed.questions.map((q, index) => {
          // Check if question has any answers (including sub-answers like "4-0", "4-1")
          const questionPrefix = `${q.id}`
          const isAnswered = Object.keys(answers).some(key =>
            (key === questionPrefix || key.startsWith(questionPrefix + '-')) &&
            answers[key]?.trim().length > 0
          )

          return (
            <div
              key={`q-${q.id}`}
              className={`question-interactive mb-6 p-4 rounded-lg border-2 transition-all relative ${
                submitted
                  ? scoreResult.details[index]?.isCorrect
                    ? 'bg-green-50 border-green-500'
                    : 'bg-red-50 border-red-500'
                  : isAnswered
                    ? 'bg-blue-50 border-blue-400'
                    : 'bg-white border-gray-300'
              }`}
            >
              {/* Visual checkmark for answered questions */}
              {!submitted && isAnswered && (
                <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold">
                  ✓
                </div>
              )}

              <div
                key={`html-${q.id}`}
                dangerouslySetInnerHTML={{ __html: q.questionHTML }}
                suppressHydrationWarning
              />

              {submitted && (
                <div className={`mt-3 p-3 rounded-lg font-semibold ${
                  scoreResult.details[index]?.isCorrect
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {scoreResult.details[index]?.feedback}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Submit/Action Buttons */}
      <div className="sticky bottom-0 bg-white border-t-4 border-blue-500 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-center gap-4">
          {!submitted ? (
            <Button
              onClick={handleSubmit}
              size="lg"
              className="text-xl px-12 py-6 bg-blue-600 hover:bg-blue-700"
              disabled={Object.keys(answers).length < parsed.questions.length}
            >
              {Object.keys(answers).length < parsed.questions.length
                ? `Answer all questions (${parsed.questions.length - Object.keys(answers).length} remaining)`
                : 'Submit Answers 📝'
              }
            </Button>
          ) : (
            <>
              <Button onClick={handleTryAgain} variant="outline" size="lg" className="text-lg px-8 py-4">
                Try Again 🔄
              </Button>
              <Button onClick={onExit} variant="default" size="lg" className="text-lg px-8 py-4">
                Exit Interactive Mode 🚪
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Celebration Overlay */}
      {showCelebration && scoreResult && (
        <CelebrationOverlay
          score={scoreResult.percentage}
          correct={scoreResult.correct}
          total={scoreResult.total}
          onClose={() => setShowCelebration(false)}
        />
      )}
    </div>
  )
}
