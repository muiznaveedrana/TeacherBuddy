'use client'

import React, { useRef, useEffect, useMemo } from 'react'
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

  // Special rendering for rainbow bonds questions (0-10 sequence with missing numbers)
  const renderRainbowBondsQuestion = () => {
    if (!question.rainbowData) {
      return null
    }

    const { items } = question.rainbowData

    // Extract question text
    const questionTextMatch = question.questionHTML.match(/<(?:p|span)[^>]*class="[^"]*question-text[^"]*"[^>]*>([^<]*)</)
    const questionNumMatch = question.questionHTML.match(/<span[^>]*class="[^"]*question-number[^"]*"[^>]*>([^<]+)<\/span>/i)

    return (
      <div>
        <p className="text-lg mb-2">
          <span className="font-bold">{questionNumMatch ? questionNumMatch[1] : `${question.id}.`}</span>
          {questionTextMatch ? questionTextMatch[1] : ' Fill in the missing numbers on the rainbow.'}
        </p>

        {/* Rainbow SVG */}
        <div style={{ position: 'relative', margin: '15px auto', maxWidth: '440px', textAlign: 'center' }}>
          <svg viewBox="0 0 440 160" style={{ width: '100%', height: '140px' }}>
            <path d="M 20 150 A 200 150 0 0 1 420 150" fill="none" stroke="#FF6B6B" strokeWidth="8"/>
            <path d="M 60 150 A 160 120 0 0 1 380 150" fill="none" stroke="#FFA94D" strokeWidth="8"/>
            <path d="M 100 150 A 130 95 0 0 1 340 150" fill="none" stroke="#FFE066" strokeWidth="8"/>
            <path d="M 140 150 A 100 70 0 0 1 300 150" fill="none" stroke="#69DB7C" strokeWidth="8"/>
            <path d="M 180 150 A 70 50 0 0 1 260 150" fill="none" stroke="#74C0FC" strokeWidth="8"/>
            <circle cx="220" cy="150" r="6" fill="#B197FC"/>
          </svg>

          {/* Numbers below rainbow */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0', marginTop: '-5px' }}>
            {items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '15pt',
                  fontWeight: 'bold',
                  background: item.isFilled ? '#fff' : '#FFF9C4',
                  border: item.isFilled ? '2px solid #333' : '3px dashed #FF5722',
                  borderRadius: '50%'
                }}
              >
                {item.isFilled ? (
                  item.value
                ) : (
                  <input
                    type="text"
                    value={answers[question.inputs[item.inputIndex!]?.subId] || ''}
                    onChange={(e) => onAnswerChange(question.inputs[item.inputIndex!]?.subId, e.target.value)}
                    disabled={submitted}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      background: 'transparent',
                      textAlign: 'center',
                      fontSize: 'inherit',
                      fontWeight: 'inherit',
                      outline: 'none',
                      borderRadius: 'inherit'
                    }}
                    placeholder="?"
                    autoComplete="off"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Feedback indicator */}
        {submitted && (
          <p className={`text-center font-semibold mt-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Try again'}
          </p>
        )}
      </div>
    )
  }

  // Render inline equation row (used by Q1, Q3, Q4 in number bonds)
  const renderEquationRow = () => {
    if (!question.equationRowData) {
      return null
    }

    const { items } = question.equationRowData

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        margin: '15px auto',
        padding: '15px',
        background: '#f8f9ff',
        border: '3px solid #2196F3',
        borderRadius: '10px',
        maxWidth: '350px',
        fontSize: '22pt',
        fontWeight: 'bold'
      }}>
        {items.map((item, idx) => {
          if (item.type === 'num') {
            return (
              <span
                key={idx}
                style={{
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#4CAF50',
                  color: '#fff',
                  borderRadius: '8px',
                  border: '3px solid #2E7D32'
                }}
              >
                {item.value}
              </span>
            )
          } else if (item.type === 'op') {
            return (
              <span key={idx} style={{ fontSize: '24pt', color: '#333' }}>
                {item.value}
              </span>
            )
          } else if (item.type === 'answer') {
            return (
              <div
                key={idx}
                style={{
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid #333',
                  borderRadius: '8px',
                  background: '#FFF9C4'
                }}
              >
                <input
                  type="text"
                  value={answers[question.inputs[item.inputIndex!]?.subId] || ''}
                  onChange={(e) => onAnswerChange(question.inputs[item.inputIndex!]?.subId, e.target.value)}
                  disabled={submitted}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    background: 'transparent',
                    textAlign: 'center',
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    outline: 'none',
                    borderRadius: 'inherit'
                  }}
                  placeholder="?"
                  autoComplete="off"
                />
              </div>
            )
          }
          return null
        })}
      </div>
    )
  }

  // Render visual content without equation-row and answer-prompt (for Q1, Q3, Q4)
  const renderVisualContentWithEquation = () => {
    if (!question.equationRowData) {
      return null
    }

    // Extract question text
    const questionTextMatch = question.questionHTML.match(/<(?:p|span)[^>]*class="[^"]*question-text[^"]*"[^>]*>([^<]*)</)
    const questionNumMatch = question.questionHTML.match(/<span[^>]*class="[^"]*question-number[^"]*"[^>]*>([^<]+)<\/span>/i)

    // Remove equation-row/addition-equation/subtraction-equation and answer-prompt from HTML for visual rendering
    let visualHTML = question.questionHTML
      .replace(/<div[^>]*class="[^"]*equation-row[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
      .replace(/<div[^>]*class="[^"]*addition-equation[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
      .replace(/<div[^>]*class="[^"]*subtraction-equation[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
      .replace(/<p[^>]*class="[^"]*answer-prompt[^"]*"[^>]*>[\s\S]*?<\/p>/gi, '')
      .replace(/<div[^>]*class="[^"]*wing-labels[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '') // Remove wing-labels for butterfly

    return (
      <div>
        {/* Render visual content (ten-frame, domino, butterfly, etc.) */}
        <span dangerouslySetInnerHTML={{ __html: visualHTML }} />

        {/* Render inline equation */}
        {renderEquationRow()}

        {/* Feedback indicator */}
        {submitted && (
          <p className={`text-center font-semibold mt-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Try again'}
          </p>
        )}
      </div>
    )
  }

  // Special rendering for bond grid questions (3 + ○ = 10 format)
  const renderBondGridQuestion = () => {
    if (!question.bondGridData) {
      return null
    }

    const { equations } = question.bondGridData

    // Extract question text
    const questionTextMatch = question.questionHTML.match(/<(?:p|span)[^>]*class="[^"]*question-text[^"]*"[^>]*>([^<]*)</)
    const questionNumMatch = question.questionHTML.match(/<span[^>]*class="[^"]*question-number[^"]*"[^>]*>([^<]+)<\/span>/i)

    return (
      <div>
        <p className="text-lg mb-2">
          <span className="font-bold">{questionNumMatch ? questionNumMatch[1] : `${question.id}.`}</span>
          {questionTextMatch ? questionTextMatch[1] : ' Fill in the missing numbers to make 10.'}
        </p>

        {/* Bond grid - 2x2 layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
          margin: '15px auto',
          padding: '12px',
          background: '#fff',
          border: '3px solid #FF9800',
          borderRadius: '12px',
          maxWidth: '420px'
        }}>
          {equations.map((eq, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                padding: '8px 5px',
                background: '#FFF8E1',
                borderRadius: '8px'
              }}
            >
              {/* First number */}
              <span style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16pt',
                fontWeight: 'bold',
                background: '#FFECB3',
                border: '3px solid #FF9800',
                borderRadius: '50%'
              }}>
                {eq.num1}
              </span>

              {/* Plus sign */}
              <span style={{ fontSize: '16pt', fontWeight: 'bold', color: '#333' }}>+</span>

              {/* Answer circle (input or value) */}
              <div style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #333',
                borderRadius: '50%',
                background: eq.num2 === null ? '#FFF9C4' : '#fff',
                fontSize: '16pt',
                fontWeight: 'bold'
              }}>
                {eq.num2 === null ? (
                  <input
                    type="text"
                    value={answers[question.inputs[eq.inputIndex!]?.subId] || ''}
                    onChange={(e) => onAnswerChange(question.inputs[eq.inputIndex!]?.subId, e.target.value)}
                    disabled={submitted}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      background: 'transparent',
                      textAlign: 'center',
                      fontSize: 'inherit',
                      fontWeight: 'inherit',
                      outline: 'none',
                      borderRadius: 'inherit'
                    }}
                    placeholder="?"
                    autoComplete="off"
                  />
                ) : eq.num2}
              </div>

              {/* Equals sign */}
              <span style={{ fontSize: '16pt', fontWeight: 'bold', color: '#333' }}>=</span>

              {/* Result (usually 10) */}
              <span style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14pt',
                fontWeight: 'bold',
                background: '#4CAF50',
                color: '#fff',
                borderRadius: '50%',
                border: '3px solid #2E7D32'
              }}>
                {eq.result}
              </span>
            </div>
          ))}
        </div>

        {/* Feedback indicator */}
        {submitted && (
          <p className={`text-center font-semibold mt-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Try again'}
          </p>
        )}
      </div>
    )
  }

  // Special rendering for fact family questions (multiple related equations)
  const renderFactFamilyQuestion = () => {
    if (!question.factFamilyData) {
      return null
    }

    const { equations } = question.factFamilyData

    // Extract question text
    const questionTextMatch = question.questionHTML.match(/<(?:p|span)[^>]*class="[^"]*question-text[^"]*"[^>]*>([^<]*)</)
    const questionNumMatch = question.questionHTML.match(/<span[^>]*class="[^"]*question-number[^"]*"[^>]*>([^<]+)<\/span>/i)

    // Also extract the visual fact family box if present
    const factFamilyVisualMatch = question.questionHTML.match(/<div[^>]*class="[^"]*fact-family-box[^"]*"[^>]*>([\s\S]*?)<\/div>/i)

    return (
      <div>
        <p className="text-lg mb-3">
          <span className="font-bold">{questionNumMatch ? questionNumMatch[1] : `${question.id}.`}</span>
          {questionTextMatch ? questionTextMatch[1] : ' Complete the fact family.'}
        </p>

        {/* Render each equation inline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '15px auto', maxWidth: '400px' }}>
          {equations.map((eq, eqIdx) => (
            <div
              key={eqIdx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 15px',
                background: '#f8f9ff',
                border: '2px solid #2196F3',
                borderRadius: '10px',
                fontSize: '20pt',
                fontWeight: 'bold'
              }}
            >
              {eq.items.map((item, idx) => {
                if (item.type === 'num') {
                  return (
                    <span
                      key={idx}
                      style={{
                        minWidth: '45px',
                        height: '45px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#4CAF50',
                        color: '#fff',
                        borderRadius: '8px',
                        border: '3px solid #2E7D32'
                      }}
                    >
                      {item.value}
                    </span>
                  )
                } else if (item.type === 'op') {
                  return (
                    <span key={idx} style={{ fontSize: '22pt', color: '#333' }}>
                      {item.value}
                    </span>
                  )
                } else if (item.type === 'answer') {
                  return (
                    <div
                      key={idx}
                      style={{
                        width: '45px',
                        height: '45px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '3px solid #333',
                        borderRadius: '8px',
                        background: '#FFF9C4'
                      }}
                    >
                      <input
                        type="text"
                        value={answers[question.inputs[item.inputIndex!]?.subId] || ''}
                        onChange={(e) => onAnswerChange(question.inputs[item.inputIndex!]?.subId, e.target.value)}
                        disabled={submitted}
                        style={{
                          width: '100%',
                          height: '100%',
                          border: 'none',
                          background: 'transparent',
                          textAlign: 'center',
                          fontSize: 'inherit',
                          fontWeight: 'inherit',
                          outline: 'none',
                          borderRadius: 'inherit'
                        }}
                        placeholder="?"
                        autoComplete="off"
                      />
                    </div>
                  )
                }
                return null
              })}
            </div>
          ))}
        </div>

        {/* Feedback indicator */}
        {submitted && (
          <p className={`text-center font-semibold mt-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Try again'}
          </p>
        )}
      </div>
    )
  }

  // Special rendering for number sequence questions (stepping stones, caterpillar, river stones)
  const renderNumberSequenceQuestion = () => {
    if (!question.sequenceData) {
      return null
    }

    const { type, direction, items } = question.sequenceData

    // Detect if this is a river stone question
    const isRiverStone = question.questionHTML.includes('river') && question.questionHTML.includes('stone')

    // Extract question text
    const questionTextMatch = question.questionHTML.match(/<(?:p|span)[^>]*class="[^"]*question-text[^"]*"[^>]*>([^<]*)</)
    const questionNumMatch = question.questionHTML.match(/<span[^>]*class="[^"]*question-number[^"]*"[^>]*>([^<]+)<\/span>/i)

    // Determine colors based on type and direction
    let containerStyle: React.CSSProperties
    let filledBoxStyle: React.CSSProperties
    let emptyBoxStyle: React.CSSProperties
    let boxShape: 'square' | 'round' | 'oval' = 'square'

    if (type === 'caterpillar') {
      containerStyle = { background: '#f0fff0', border: '3px solid #8BC34A', borderRadius: '12px', padding: '20px' }
      filledBoxStyle = { background: '#AED581', border: '3px solid #8BC34A', color: '#2E7D32' }
      emptyBoxStyle = { background: '#fff', border: '3px dashed #FF5722' }
      boxShape = 'round'
    } else if (isRiverStone) {
      containerStyle = {
        background: 'linear-gradient(180deg, #E3F2FD 0%, #BBDEFB 50%, #90CAF9 100%)',
        border: '3px solid #2196F3',
        borderRadius: '12px',
        padding: '20px'
      }
      filledBoxStyle = {
        background: 'linear-gradient(145deg, #9E9E9E, #757575)',
        border: '2px solid #616161',
        color: '#fff',
        boxShadow: '2px 4px 8px rgba(0,0,0,0.3)'
      }
      emptyBoxStyle = {
        background: '#fff',
        border: '3px dashed #FF5722',
        color: '#333',
        boxShadow: 'none'
      }
      boxShape = 'oval'
    } else {
      // Standard sequence box
      containerStyle = direction === 'backward'
        ? { background: '#E3F2FD', border: '3px solid #4CAF50', borderRadius: '12px', padding: '20px' }
        : { background: '#FFF9C4', border: '3px solid #4CAF50', borderRadius: '12px', padding: '20px' }
      filledBoxStyle = { background: '#4CAF50', border: '3px solid #2E7D32', color: '#fff' }
      emptyBoxStyle = { background: '#fff', border: '3px dashed #FF5722' }
      boxShape = 'square'
    }

    return (
      <div>
        <p className="text-lg mb-2">
          <span className="font-bold">{questionNumMatch ? questionNumMatch[1] : `${question.id}.`}</span>
          {questionTextMatch ? questionTextMatch[1] : ' Fill in the missing numbers.'}
        </p>

        {/* Direction indicator for backward sequences */}
        {direction === 'backward' && (
          <div style={{
            display: 'inline-block',
            background: '#E3F2FD',
            padding: '5px 15px',
            borderRadius: '20px',
            fontSize: '13pt',
            fontWeight: 'bold',
            color: '#1976D2',
            marginBottom: '10px'
          }}>
            ← Count Backwards
          </div>
        )}

        {/* Caterpillar head for caterpillar type */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: type === 'caterpillar' ? '5px' : '10px',
          margin: '15px auto',
          ...containerStyle,
          maxWidth: '600px'
        }}>
          {type === 'caterpillar' && (
            <div style={{
              width: '60px',
              height: '60px',
              background: '#8BC34A',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid #689F38',
              fontSize: '30pt'
            }}>
              😊
            </div>
          )}

          {items.map((item, idx) => {
            // Determine border radius based on shape
            let borderRadius = '8px'
            if (boxShape === 'round') borderRadius = '50%'
            else if (boxShape === 'oval') borderRadius = '50%'

            // Determine dimensions based on type
            let width = '60px'
            let height = '60px'
            let fontSize = '22pt'

            if (type === 'caterpillar') {
              width = '55px'
              height = '55px'
              fontSize = '20pt'
            } else if (isRiverStone) {
              width = '60px'
              height = '50px'
              fontSize = '20pt'
            }

            return (
              <div
                key={idx}
                style={{
                  width,
                  height,
                  borderRadius,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize,
                  fontWeight: 'bold',
                  ...(item.isFilled ? filledBoxStyle : emptyBoxStyle)
                }}
              >
                {item.isFilled ? (
                  item.value
                ) : (
                  <input
                    type="text"
                    value={answers[question.inputs[item.inputIndex!]?.subId] || ''}
                    onChange={(e) => onAnswerChange(question.inputs[item.inputIndex!]?.subId, e.target.value)}
                    disabled={submitted}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      background: 'transparent',
                      textAlign: 'center',
                      fontSize: 'inherit',
                      fontWeight: 'inherit',
                      outline: 'none',
                      borderRadius: 'inherit'
                    }}
                    placeholder="?"
                    autoComplete="off"
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Feedback indicator */}
        {submitted && (
          <p className={`text-center font-semibold mt-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Try again'}
          </p>
        )}
      </div>
    )
  }

  // Special rendering for Base-10 Block Comparison questions (Q1 type: 58 vs 43)
  const renderBlockComparisonQuestion = () => {
    const html = question.questionHTML

    // Check if this is a block comparison question - multiple detection patterns
    const hasComparisonContainer = html.includes('comparison-container') && html.includes('number-group')
    const hasVsCircle = html.includes('vs-circle') || html.includes('VS')
    const hasTensOnes = html.includes('ten-rod') || html.includes('unit-cube') || html.includes('tens-stack')
    const hasGreaterText = html.toLowerCase().includes('greater')
    const hasNumberLabels = (html.match(/number-label[^>]*>\d+</gi) || []).length >= 2

    // Need at least VS + greater text + (blocks OR comparison container)
    const isBlockComparison = hasGreaterText && (hasVsCircle || hasNumberLabels) && (hasTensOnes || hasComparisonContainer)

    if (!isBlockComparison) {
      return null
    }

    console.log('🔍 Q1 Block Comparison detected:', { hasComparisonContainer, hasVsCircle, hasTensOnes, hasGreaterText, hasNumberLabels })

    // Extract the two numbers being compared
    const numberLabels: string[] = []
    const labelRegex = /<div[^>]*class="[^"]*number-label[^"]*"[^>]*>(\d+)<\/div>/gi
    let labelMatch
    while ((labelMatch = labelRegex.exec(html)) !== null) {
      numberLabels.push(labelMatch[1])
    }

    // Get input fields by index (fixed indices, not mutable counter)
    // Generate fallback subIds if parser didn't detect all inputs
    const inputA = question.inputs[0] || { subId: `${question.id}-a`, placeholder: '' }
    const inputB = question.inputs[1] || { subId: `${question.id}-b`, placeholder: '' }

    // Calculate expected answers based on displayed numbers
    let expectedGreater = ''
    let expectedTens = ''
    if (numberLabels.length >= 2) {
      const num1 = parseInt(numberLabels[0])
      const num2 = parseInt(numberLabels[1])
      const greaterNum = Math.max(num1, num2)
      expectedGreater = String(greaterNum)
      // Determine which place value differs - "tens" or "ones"
      const tens1 = Math.floor(num1 / 10)
      const tens2 = Math.floor(num2 / 10)
      expectedTens = tens1 !== tens2 ? 'tens' : 'ones'
      console.log(`🔧 Q${question.id} Block Comparison: Expected answers:`, expectedGreater, expectedTens)
    }

    // Custom validation for Q1
    const validateQ1 = () => {
      const userA = (answers[inputA.subId] || '').trim()
      const userB = (answers[inputB.subId] || '').trim().toLowerCase()
      return userA === expectedGreater && userB === expectedTens
    }

    const q1Correct = submitted ? validateQ1() : null

    return (
      <div style={{ background: '#FFF9C4', padding: '15px', borderRadius: '8px', border: '2px solid #ddd' }}>
        <p className="text-lg mb-2">
          <span className="font-bold">{question.id}.</span>
          {' Look at the blocks. Which number is '}
          <strong>greater</strong>?
        </p>

        {/* Visual comparison with blocks */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: '30px',
          margin: '15px 0',
          padding: '15px',
          background: '#FAFAFA',
          borderRadius: '8px'
        }}>
          {numberLabels.map((num, idx) => (
            <React.Fragment key={idx}>
              {idx === 1 && (
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: '#E3F2FD',
                  border: '3px solid #1976D2',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16pt',
                  fontWeight: 'bold',
                  color: '#1976D2'
                }}>VS</div>
              )}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '24pt',
                  fontWeight: 'bold',
                  color: '#1976D2',
                  marginBottom: '10px'
                }}>{num}</div>
                {/* Simple block representation */}
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'flex-end' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {Array.from({ length: Math.floor(parseInt(num) / 10) }).map((_, i) => (
                      <div key={i} style={{
                        width: '60px',
                        height: '14px',
                        background: 'linear-gradient(180deg, #FFB74D 0%, #FF9800 100%)',
                        border: '2px solid #E65100',
                        borderRadius: '3px'
                      }} />
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', maxWidth: '50px', alignContent: 'flex-end' }}>
                    {Array.from({ length: parseInt(num) % 10 }).map((_, i) => (
                      <div key={i} style={{
                        width: '14px',
                        height: '14px',
                        background: 'linear-gradient(135deg, #81C784 0%, #4CAF50 100%)',
                        border: '2px solid #2E7D32',
                        borderRadius: '2px'
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Sub-question a) - inline input */}
        {inputA && (
          <div style={{ fontSize: '14pt', margin: '12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span><strong>a)</strong> The greater number is:</span>
            <input
              type="text"
              value={answers[inputA.subId] || ''}
              onChange={(e) => onAnswerChange(inputA.subId, e.target.value)}
              disabled={submitted}
              style={{
                width: '80px',
                height: '40px',
                border: '3px solid #333',
                borderRadius: '8px',
                background: '#FFF',
                textAlign: 'center',
                fontSize: '18pt',
                fontWeight: 'bold'
              }}
              placeholder="?"
              autoComplete="off"
            />
          </div>
        )}

        {/* Sub-question b) - inline input */}
        {inputB && (
          <div style={{ fontSize: '14pt', margin: '12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span><strong>b)</strong> It has</span>
            <input
              type="text"
              value={answers[inputB.subId] || ''}
              onChange={(e) => onAnswerChange(inputB.subId, e.target.value)}
              disabled={submitted}
              style={{
                width: '60px',
                height: '40px',
                border: '3px solid #333',
                borderRadius: '8px',
                background: '#FFF',
                textAlign: 'center',
                fontSize: '18pt',
                fontWeight: 'bold'
              }}
              placeholder="?"
              autoComplete="off"
            />
            <span>tens.</span>
          </div>
        )}

        {/* Custom feedback for Q1 */}
        {submitted && q1Correct !== null && (
          <p className={`text-center font-semibold mt-2 ${q1Correct ? 'text-green-600' : 'text-red-600'}`}>
            {q1Correct ? '✓ Correct!' : '✗ Check your answers.'}
          </p>
        )}
      </div>
    )
  }

  // Special rendering for Open-Ended questions (? < 45, find 3 numbers)
  const renderOpenEndedQuestion = () => {
    const html = question.questionHTML

    // Check if this is an open-ended box question (multiple detection patterns)
    const hasOpenEndedBox = html.includes('open-ended-box')
    const hasMultipleAnswers = html.includes('multiple-answers')
    const hasMysteryBox = html.includes('mystery-box')
    const hasAnswerSlot = html.includes('answer-slot')
    const hasFindNumbers = html.toLowerCase().includes('find') && html.toLowerCase().includes('numbers that work')
    const hasWhatNumber = html.toLowerCase().includes('what number could')

    const isOpenEnded = hasOpenEndedBox || hasMultipleAnswers || hasMysteryBox || (hasAnswerSlot && (hasFindNumbers || hasWhatNumber))

    console.log(`🔍 Q${question.id} Open-Ended check:`, { hasOpenEndedBox, hasMultipleAnswers, hasMysteryBox, hasAnswerSlot, hasFindNumbers, hasWhatNumber, isOpenEnded })

    if (!isOpenEnded) {
      return null
    }

    console.log(`✅ Q${question.id} Open-Ended DETECTED!`)

    // Extract question text
    const questionTextMatch = html.match(/<p[^>]*class="[^"]*question-text[^"]*"[^>]*>.*?<span[^>]*class="[^"]*question-number[^"]*"[^>]*>([^<]+)<\/span>([^<]+)/i)

    // Extract the equation display (e.g., "? < 45" or "52 < ?")
    const equationMatch = html.match(/<div[^>]*class="[^"]*equation-display[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
    let leftNum = '', symbol = '', rightNum = '', mysteryPosition: 'left' | 'right' = 'left'

    if (equationMatch) {
      const eqContent = equationMatch[1]
      // Check if mystery box is on left or right
      const mysteryFirst = eqContent.indexOf('mystery-box') < (eqContent.indexOf('symbol-large') || eqContent.indexOf('&lt;') || eqContent.indexOf('&gt;'))

      if (mysteryFirst) {
        mysteryPosition = 'left'
        const numMatch = eqContent.match(/(\d+)\s*<\/span>\s*<\/div>|>(\d+)</i)
        rightNum = numMatch ? (numMatch[1] || numMatch[2]) : ''
        symbol = eqContent.includes('&lt;') ? '<' : (eqContent.includes('&gt;') ? '>' : '=')
      } else {
        mysteryPosition = 'right'
        const numMatch = eqContent.match(/>(\d+)</)
        leftNum = numMatch ? numMatch[1] : ''
        symbol = eqContent.includes('&lt;') ? '<' : (eqContent.includes('&gt;') ? '>' : '=')
      }
    }

    // Extract hint text
    const hintMatch = html.match(/The mystery number must be[^<]*/i)
    const hintText = hintMatch ? hintMatch[0] : ''

    // Count answer slots
    const slotCount = (html.match(/answer-slot/gi) || []).length || 3

    // Custom validation for open-ended questions
    // "52 < ?" means mystery number must be > 52
    // "? < 45" means mystery number must be < 45
    const validateOpenEnded = () => {
      const compareNum = mysteryPosition === 'left' ? parseInt(rightNum) : parseInt(leftNum)
      const userAnswers = question.inputs.slice(0, slotCount).map(f => parseInt(answers[f.subId] || ''))

      // Check each answer satisfies the comparison
      return userAnswers.every(ans => {
        if (isNaN(ans)) return false
        if (mysteryPosition === 'left') {
          // ? < N means answer must be < N
          // ? > N means answer must be > N
          return symbol === '<' ? ans < compareNum : ans > compareNum
        } else {
          // N < ? means answer must be > N
          // N > ? means answer must be < N
          return symbol === '<' ? ans > compareNum : ans < compareNum
        }
      }) && userAnswers.filter(a => !isNaN(a)).length >= slotCount
    }

    const openEndedCorrect = submitted ? validateOpenEnded() : null

    return (
      <div>
        <p className="text-lg mb-2">
          <span className="font-bold">{questionTextMatch ? questionTextMatch[1] : `${question.id}.`}</span>
          {questionTextMatch ? questionTextMatch[2] : ' What number could go in the box?'}
        </p>

        {/* Equation display */}
        <div style={{
          background: '#E8F5E9',
          border: '3px solid #4CAF50',
          borderRadius: '10px',
          padding: '20px',
          margin: '15px 0',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '28pt',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px'
          }}>
            {mysteryPosition === 'left' ? (
              <>
                <span style={{
                  width: '70px',
                  height: '55px',
                  border: '3px dashed #FF9800',
                  borderRadius: '8px',
                  background: '#FFF9C4',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24pt',
                  color: '#999'
                }}>?</span>
                <span style={{ color: '#E53935', fontSize: '32pt' }}>{symbol}</span>
                <span>{rightNum}</span>
              </>
            ) : (
              <>
                <span>{leftNum}</span>
                <span style={{ color: '#E53935', fontSize: '32pt' }}>{symbol}</span>
                <span style={{
                  width: '70px',
                  height: '55px',
                  border: '3px dashed #FF9800',
                  borderRadius: '8px',
                  background: '#FFF9C4',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24pt',
                  color: '#999'
                }}>?</span>
              </>
            )}
          </div>

          {hintText && (
            <p style={{ fontSize: '13pt', color: '#555', margin: '15px 0 5px 0' }}>{hintText}</p>
          )}

          <p style={{ fontSize: '14pt', fontWeight: 'bold', margin: '10px 0' }}>
            Find {slotCount} different numbers that work:
          </p>

          {/* Inline input slots */}
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '15px' }}>
            {question.inputs.slice(0, slotCount).map((field, idx) => (
              <input
                key={field.subId}
                type="text"
                value={answers[field.subId] || ''}
                onChange={(e) => onAnswerChange(field.subId, e.target.value)}
                disabled={submitted}
                style={{
                  width: '60px',
                  height: '45px',
                  border: '2px solid #333',
                  borderRadius: '8px',
                  background: '#FFF',
                  textAlign: 'center',
                  fontSize: '18pt',
                  fontWeight: 'bold'
                }}
                placeholder="?"
                autoComplete="off"
              />
            ))}
          </div>
        </div>

        {/* Custom feedback for open-ended questions */}
        {submitted && openEndedCorrect !== null && (
          <p className={`text-center font-semibold mt-2 ${openEndedCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {openEndedCorrect
              ? '✓ Correct! All numbers work!'
              : `✗ Check your answers. Numbers must be ${mysteryPosition === 'left'
                  ? (symbol === '<' ? `less than ${rightNum}` : `greater than ${rightNum}`)
                  : (symbol === '<' ? `greater than ${leftNum}` : `less than ${leftNum}`)
                }.`}
          </p>
        )}
      </div>
    )
  }

  // Special rendering for Symbol Comparison questions (< > =)
  const renderSymbolComparisonQuestion = () => {
    const html = question.questionHTML

    // Check if this is a symbol comparison question
    if (!html.includes('symbol-row') && !html.includes('symbol-box')) {
      return null
    }

    // Extract question text
    const questionTextMatch = html.match(/<p[^>]*class="[^"]*question-text[^"]*"[^>]*>.*?<span[^>]*class="[^"]*question-number[^"]*"[^>]*>([^<]+)<\/span>([\s\S]*?)<\/p>/i)

    // Extract all symbol rows (number comparisons)
    // Note: Parser may have replaced symbol-box with data-input-placeholder, so we look for either
    const symbolRows: Array<{ left: string; right: string }> = []
    const rowRegex = /<div[^>]*class="[^"]*symbol-row[^"]*"[^>]*>[\s\S]*?<span[^>]*class="[^"]*compare-number[^"]*"[^>]*>(\d+)<\/span>[\s\S]*?<span[^>]*(?:class="[^"]*symbol-box[^"]*"|data-input-placeholder)[^>]*>[\s\S]*?<\/span>[\s\S]*?<span[^>]*class="[^"]*compare-number[^"]*"[^>]*>(\d+)<\/span>[\s\S]*?<\/div>/gi
    let rowMatch
    while ((rowMatch = rowRegex.exec(html)) !== null) {
      symbolRows.push({ left: rowMatch[1], right: rowMatch[2] })
    }

    console.log('🔍 Symbol rows found:', symbolRows.length, symbolRows)

    // Check if there's a reasoning box
    const hasReasoningBox = html.includes('reasoning-box')

    // Extract character name and speech from the speech bubble
    const speechBubbleMatch = html.match(/<strong>(\w+)\s*says:<\/strong>\s*"([^"]+)"/i)
    const characterName = speechBubbleMatch ? speechBubbleMatch[1] : 'Tom'
    const characterSpeech = speechBubbleMatch ? speechBubbleMatch[2] : ''

    // Extract the symbol question numbers (e.g., "67 __ 76")
    // Note: Parser may have replaced answer-box with data-input-placeholder
    const symbolQMatch = html.match(/Write the correct symbol:\s*(\d+)[\s\S]*?<span[^>]*(?:class="[^"]*answer-box[^"]*"|data-input-placeholder)[^>]*>[\s\S]*?<\/span>\s*(\d+)/i)
    const symbolNum1 = symbolQMatch ? symbolQMatch[1] : ''
    const symbolNum2 = symbolQMatch ? symbolQMatch[2] : ''

    console.log('🔍 Symbol Q numbers:', symbolNum1, symbolNum2)

    // Calculate fixed indices for inputs:
    // - inputs[0..n-1]: Symbol rows (one per row)
    // - inputs[n]: Yes/No answer (c)
    // - inputs[n+1]: Final symbol (d)
    const yesNoInputIdx = symbolRows.length  // Index after symbol rows
    const finalSymbolIdx = symbolRows.length + 1  // Index after Yes/No

    // Generate fallback inputs if parser didn't detect all
    const getInput = (idx: number, fallbackId: string) =>
      question.inputs[idx] || { subId: `${question.id}-${fallbackId}`, placeholder: '' }

    const yesNoInput = getInput(yesNoInputIdx, 'yesno')
    const finalSymbolInput = getInput(finalSymbolIdx, 'final')

    // Auto-calculate correct answers based on the actual numbers
    const getCorrectSymbol = (left: number, right: number) => {
      if (left < right) return '<'
      if (left > right) return '>'
      return '='
    }

    // Calculate expected answers
    const expectedAnswers: string[] = []
    symbolRows.forEach(row => {
      expectedAnswers.push(getCorrectSymbol(parseInt(row.left), parseInt(row.right)))
    })

    // Determine if Tom is correct by parsing his speech
    // E.g., "67 is greater than 76" -> check if 67 > 76 (false, so answer is "No")
    const tomClaimMatch = characterSpeech.match(/(\d+)\s+is\s+(greater|less)\s+than\s+(\d+)/i)
    if (tomClaimMatch) {
      const num1 = parseInt(tomClaimMatch[1])
      const claim = tomClaimMatch[2].toLowerCase()
      const num2 = parseInt(tomClaimMatch[3])
      const tomIsCorrect = claim === 'greater' ? num1 > num2 : num1 < num2
      expectedAnswers.push(tomIsCorrect ? 'Yes' : 'No')
    }

    // Final symbol question
    if (symbolNum1 && symbolNum2) {
      expectedAnswers.push(getCorrectSymbol(parseInt(symbolNum1), parseInt(symbolNum2)))
    }

    // Custom validation
    const validateQ3 = () => {
      const userAnswers: string[] = []
      symbolRows.forEach((_, idx) => {
        const field = question.inputs[idx] || { subId: `${question.id}-row${idx}` }
        userAnswers.push((answers[field.subId] || '').trim())
      })
      userAnswers.push((answers[yesNoInput.subId] || '').trim())
      userAnswers.push((answers[finalSymbolInput.subId] || '').trim())

      return userAnswers.every((ans, i) => {
        const expected = expectedAnswers[i]
        if (!expected) return true
        return ans.toLowerCase() === expected.toLowerCase()
      })
    }

    const q3Correct = submitted ? validateQ3() : null
    console.log('🔣 Q3 expected answers:', expectedAnswers)

    return (
      <div>
        <p className="text-lg mb-2">
          <span className="font-bold">{questionTextMatch ? questionTextMatch[1] : `${question.id}.`}</span>
          {' Write <, >, or = in each box.'}
        </p>

        {/* Symbol hints */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '15px', fontSize: '12pt', color: '#666' }}>
          <span style={{ padding: '5px 15px', border: '2px solid #ddd', borderRadius: '5px', background: '#FFF' }}>{'<'} less than</span>
          <span style={{ padding: '5px 15px', border: '2px solid #ddd', borderRadius: '5px', background: '#FFF' }}>{'>'} greater than</span>
          <span style={{ padding: '5px 15px', border: '2px solid #ddd', borderRadius: '5px', background: '#FFF' }}>{'='} equal to</span>
        </div>

        {/* Symbol comparison rows - using fixed index based on row position */}
        {symbolRows.map((row, idx) => {
          const field = question.inputs[idx]  // Fixed index: row 0 = input 0, row 1 = input 1
          return (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px',
              margin: '12px 0',
              fontSize: '22pt',
              fontWeight: 'bold'
            }}>
              <span style={{
                background: '#FFF',
                border: '3px solid #333',
                borderRadius: '8px',
                padding: '10px 20px',
                minWidth: '60px',
                textAlign: 'center'
              }}>{row.left}</span>

              <input
                type="text"
                value={answers[field?.subId || ''] || ''}
                onChange={(e) => field && onAnswerChange(field.subId, e.target.value)}
                disabled={submitted}
                style={{
                  width: '60px',
                  height: '50px',
                  border: '3px dashed #FF9800',
                  borderRadius: '8px',
                  background: '#FFF9C4',
                  textAlign: 'center',
                  fontSize: '24pt',
                  fontWeight: 'bold'
                }}
                placeholder="?"
                autoComplete="off"
              />

              <span style={{
                background: '#FFF',
                border: '3px solid #333',
                borderRadius: '8px',
                padding: '10px 20px',
                minWidth: '60px',
                textAlign: 'center'
              }}>{row.right}</span>
            </div>
          )
        })}

        {/* Reasoning box (Tom says...) */}
        {hasReasoningBox && (
          <div style={{
            background: '#FCE4EC',
            border: '2px solid #E91E63',
            borderRadius: '8px',
            padding: '15px',
            margin: '15px 0'
          }}>
            {/* Character speech bubble */}
            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: '#E1BEE7',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24pt',
                flexShrink: 0
              }}>🧒</div>
              <div style={{
                background: '#FFF',
                border: '2px solid #9C27B0',
                borderRadius: '10px',
                padding: '12px',
                flex: 1
              }}>
                <p style={{ margin: 0 }}>
                  <strong>{characterName} says:</strong> "{characterSpeech}"
                </p>
              </div>
            </div>

            {/* c) Yes/No question with buttons - using fixed yesNoInput */}
            {yesNoInput && (
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '14pt', marginBottom: '8px' }}>
                  <strong>c)</strong> Is {characterName} correct?
                </p>
                <div style={{ display: 'flex', gap: '10px', marginLeft: '20px' }}>
                  <button
                    type="button"
                    onClick={() => !submitted && onAnswerChange(yesNoInput.subId, 'Yes')}
                    disabled={submitted}
                    style={{
                      padding: '10px 25px',
                      fontSize: '16pt',
                      fontWeight: 'bold',
                      border: '3px solid #4CAF50',
                      borderRadius: '8px',
                      background: answers[yesNoInput.subId] === 'Yes' ? '#4CAF50' : '#FFF',
                      color: answers[yesNoInput.subId] === 'Yes' ? '#FFF' : '#333',
                      cursor: submitted ? 'default' : 'pointer'
                    }}
                  >
                    ✓ Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => !submitted && onAnswerChange(yesNoInput.subId, 'No')}
                    disabled={submitted}
                    style={{
                      padding: '10px 25px',
                      fontSize: '16pt',
                      fontWeight: 'bold',
                      border: '3px solid #F44336',
                      borderRadius: '8px',
                      background: answers[yesNoInput.subId] === 'No' ? '#F44336' : '#FFF',
                      color: answers[yesNoInput.subId] === 'No' ? '#FFF' : '#333',
                      cursor: submitted ? 'default' : 'pointer'
                    }}
                  >
                    ✗ No
                  </button>
                </div>
              </div>
            )}

            {/* d) Symbol question - using fixed finalSymbolInput */}
            {symbolNum1 && finalSymbolInput && (
              <div style={{ fontSize: '14pt' }}>
                <p style={{ marginBottom: '8px' }}>
                  <strong>d)</strong> Write the correct symbol:
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  fontSize: '20pt',
                  fontWeight: 'bold',
                  marginLeft: '20px'
                }}>
                  <span style={{
                    background: '#FFF',
                    border: '2px solid #333',
                    borderRadius: '6px',
                    padding: '8px 15px'
                  }}>{symbolNum1}</span>
                  <input
                    type="text"
                    value={answers[finalSymbolInput.subId] || ''}
                    onChange={(e) => onAnswerChange(finalSymbolInput.subId, e.target.value)}
                    disabled={submitted}
                    style={{
                      width: '50px',
                      height: '45px',
                      border: '3px dashed #FF9800',
                      borderRadius: '8px',
                      background: '#FFF9C4',
                      textAlign: 'center',
                      fontSize: '20pt',
                      fontWeight: 'bold'
                    }}
                    placeholder="?"
                    autoComplete="off"
                  />
                  <span style={{
                    background: '#FFF',
                    border: '2px solid #333',
                    borderRadius: '6px',
                    padding: '8px 15px'
                  }}>{symbolNum2}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Custom feedback for Q3 */}
        {submitted && q3Correct !== null && (
          <p className={`text-center font-semibold mt-2 ${q3Correct ? 'text-green-600' : 'text-red-600'}`}>
            {q3Correct ? '✓ Correct!' : '✗ Check your answers. Remember: compare tens first, then ones.'}
          </p>
        )}
      </div>
    )
  }

  // Special rendering for Word Problem questions (Q5 type: Class A vs Class B)
  const renderWordProblemQuestion = () => {
    const html = question.questionHTML

    // Check if this is a word problem question - multiple detection patterns
    const hasWordProblemBox = html.includes('word-problem-box')
    const hasComparisonVisual = html.includes('comparison-visual')
    const hasPersonGroup = html.includes('person-group') || html.includes('person-name') || html.includes('person-amount')
    const hasReadProblem = html.toLowerCase().includes('read the problem')
    const hasWhoCollectedMore = html.toLowerCase().includes('who collected') || html.toLowerCase().includes('who has more') || html.toLowerCase().includes('which') && html.toLowerCase().includes('more')
    const hasHowManyMore = html.toLowerCase().includes('how many more')

    // Need read problem + person names + multiple question parts
    // IMPORTANT: Only use this renderer when person groups are present
    // Other word problems (like chocolate bar fractions) should use generic renderer
    const isWordProblem = hasPersonGroup &&
                          (hasReadProblem || (hasWhoCollectedMore && hasHowManyMore))

    if (!isWordProblem) {
      return null
    }

    console.log('🔍 Q5 Word Problem detected:', { hasWordProblemBox, hasComparisonVisual, hasPersonGroup, hasReadProblem })

    // Extract person/group names and amounts
    const groups: Array<{ name: string; amount: string }> = []
    const groupRegex = /<div[^>]*class="[^"]*person-name[^"]*"[^>]*>([^<]+)<\/div>[\s\S]*?<div[^>]*class="[^"]*person-amount[^"]*"[^>]*>(\d+)<\/div>/gi
    let groupMatch
    while ((groupMatch = groupRegex.exec(html)) !== null) {
      groups.push({ name: groupMatch[1], amount: groupMatch[2] })
    }

    // Get input fields by fixed index (not mutable counter)
    // Generate fallback subIds if parser didn't detect all inputs
    const inputA = question.inputs[0] || { subId: `${question.id}-a`, placeholder: '' }
    const inputB = question.inputs[1] || { subId: `${question.id}-b`, placeholder: '' }
    const inputC = question.inputs[2] || { subId: `${question.id}-c`, placeholder: '' }

    // Calculate expected answers based on the groups
    let expectedName = ''
    let expectedSymbol = ''
    let expectedDiff = ''
    if (groups.length >= 2) {
      const amt1 = parseInt(groups[0].amount)
      const amt2 = parseInt(groups[1].amount)
      expectedName = amt1 > amt2 ? groups[0].name : groups[1].name
      expectedSymbol = amt1 > amt2 ? '>' : (amt1 < amt2 ? '<' : '=')
      expectedDiff = String(Math.abs(amt1 - amt2))
    }

    // Custom validation for Q5
    const validateQ5 = () => {
      const userA = (answers[inputA.subId] || '').trim().toLowerCase()
      const userB = (answers[inputB.subId] || '').trim()
      const userC = (answers[inputC.subId] || '').trim()

      const nameCorrect = userA === expectedName.toLowerCase() || (userA.length >= 3 && expectedName.toLowerCase().includes(userA))
      const symbolCorrect = userB === expectedSymbol
      const diffCorrect = userC === expectedDiff

      return nameCorrect && symbolCorrect && diffCorrect
    }

    const q5Correct = submitted ? validateQ5() : null
    console.log('📊 Q5 expected:', { expectedName, expectedSymbol, expectedDiff })

    return (
      <div>
        <p className="text-lg mb-2">
          <span className="font-bold">{question.id}.</span>
          {' Read the problem and answer the questions.'}
        </p>

        {/* Word problem visual */}
        <div style={{
          background: '#FFF3E0',
          border: '2px dashed #FF9800',
          borderRadius: '8px',
          padding: '15px',
          margin: '10px 0'
        }}>
          {groups.length >= 2 && (
            <>
              <p style={{ fontSize: '14pt', margin: '10px 0' }}>
                <strong>{groups[0].name}</strong> collected <strong>{groups[0].amount} books</strong>.{' '}
                <strong>{groups[1].name}</strong> collected <strong>{groups[1].amount} books</strong>.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '40px',
                margin: '15px 0'
              }}>
                {groups.map((group, idx) => (
                  <div key={idx} style={{
                    textAlign: 'center',
                    padding: '15px',
                    background: '#FFF',
                    borderRadius: '8px',
                    border: '2px solid #FFB74D'
                  }}>
                    <div style={{ fontSize: '14pt', fontWeight: 'bold', color: '#E65100', marginBottom: '10px' }}>
                      {group.name}
                    </div>
                    <div style={{ fontSize: '28pt', fontWeight: 'bold', color: '#333' }}>
                      {group.amount}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Sub-question a) - Who collected more */}
        {inputA && (
          <div style={{ fontSize: '14pt', margin: '12px 0', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span><strong>a)</strong> Which {groups[0]?.name?.includes('Class') ? 'class' : groups[0]?.name?.includes('Team') ? 'team' : 'person'} collected <strong>more</strong>?</span>
            <input
              type="text"
              value={answers[inputA.subId] || ''}
              onChange={(e) => onAnswerChange(inputA.subId, e.target.value)}
              disabled={submitted}
              style={{
                width: '120px',
                height: '40px',
                border: '3px solid #333',
                borderRadius: '8px',
                background: '#FFF',
                textAlign: 'center',
                fontSize: '16pt',
                fontWeight: 'bold'
              }}
              placeholder="?"
              autoComplete="off"
            />
          </div>
        )}

        {/* Sub-question b) - Write using a symbol */}
        {inputB && groups.length >= 2 && (
          <div style={{ fontSize: '14pt', margin: '12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span><strong>b)</strong> Write using a symbol:</span>
            <span style={{
              background: '#FFF',
              border: '2px solid #333',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '18pt',
              fontWeight: 'bold'
            }}>{groups[0].amount}</span>
            <input
              type="text"
              value={answers[inputB.subId] || ''}
              onChange={(e) => onAnswerChange(inputB.subId, e.target.value)}
              disabled={submitted}
              style={{
                width: '50px',
                height: '40px',
                border: '3px dashed #FF9800',
                borderRadius: '8px',
                background: '#FFF9C4',
                textAlign: 'center',
                fontSize: '18pt',
                fontWeight: 'bold'
              }}
              placeholder="?"
              autoComplete="off"
            />
            <span style={{
              background: '#FFF',
              border: '2px solid #333',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '18pt',
              fontWeight: 'bold'
            }}>{groups[1].amount}</span>
          </div>
        )}

        {/* Sub-question c) - How many more */}
        {inputC && (
          <div style={{ fontSize: '14pt', margin: '12px 0', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span><strong>c)</strong> How many more did {expectedName || groups[0]?.name} collect?</span>
            <input
              type="text"
              value={answers[inputC.subId] || ''}
              onChange={(e) => onAnswerChange(inputC.subId, e.target.value)}
              disabled={submitted}
              style={{
                width: '60px',
                height: '40px',
                border: '3px solid #333',
                borderRadius: '8px',
                background: '#FFF',
                textAlign: 'center',
                fontSize: '18pt',
                fontWeight: 'bold'
              }}
              placeholder="?"
              autoComplete="off"
            />
          </div>
        )}

        {/* Custom feedback for Q5 */}
        {submitted && q5Correct !== null && (
          <p className={`text-center font-semibold mt-2 ${q5Correct ? 'text-green-600' : 'text-red-600'}`}>
            {q5Correct ? '✓ Correct!' : '✗ Check your answers.'}
          </p>
        )}
      </div>
    )
  }

  // Special rendering for Ordering questions (smallest to largest)
  const renderOrderingQuestion = () => {
    const html = question.questionHTML

    // Check if this is an ordering question
    if (!html.includes('order-row') && !html.includes('order-answer') && !html.includes('number-cards')) {
      return null
    }

    // Extract question text and strip HTML tags
    const questionTextMatch = html.match(/<p[^>]*class="[^"]*question-text[^"]*"[^>]*>.*?<span[^>]*class="[^"]*question-number[^"]*"[^>]*>([^<]+)<\/span>([\s\S]*?)<\/p>/i)
    // Strip HTML tags from the question text
    const questionText = questionTextMatch ? questionTextMatch[2].replace(/<[^>]+>/g, '') : ' Write these numbers in order.'

    // Determine order direction
    const isSmallestToLargest = html.toLowerCase().includes('smallest') && html.toLowerCase().includes('largest')
    const isLargestToSmallest = html.toLowerCase().includes('largest') && html.toLowerCase().includes('smallest') &&
                                html.indexOf('largest') < html.indexOf('smallest')

    // Extract number cards
    const numberCards: string[] = []
    const cardRegex = /<div[^>]*class="[^"]*number-card[^"]*"[^>]*>(\d+)<\/div>/gi
    let cardMatch
    while ((cardMatch = cardRegex.exec(html)) !== null) {
      numberCards.push(cardMatch[1])
    }

    const boxCount = question.inputs.length || numberCards.length

    // Calculate expected order based on direction
    const expectedOrder = [...numberCards]
      .map(n => parseInt(n))
      .sort((a, b) => isLargestToSmallest ? b - a : a - b)
      .map(n => String(n))

    console.log(`🔢 Q${question.id} Ordering: Expected order:`, expectedOrder, isLargestToSmallest ? '(largest to smallest)' : '(smallest to largest)')

    // Custom validation for Q4
    const validateQ4 = () => {
      const userAnswers = question.inputs.map(f => (answers[f.subId] || '').trim())
      return userAnswers.every((ans, idx) => ans === expectedOrder[idx])
    }

    const q4Correct = submitted ? validateQ4() : null

    return (
      <div>
        <p className="text-lg mb-2">
          <span className="font-bold">{questionTextMatch ? questionTextMatch[1] : `${question.id}.`}</span>
          {questionText}
        </p>

        {/* Number cards to order */}
        {numberCards.length > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            margin: '15px 0',
            flexWrap: 'wrap'
          }}>
            {numberCards.map((num, idx) => (
              <div key={idx} style={{
                background: 'linear-gradient(180deg, #BBDEFB 0%, #90CAF9 100%)',
                border: '3px solid #1976D2',
                borderRadius: '10px',
                padding: '15px 20px',
                fontSize: '22pt',
                fontWeight: 'bold',
                color: '#0D47A1',
                boxShadow: '3px 3px 0 #0D47A1'
              }}>
                {num}
              </div>
            ))}
          </div>
        )}

        {/* Order answer boxes */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          margin: '15px 0',
          flexWrap: 'wrap'
        }}>
          {question.inputs.map((field, idx) => (
            <React.Fragment key={field.subId}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                {idx === 0 && (
                  <span style={{ fontSize: '10pt', color: '#666', fontWeight: 'bold' }}>
                    {isLargestToSmallest ? 'Largest' : 'Smallest'}
                  </span>
                )}
                {idx === question.inputs.length - 1 && (
                  <span style={{ fontSize: '10pt', color: '#666', fontWeight: 'bold' }}>
                    {isLargestToSmallest ? 'Smallest' : 'Largest'}
                  </span>
                )}
                <input
                  type="text"
                  value={answers[field.subId] || ''}
                  onChange={(e) => onAnswerChange(field.subId, e.target.value)}
                  disabled={submitted}
                  style={{
                    width: '60px',
                    height: '50px',
                    border: '3px solid #333',
                    borderRadius: '8px',
                    background: '#FFF',
                    textAlign: 'center',
                    fontSize: '18pt',
                    fontWeight: 'bold'
                  }}
                  placeholder="?"
                  autoComplete="off"
                />
              </div>
              {idx < question.inputs.length - 1 && (
                <span style={{ fontSize: '20pt', color: '#4CAF50' }}>→</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Custom feedback for Q4 */}
        {submitted && q4Correct !== null && (
          <p className={`text-center font-semibold mt-2 ${q4Correct ? 'text-green-600' : 'text-red-600'}`}>
            {q4Correct ? '✓ Correct!' : '✗ Check your ordering.'}
          </p>
        )}
      </div>
    )
  }

  // Special rendering for Place Value Table questions (Tens/Ones)
  const renderPlaceValueTableQuestion = () => {
    const html = question.questionHTML

    // Check if this is a place-value table question (has pv-table class and answer-cell)
    if (!html.includes('pv-table') || !html.includes('answer-cell')) {
      return null
    }

    // Extract question number
    const questionNumMatch = html.match(/<span[^>]*class="[^"]*question-number[^"]*"[^>]*>([^<]+)<\/span>/i)

    // Extract the number being analyzed (e.g., "91" from "How many tens and ones are in 91?")
    const numberMatch = html.match(/in\s+<strong>(\d+)<\/strong>/i) || html.match(/in\s+(\d+)/i)

    // Extract question text (everything before the table)
    const questionTextMatch = html.match(/<p[^>]*class="[^"]*question-text[^"]*"[^>]*>([\s\S]*?)<\/p>/i)
    let questionTextContent = ''
    if (questionTextMatch) {
      // Remove the question number span and get just the text
      questionTextContent = questionTextMatch[1]
        .replace(/<span[^>]*class="[^"]*question-number[^"]*"[^>]*>[^<]*<\/span>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .trim()
    }

    // Extract table headers (could be "Tens/Ones" or "Hundreds/Tens/Ones")
    const headerMatches = Array.from(html.matchAll(/<th[^>]*>([^<]+)<\/th>/gi))
    const headers = headerMatches.map(m => m[1].trim())

    // Get the inputs for this question (should match the number of answer cells)
    const inputsForTable = question.inputs.filter(input =>
      input.subId.startsWith(String(question.id))
    )

    // If we don't have matching inputs for headers, fall back
    if (headers.length === 0 || inputsForTable.length < headers.length) {
      return null
    }

    return (
      <div className="p-4 rounded-lg" style={{ backgroundColor: '#fef9c3' }}>
        <p className="text-lg mb-4">
          <span className="font-bold">{questionNumMatch ? questionNumMatch[1] : `${question.id}.`}</span>{' '}
          {questionTextContent || 'How many tens and ones?'}
        </p>

        {/* Place Value Table with inputs inside cells */}
        <div className="flex justify-center">
          <table className="border-collapse" style={{ minWidth: '200px' }}>
            <thead>
              <tr>
                {headers.map((header, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-3 text-center font-bold text-white"
                    style={{
                      backgroundColor: idx === 0 ? '#3b82f6' : '#facc15',
                      color: idx === 0 ? 'white' : '#1f2937',
                      minWidth: '80px'
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {headers.map((_, idx) => (
                  <td
                    key={idx}
                    className="border-2 border-dashed border-yellow-400 p-2 text-center"
                    style={{ backgroundColor: '#fefce8', minWidth: '80px', minHeight: '50px' }}
                  >
                    <QuestionInput
                      field={inputsForTable[idx] || {
                        subId: `${question.id}-${idx}`,
                        placeholder: '?',
                        inputType: 'text',
                        style: { width: '50px', borderStyle: 'solid' }
                      }}
                      value={answers[inputsForTable[idx]?.subId || ''] || ''}
                      onChange={onAnswerChange}
                      disabled={submitted}
                      isCorrect={isCorrect}
                      showFeedback={submitted}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
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

    // Note: We keep the original HTML structure intact here.
    // The CSS in the container handles inline flow for inputs.

    // Debug: Log what we're working with
    console.log(`🔍 Q${question.id} renderQuestionWithInputs:`, {
      inputCount: question.inputs.length,
      inputSubIds: question.inputs.map(f => f.subId),
      hasPlaceholderAttr: htmlContent.includes('data-input-placeholder'),
      htmlSnippet: htmlContent.substring(0, 200)
    })

    // Replace each placeholder with a unique marker
    // Try multiple patterns to be robust against browser DOM normalization
    question.inputs.forEach(field => {
      // Pattern 1: Standard span placeholder (from parser)
      const placeholderRegex1 = new RegExp(`<span[^>]*?data-input-placeholder="${field.subId}"[^>]*?>\\s*</span>`, 'gi')
      // Pattern 2: Self-closing or with whitespace variations
      const placeholderRegex2 = new RegExp(`<span[^>]*?data-input-placeholder="${field.subId}"[^>]*?>([^<]*)</span>`, 'gi')
      // Pattern 3: Div placeholder (fallback)
      const placeholderRegex3 = new RegExp(`<div[^>]*?data-input-placeholder="${field.subId}"[^>]*?>\\s*</div>`, 'gi')
      
      // Try each pattern
      if (placeholderRegex1.test(htmlContent)) {
        htmlContent = htmlContent.replace(new RegExp(`<span[^>]*?data-input-placeholder="${field.subId}"[^>]*?>\\s*</span>`, 'gi'), `___INPUT_PLACEHOLDER_${field.subId}___`)
        console.log(`  ✅ Pattern 1 matched for ${field.subId}`)
      } else if (placeholderRegex2.test(htmlContent)) {
        htmlContent = htmlContent.replace(new RegExp(`<span[^>]*?data-input-placeholder="${field.subId}"[^>]*?>([^<]*)</span>`, 'gi'), `___INPUT_PLACEHOLDER_${field.subId}___`)
        console.log(`  ✅ Pattern 2 matched for ${field.subId}`)
      } else if (placeholderRegex3.test(htmlContent)) {
        htmlContent = htmlContent.replace(new RegExp(`<div[^>]*?data-input-placeholder="${field.subId}"[^>]*?>\\s*</div>`, 'gi'), `___INPUT_PLACEHOLDER_${field.subId}___`)
        console.log(`  ✅ Pattern 3 matched for ${field.subId}`)
      } else {
        console.log(`  ❌ No pattern matched for ${field.subId}`)
      }
    })
    
    const placeholdersInserted = htmlContent.includes('___INPUT_PLACEHOLDER_')
    console.log(`  📊 Result: ${placeholdersInserted ? 'Placeholders found' : 'NO placeholders - trying answer-box fallback'}`)
    
    // FALLBACK: If no placeholders found, try to replace answer-box elements directly
    if (!placeholdersInserted && question.inputs.length > 0) {
      console.log(`  🔧 Fallback: Replacing answer-box elements directly`)
      // Reset htmlContent
      htmlContent = question.questionHTML
      let inputIdx = 0
      
      // Replace answer-box and answer-box-small spans/divs with placeholders
      const answerBoxPattern = /<(div|span)[^>]*class="[^"]*answer-box[^"]*"[^>]*>[\s\S]*?<\/\1>/gi
      htmlContent = htmlContent.replace(answerBoxPattern, () => {
        if (inputIdx < question.inputs.length) {
          const subId = question.inputs[inputIdx].subId
          inputIdx++
          console.log(`    → Replaced answer-box with placeholder for ${subId}`)
          return `___INPUT_PLACEHOLDER_${subId}___`
        }
        return '' // Remove extra answer-boxes
      })
      
      console.log(`  📊 Fallback result: ${inputIdx} replacements made`)
    }

    // Split by placeholders
    const parts = htmlContent.split(/___INPUT_PLACEHOLDER_([^_]+)___/)

    // Build the content by replacing placeholders with input HTML markers
    // Then render the entire thing with dangerouslySetInnerHTML for proper inline flow
    // And use React portals or refs to inject actual inputs

    // Handle case where no placeholders were replaced
    const hasPlaceholders = question.inputs.length > 0 &&
      question.inputs.some(f => htmlContent.includes(`___INPUT_PLACEHOLDER_${f.subId}___`))

    // Use refs to render HTML only once and manage DOM directly
    const containerRef = useRef<HTMLDivElement>(null)
    const htmlContentRef = useRef<HTMLDivElement>(null)
    const isInitializedRef = useRef(false)

    // Build HTML with input elements
    const buildInitialHTML = () => {
      let html = htmlContent
      question.inputs.forEach(field => {
        const placeholder = `___INPUT_PLACEHOLDER_${field.subId}___`
        // Use consistent sizing for all inline inputs - ignore parser widths
        const inputHTML = `<input
          type="text"
          data-subid="${field.subId}"
          placeholder="?"
          style="
            display: inline-block;
            width: 95px;
            min-width: 95px;
            height: 37px;
            padding: 4px;
            font-size: 13pt;
            font-weight: bold;
            text-align: center;
            border: 2px solid #333;
            border-radius: 5px;
            background-color: #FFF9C4;
            vertical-align: middle;
            margin: 0 2px;
            outline: none;
          "
        />`
        html = html.replace(placeholder, inputHTML)
      })
      return html
    }

    // Initialize HTML only once
    useEffect(() => {
      if (htmlContentRef.current && !isInitializedRef.current) {
        htmlContentRef.current.innerHTML = buildInitialHTML()
        isInitializedRef.current = true
      }
    }, []) // Empty deps - run only on mount

    // Sync input styles when submission state changes
    useEffect(() => {
      if (!containerRef.current) return

      const inputs = containerRef.current.querySelectorAll('input[data-subid]') as NodeListOf<HTMLInputElement>
      inputs.forEach(input => {
        if (submitted) {
          input.disabled = true
          input.style.backgroundColor = isCorrect ? '#F0FDF4' : '#FEF2F2'
          input.style.borderColor = isCorrect ? '#22C55E' : '#EF4444'
        }
      })
    }, [submitted, isCorrect])

    // Handle input events via delegation - update React state
    const handleContainerInput = (e: React.FormEvent<HTMLDivElement>) => {
      const target = e.target as HTMLInputElement
      if (target.tagName === 'INPUT' && target.dataset.subid) {
        // Update border color immediately for visual feedback
        target.style.borderColor = target.value ? '#2196F3' : '#333'
        // Update React state
        onAnswerChange(target.dataset.subid, target.value)
      }
    }

    return (
      <div
        className="question-content-inline"
        onInput={handleContainerInput}
        ref={containerRef}
      >
        <style>{`
          .question-content-inline {
            line-height: 2;
          }
          .question-content-inline p {
            margin: 6px 0;
          }
          .question-content-inline input:focus {
            border-color: #2196F3 !important;
            box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
          }
        `}</style>

        {/* Use ref to set HTML only once - prevents React from replacing DOM on re-render */}
        <div ref={htmlContentRef} />

        {/* If no placeholders were found, render inputs at end */}
        {!hasPlaceholders && question.inputs.length > 0 && (
          <div style={{ marginTop: '15px' }}>
            {question.inputs.map((field) => (
              <QuestionInput
                key={field.subId}
                field={{
                  ...field,
                  style: {
                    ...field.style,
                    isAnswerBox: true,
                    backgroundColor: '#FFF9C4'
                  }
                }}
                value={answers[field.subId] || ''}
                onChange={onAnswerChange}
                disabled={submitted}
                isCorrect={isCorrect}
                showFeedback={submitted}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  // Try specialized renderers first, then fall back to general rendering
  // Order matters: more specific types first
  const rainbowBondsContent = question.questionType === 'rainbow-bonds' ? renderRainbowBondsQuestion() : null
  const bondGridContent = question.questionType === 'bond-grid' ? renderBondGridQuestion() : null
  const factFamilyContent = question.factFamilyData ? renderFactFamilyQuestion() : null
  const equationRowContent = question.equationRowData ? renderVisualContentWithEquation() : null
  const numberSequenceContent = question.questionType === 'number-sequence' ? renderNumberSequenceQuestion() : null
  const letterMatchingContent = question.questionType === 'matching' ? renderLetterMatchingQuestion() : null
  const matchingContent = question.questionType === 'matching' && !letterMatchingContent ? renderMatchingQuestion() : null
  const oneMoreLessContent = question.questionType === 'one-more-less' ? renderOneMoreLessQuestion() : null
  const placeValueTableContent = renderPlaceValueTableQuestion()

  // Year 2 Comparing Numbers specialized renderers (these have custom validation)
  const blockComparisonContent = renderBlockComparisonQuestion()
  const openEndedContent = renderOpenEndedQuestion()
  const symbolComparisonContent = renderSymbolComparisonQuestion()
  const wordProblemContent = renderWordProblemQuestion()
  const orderingContent = renderOrderingQuestion()

  // Track if a renderer with custom validation is being used
  // These renderers have their own feedback - don't show parent feedback
  const usesCustomValidation = !!(blockComparisonContent || openEndedContent || symbolComparisonContent || wordProblemContent || orderingContent)

  return (
    <div>
      {rainbowBondsContent || bondGridContent || factFamilyContent || equationRowContent || numberSequenceContent || letterMatchingContent || matchingContent || oneMoreLessContent || placeValueTableContent || blockComparisonContent || openEndedContent || symbolComparisonContent || wordProblemContent || orderingContent || renderQuestionWithInputs()}

      {/* Feedback after submission - only show if NOT using custom validation renderer */}
      {submitted && feedback && !usesCustomValidation && (
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
