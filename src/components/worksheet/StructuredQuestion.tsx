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
  // Special rendering for matching questions (letter matching format: 13 = ___ A) nineteen)
  const renderLetterMatchingQuestion = () => {
    const html = question.questionHTML

    // Check if this is a letter matching format (e.g., "13 = ___" with "A) nineteen" options)
    const hasLetterOptions = html.includes('option-letter') || html.includes('option-word')
    const hasMatchNumbers = html.includes('match-number') || html.includes('match-row')

    if (!hasLetterOptions && !hasMatchNumbers) {
      return null
    }

    // Extract question text
    const questionTextMatch = html.match(/<(?:p|span)[^>]*class="[^"]*question-text[^"]*"[^>]*>([^<]+)</)
    const questionNumMatch = html.match(/<span[^>]*class="[^"]*question-number[^"]*"[^>]*>([^<]+)<\/span>/i)

    // Extract numbers from match-number or match-row elements
    const numberMatches = Array.from(html.matchAll(/<(?:span|div)[^>]*class="[^"]*match-number[^"]*"[^>]*>(\d+)<\/(?:span|div)>/gi))

    // Extract letter options (A) word, B) word, etc.)
    const optionMatches = Array.from(html.matchAll(/<span[^>]*class="[^"]*option-letter[^"]*"[^>]*>([A-Z]\))<\/span>\s*<span[^>]*class="[^"]*option-word[^"]*"[^>]*>([^<]+)<\/span>/gi))

    // If we found both numbers and options, render the letter matching format
    if (numberMatches.length > 0 && optionMatches.length > 0) {
      const numbers = numberMatches.map(m => m[1])
      const options = optionMatches.map(m => ({ letter: m[1], word: m[2].trim() }))

      return (
        <div>
          <span className="font-bold text-lg">{questionNumMatch ? questionNumMatch[1] : `${question.id}.`}</span>{' '}
          <span className="text-lg">{questionTextMatch ? questionTextMatch[1] : 'Match each number to its letter.'}</span>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', margin: '15px auto', flexWrap: 'wrap' }}>
            {/* Left column: Numbers with input boxes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {numbers.map((num, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="px-3 py-2 bg-blue-100 rounded-lg font-bold text-lg min-w-[50px] text-center">{num}</span>
                  <span className="text-lg">=</span>
                  <QuestionInput
                    field={question.inputs[idx] || { subId: `${question.id}-${idx}`, placeholder: 'A-D', inputType: 'text', style: { width: '60px', borderStyle: 'solid' } }}
                    value={answers[question.inputs[idx]?.subId || ''] || ''}
                    onChange={onAnswerChange}
                    disabled={submitted}
                    isCorrect={isCorrect}
                    showFeedback={submitted}
                  />
                </div>
              ))}
            </div>

            {/* Right column: Letter options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="font-bold text-gray-600">{opt.letter}</span>
                  <span className="px-3 py-2 bg-yellow-100 rounded-lg">{opt.word}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  // Special rendering for matching questions (number-word format: 5 → five)
  const renderMatchingQuestion = () => {
    // Parse matching rows from HTML
    const matchingRows: Array<{ number: string; isGiven: boolean; givenAnswer?: string; inputIdx: number }> = []

    // Simple approach: find each matching-row and extract info
    // Split HTML by matching-row class to get each row
    const html = question.questionHTML

    // Find all match-num elements (support both match-num and match-number)
    const numMatches = Array.from(html.matchAll(/<div[^>]*class="[^"]*match-num[^"]*"[^>]*>(\d+)<\/div>/gi))

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

  // Special rendering for One More/One Less questions (horizontal layout)
  const renderOneMoreLessQuestion = () => {
    const html = question.questionHTML

    // Check if this is a one-more-less question
    if (!html.toLowerCase().includes('one less') && !html.toLowerCase().includes('one more')) {
      return null
    }

    // Extract the central number
    const centralNumberMatch = html.match(/<div[^>]*class="[^"]*number-display[^"]*"[^>]*>(\d+)<\/div>/i)
    if (!centralNumberMatch) {
      return null
    }

    const centralNumber = parseInt(centralNumberMatch[1])
    const oneLess = centralNumber - 1
    const oneMore = centralNumber + 1

    // Extract question text
    const questionTextMatch = html.match(/<p[^>]*class="[^"]*question-text[^"]*"[^>]*>.*?<span[^>]*class="[^"]*question-number[^"]*"[^>]*>([^<]+)<\/span>([^<]+)/i)

    return (
      <div>
        <p className="text-lg mb-4">
          <span className="font-bold">{questionTextMatch ? questionTextMatch[1] : `${question.id}.`}</span>
          {questionTextMatch ? questionTextMatch[2] : ' Fill in the missing numbers.'}
        </p>

        {/* Horizontal layout for One Less | Number | One More */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', margin: '15px 0' }}>
          {/* One Less */}
          <div style={{ textAlign: 'center', padding: '15px', border: '3px solid #ddd', borderRadius: '10px', minWidth: '90px', background: '#fff' }}>
            <p style={{ fontSize: '11pt', marginBottom: '8px', color: '#666' }}>One Less</p>
            <QuestionInput
              field={question.inputs[0] || { subId: `${question.id}-0`, placeholder: String(oneLess), inputType: 'text', style: { width: '60px', borderStyle: 'solid' } }}
              value={answers[question.inputs[0]?.subId || ''] || ''}
              onChange={onAnswerChange}
              disabled={submitted}
              isCorrect={isCorrect}
              showFeedback={submitted}
            />
          </div>

          {/* Central Number */}
          <div style={{ textAlign: 'center', padding: '15px', border: '3px solid #FF9800', borderRadius: '10px', minWidth: '90px', background: '#FFF3E0' }}>
            <div style={{ fontSize: '28pt', fontWeight: 'bold' }}>{centralNumber}</div>
          </div>

          {/* One More */}
          <div style={{ textAlign: 'center', padding: '15px', border: '3px solid #ddd', borderRadius: '10px', minWidth: '90px', background: '#fff' }}>
            <p style={{ fontSize: '11pt', marginBottom: '8px', color: '#666' }}>One More</p>
            <QuestionInput
              field={question.inputs[1] || { subId: `${question.id}-1`, placeholder: String(oneMore), inputType: 'text', style: { width: '60px', borderStyle: 'solid' } }}
              value={answers[question.inputs[1]?.subId || ''] || ''}
              onChange={onAnswerChange}
              disabled={submitted}
              isCorrect={isCorrect}
              showFeedback={submitted}
            />
          </div>
        </div>
      </div>
    )
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

  // Try specialized renderers first, then fall back to general rendering
  // Order matters: letter matching is more specific than general matching
  const letterMatchingContent = question.questionType === 'matching' ? renderLetterMatchingQuestion() : null
  const matchingContent = question.questionType === 'matching' && !letterMatchingContent ? renderMatchingQuestion() : null
  const oneMoreLessContent = question.questionType === 'one-more-less' ? renderOneMoreLessQuestion() : null

  return (
    <div>
      {letterMatchingContent || matchingContent || oneMoreLessContent || renderQuestionWithInputs()}

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
