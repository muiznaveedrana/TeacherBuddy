'use client'

import { QuestionInput } from './QuestionInput'
import type { StructuredQuestion as StructuredQuestionType } from '@/lib/utils/structuredWorksheetParser'

interface StructuredQuestionProps {
  question: StructuredQuestionType
  answers: Record<string, string>
  onAnswerChange: (subId: string, value: string) => void
  submitted: boolean
  isCorrect?: boolean
  feedback?: string
}

/**
 * Renders a structured question with controlled inputs
 *
 * This component injects QuestionInput components at placeholder positions
 * without using dangerouslySetInnerHTML, providing stable, flash-free rendering.
 */
export function StructuredQuestion({
  question,
  answers,
  onAnswerChange,
  submitted,
  isCorrect,
  feedback
}: StructuredQuestionProps) {
  // Parse the HTML and inject inputs at placeholder positions
  const renderQuestionWithInputs = () => {
    // Build input map for quick lookup
    const inputMap = new Map(
      question.inputs.map(field => [field.subId, field])
    )

    // Simple approach: replace placeholder markers in HTML string
    let htmlContent = question.questionHTML

    // Replace each placeholder with a unique marker
    question.inputs.forEach(field => {
      const placeholderRegex = new RegExp(`<[^>]*data-input-placeholder="${field.subId}"[^>]*></[^>]*>`, 'g')
      htmlContent = htmlContent.replace(placeholderRegex, `___INPUT_PLACEHOLDER_${field.subId}___`)
    })

    // Split by placeholders
    const parts = htmlContent.split(/___INPUT_PLACEHOLDER_([^_]+)___/)

    return (
      <>
        {parts.map((part, idx) => {
          // Even indices are HTML content, odd indices are input IDs
          if (idx % 2 === 0) {
            // HTML content
            return part ? (
              <span key={`html-${idx}`} dangerouslySetInnerHTML={{ __html: part }} />
            ) : null
          } else {
            // Input placeholder
            const field = inputMap.get(part)
            if (field) {
              return (
                <QuestionInput
                  key={`input-${part}`}
                  field={field}
                  value={answers[field.subId] || ''}
                  onChange={onAnswerChange}
                  disabled={submitted}
                  isCorrect={isCorrect}
                  showFeedback={submitted}
                />
              )
            }
            return null
          }
        })}

        {/* If no placeholders were found, render inputs at end */}
        {!htmlContent.includes('___INPUT_PLACEHOLDER_') && question.inputs.length > 0 && (
          <div style={{ marginTop: '15px' }}>
            {question.inputs.map((field) => (
              <QuestionInput
                key={field.subId}
                field={field}
                value={answers[field.subId] || ''}
                onChange={onAnswerChange}
                disabled={submitted}
                isCorrect={isCorrect}
                showFeedback={submitted}
              />
            ))}
          </div>
        )}
      </>
    )
  }

  return (
    <div>
      {renderQuestionWithInputs()}

      {/* Feedback after submission */}
      {submitted && feedback && (
        <div
          className={`mt-3 p-3 rounded-lg font-semibold ${
            isCorrect
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {feedback}
        </div>
      )}
    </div>
  )
}
