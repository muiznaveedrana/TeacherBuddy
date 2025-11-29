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
  // Special rendering for matching questions
  const renderMatchingQuestion = () => {
    // Parse matching rows from HTML
    const matchingRows: Array<{ number: string; isGiven: boolean; givenAnswer?: string; inputIdx: number }> = []

    // Simple approach: find each matching-row and extract info
    // Split HTML by matching-row class to get each row
    const html = question.questionHTML

    // Find all match-num elements
    const numMatches = [...html.matchAll(/<div[^>]*class="[^"]*match-num[^"]*"[^>]*>(\d+)<\/div>/gi)]

    let inputIdx = 0
    for (const numMatch of numMatches) {
      const number = numMatch[1]
      const matchStart = numMatch.index || 0

      // Find the matching-row that contains this number (look backwards)
      const beforeNum = html.substring(Math.max(0, matchStart - 100), matchStart)
      const rowStart = beforeNum.lastIndexOf('matching-row')

      // Look for the end of this row (next matching-row or end of matching section)
      const afterNum = html.substring(matchStart)
      const nextRowIdx = afterNum.indexOf('matching-row', 50) // Skip the current match
      const rowEnd = nextRowIdx > 0 ? matchStart + nextRowIdx : matchStart + 200

      // Get the content of this row
      const rowContent = html.substring(matchStart, rowEnd)

      // Check if it's a given answer (has match-word) or needs input (has match-answer)
      const givenMatch = rowContent.match(/match-word[^>]*>([^<]+)</i)
      const needsInput = rowContent.includes('match-answer')

      if (givenMatch) {
        matchingRows.push({ number, isGiven: true, givenAnswer: givenMatch[1].trim(), inputIdx: -1 })
      } else if (needsInput) {
        matchingRows.push({ number, isGiven: false, inputIdx })
        inputIdx++
      }
    }

    // If we found matching rows, render them with inline inputs
    if (matchingRows.length > 0) {
      // Extract just the question text
      const questionText = question.questionHTML.match(/<span[^>]*class="[^"]*question-text[^"]*"[^>]*>([^<]+)<\/span>/i)
      const questionNum = question.questionHTML.match(/<span[^>]*class="[^"]*question-number[^"]*"[^>]*>([^<]+)<\/span>/i)

      return (
        <div>
          <span className="font-bold text-lg">{questionNum ? questionNum[1] : `${question.id}.`}</span>{' '}
          <span className="text-lg">{questionText ? questionText[1] : 'Match each number to its word.'}</span>

          <div style={{ maxWidth: '320px', margin: '15px auto' }}>
            {matchingRows.map((row, idx) => (
              <div key={idx} className="flex items-center justify-center gap-3 my-3">
                <div className="w-12 h-12 flex items-center justify-center border-2 border-gray-400 rounded-lg font-bold text-xl bg-white">
                  {row.number}
                </div>
                <span className="text-xl">→</span>
                {row.isGiven ? (
                  <div className="min-w-[100px] px-4 py-2 border-2 border-green-500 rounded-lg bg-green-100 font-medium">
                    {row.givenAnswer}
                  </div>
                ) : (
                  <QuestionInput
                    field={question.inputs[row.inputIdx] || { subId: `${question.id}-${row.inputIdx}`, placeholder: 'Type word', inputType: 'text', style: { width: '120px', borderStyle: 'solid' } }}
                    value={answers[question.inputs[row.inputIdx]?.subId || ''] || ''}
                    onChange={onAnswerChange}
                    disabled={submitted}
                    isCorrect={isCorrect}
                    showFeedback={submitted}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }

    return null
  }

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
      // Use non-greedy match (*?) to find placeholder spans correctly
      const placeholderRegex = new RegExp(`<span[^>]*?data-input-placeholder="${field.subId}"[^>]*?>\\s*</span>`, 'gi')
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

  // Try matching question first, fall back to general rendering
  const matchingContent = question.questionType === 'matching' ? renderMatchingQuestion() : null

  return (
    <div>
      {matchingContent || renderQuestionWithInputs()}

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
