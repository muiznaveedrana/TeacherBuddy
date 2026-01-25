'use client'

import { useState, useEffect, useRef } from 'react'
import { parseWorksheetStructured } from '@/lib/utils/structuredWorksheetParser'
import { calculateScoreStructured } from '@/lib/utils/answerValidator'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { CelebrationOverlay } from './CelebrationOverlay'
import { FullscreenController } from './FullscreenController'
import { ScoreTracker } from './ScoreTracker'
import { StructuredQuestion } from './StructuredQuestion'
import type { LibraryWorksheet } from '@/lib/types/library'
import { trackInteractiveStart, trackInteractiveSubmit, trackInteractiveExit } from '@/lib/utils/analytics'

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
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const result = parseWorksheetStructured(htmlContent)
    setParsed(result)
    console.log('📋 Parsed structured worksheet:', result)

    // Track interactive mode start with enhanced parameters
    if (result) {
      trackInteractiveStart({
        id: worksheet.id,
        title: worksheet.title,
        yearGroup: worksheet.year_group,
        questionCount: result.questions.length,
        // Enhanced tracking fields
        topic: worksheet.topic,
        subtopic: worksheet.subtopic,
        difficulty: worksheet.difficulty
      })
    }
  }, [htmlContent, worksheet])

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

  // Count total answered questions (ALL inputs must be filled)
  const countAnsweredQuestions = () => {
    if (!parsed) return 0

    return parsed.questions.filter(q => {
      // Question is answered only if ALL of its inputs have values
      return q.inputs.every(input => {
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

    // Calculate time spent
    const timeSpentSeconds = Math.round((Date.now() - startTimeRef.current) / 1000)

    // Track submission with enhanced parameters
    trackInteractiveSubmit({
      worksheetId: worksheet.id,
      score: result.correct,
      total: result.total,
      percentage: result.percentage,
      timeSpentSeconds,
      // Enhanced tracking fields
      worksheetTitle: worksheet.title,
      yearGroup: worksheet.year_group,
      topic: worksheet.topic,
      subtopic: worksheet.subtopic,
      difficulty: worksheet.difficulty
    })

    console.log('📊 Score result:', result)

    // Auto-hide celebration after 5 seconds
    setTimeout(() => setShowCelebration(false), 5000)
  }

  const handleTryAgain = () => {
    setAnswers({})
    setSubmitted(false)
    setScoreResult(null)
    setShowCelebration(false)
    startTimeRef.current = Date.now() // Reset timer for retry
  }

  // Wrapper for exit that tracks the event with enhanced parameters
  const handleExit = () => {
    if (parsed) {
      trackInteractiveExit({
        id: worksheet.id,
        completed: submitted,
        questionsAnswered: countAnsweredQuestions(),
        totalQuestions: parsed.questions.length,
        // Enhanced tracking fields
        title: worksheet.title,
        yearGroup: worksheet.year_group,
        topic: worksheet.topic,
        subtopic: worksheet.subtopic
      })
    }
    onExit()
  }

  if (!parsed) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
          <div className="text-2xl font-bold text-gray-800">Loading interactive worksheet...</div>
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
          <Button onClick={handleExit} variant="outline">
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

      {/* Header - TABLET OPTIMIZED */}
      <div className="sticky top-0 z-30 bg-white border-b-4 border-blue-500 shadow-md safe-area-top">
        <div className="max-w-4xl mx-auto p-3 sm:p-4 flex justify-between items-center gap-2">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 truncate">{worksheet.title}</h1>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Interactive Mode - Answer all questions below</p>
          </div>
          <Button
            onClick={handleExit}
            variant="outline"
            size="sm"
            className="flex-shrink-0 min-h-[44px] min-w-[44px] touch-target"
          >
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

      {/* Questions - TABLET OPTIMIZED with responsive padding */}
      <div className="questions-container max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        {parsed.questions.map((q, index) => {
          // Check if ALL inputs for this question are filled (not just any)
          const isAnswered = q.inputs.every(input => {
            const answer = answers[input.subId]
            return answer && answer.trim().length > 0
          })

          return (
            <div
              key={`q-${q.id}`}
              className={`question-interactive mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg border-2 transition-all relative ${
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

      {/* Submit/Action Buttons - TABLET OPTIMIZED with safe area */}
      <div className="sticky bottom-0 bg-white border-t-4 border-blue-500 p-3 sm:p-4 shadow-lg safe-area-bottom">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
          {!submitted ? (
            <Button
              onClick={handleSubmit}
              size="lg"
              className="text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 bg-blue-600 hover:bg-blue-700 min-h-[52px] touch-target active:scale-[0.98] transition-transform"
              disabled={!areAllQuestionsAnswered()}
            >
              {areAllQuestionsAnswered()
                ? 'Submit Answers 📝'
                : `Answer all (${parsed.questions.length - countAnsweredQuestions()} left)`
              }
            </Button>
          ) : (
            <>
              <Button
                onClick={handleTryAgain}
                variant="outline"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] touch-target active:scale-[0.98] transition-transform"
              >
                Try Again 🔄
              </Button>
              <Button
                onClick={handleExit}
                variant="default"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] touch-target active:scale-[0.98] transition-transform"
              >
                Exit 🚪
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
