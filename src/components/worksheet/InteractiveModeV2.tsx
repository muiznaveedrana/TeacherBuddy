'use client'

import { useState, useEffect } from 'react'
import { parseWorksheetStructured } from '@/lib/utils/structuredWorksheetParser'
import { calculateScoreStructured } from '@/lib/utils/answerValidator'
import { Button } from '@/components/ui/button'
import { CelebrationOverlay } from './CelebrationOverlay'
import { FullscreenController } from './FullscreenController'
import { ScoreTracker } from './ScoreTracker'
import { StructuredQuestion } from './StructuredQuestion'
import type { LibraryWorksheet } from '@/lib/types/library'

interface InteractiveModeV2Props {
  htmlContent: string
  worksheet: LibraryWorksheet
  onExit: () => void
}

/**
 * InteractiveModeV2 - Fully controlled component version
 *
 * This version uses controlled React components instead of dangerouslySetInnerHTML
 * manipulation, providing:
 * - Zero flashing when clicking inputs
 * - Perfect focus management
 * - Stable, predictable behavior for children
 * - No manual event listeners or DOM manipulation
 */
export function InteractiveModeV2({ htmlContent, worksheet, onExit }: InteractiveModeV2Props) {
  const [parsed, setParsed] = useState<ReturnType<typeof parseWorksheetStructured> | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({}) // Key: subId like "1", "4-0", "4-1"
  const [submitted, setSubmitted] = useState(false)
  const [scoreResult, setScoreResult] = useState<any>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    const result = parseWorksheetStructured(htmlContent)
    setParsed(result)
    console.log('📋 Parsed structured worksheet:', result)
  }, [htmlContent])

  // Handle answer change - fully controlled
  const handleAnswerChange = (subId: string, value: string) => {
    console.log(`✍️ Answer changed for ${subId}:`, value)
    setAnswers(prev => ({
      ...prev,
      [subId]: value
    }))
  }

  // Check if all questions are answered
  const areAllQuestionsAnswered = () => {
    if (!parsed) return false

    return parsed.questions.every(q => {
      // Check if all inputs for this question have non-empty answers
      return q.inputs.every(input => {
        const answer = answers[input.subId]
        return answer && answer.trim().length > 0
      })
    })
  }

  // Count total answered questions
  const countAnsweredQuestions = () => {
    if (!parsed) return 0

    return parsed.questions.filter(q => {
      // Question is answered if ANY of its inputs has a value
      return q.inputs.some(input => {
        const answer = answers[input.subId]
        return answer && answer.trim().length > 0
      })
    }).length
  }

  const handleSubmit = () => {
    if (!parsed) return

    console.log('🔴 handleSubmit called')
    console.log('🔴 Questions:', parsed.questions.map(q => ({
      id: q.id,
      hasHTML: !!q.questionHTML,
      htmlLength: q.questionHTML?.length || 0
    })))

    const result = calculateScoreStructured(answers, parsed.questions)
    setScoreResult(result)
    setSubmitted(true)
    setShowCelebration(true)

    console.log('📊 Score result:', result)

    // Auto-hide celebration after 5 seconds
    setTimeout(() => setShowCelebration(false), 5000)
  }

  const handleTryAgain = () => {
    setAnswers({})
    setSubmitted(false)
    setScoreResult(null)
    setShowCelebration(false)
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

      {/* Score Tracker */}
      {!submitted && (
        <ScoreTracker
          current={countAnsweredQuestions()}
          total={parsed.questions.length}
          showPercentage={true}
        />
      )}

      {/* Questions */}
      <div className="questions-container max-w-4xl mx-auto p-6">
        {parsed.questions.map((q, index) => {
          // Check if question has any answers
          const isAnswered = q.inputs.some(input => {
            const answer = answers[input.subId]
            return answer && answer.trim().length > 0
          })

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

              <StructuredQuestion
                question={q}
                answers={answers}
                onAnswerChange={handleAnswerChange}
                submitted={submitted}
                isCorrect={scoreResult?.details[index]?.isCorrect}
                feedback={scoreResult?.details[index]?.feedback}
              />
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
              disabled={!areAllQuestionsAnswered()}
            >
              {areAllQuestionsAnswered()
                ? 'Submit Answers 📝'
                : `Answer all questions (${parsed.questions.length - countAnsweredQuestions()} remaining)`
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
