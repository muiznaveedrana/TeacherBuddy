'use client'

import { useState, useRef, useEffect } from 'react'
import type { InputField } from '@/lib/utils/structuredWorksheetParser'

interface QuestionInputProps {
  field: InputField
  value: string
  onChange: (subId: string, value: string) => void
  disabled?: boolean
  isCorrect?: boolean
  showFeedback?: boolean
}

/**
 * Controlled input component for worksheet questions
 *
 * CRITICAL: This is a fully controlled component that prevents all
 * flashing and focus issues by using React's controlled input pattern.
 * Value is stored in parent state, not DOM.
 */
export function QuestionInput({
  field,
  value,
  onChange,
  disabled = false,
  isCorrect,
  showFeedback = false
}: QuestionInputProps) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(field.subId, e.target.value)
  }

  // Check if this is an answer-box style input
  const isAnswerBoxStyle = field.style?.isAnswerBox || field.style?.isAnswerBoxSmall || field.style?.backgroundColor

  // Base styles - use answer-box styling if specified
  const baseStyles = isAnswerBoxStyle ? {
    padding: '8px',
    fontSize: field.style?.fontSize || '16pt',
    fontWeight: field.style?.fontWeight || 'bold',
    borderRadius: field.style?.borderRadius || '8px',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    textAlign: (field.style?.textAlign || 'center') as 'left' | 'center' | 'right'
  } : {
    padding: field.inputType === 'textarea' ? '10px' : '12px',
    fontSize: field.inputType === 'textarea' ? '14pt' : '18pt',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit'
  }

  // Border styles based on field type and feedback
  const getBorderStyle = () => {
    if (showFeedback) {
      return isCorrect
        ? '3px solid #22C55E' // Green for correct
        : '3px solid #EF4444' // Red for incorrect
    }

    // Use custom border if answer-box style
    if (isAnswerBoxStyle && field.style?.border) {
      return value
        ? '3px solid #2196F3' // Blue when filled
        : field.style.border // Original border when empty
    }

    if (field.style?.borderStyle === 'underline') {
      return {
        borderBottom: value ? '3px solid #2196F3' : '3px solid #333',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        background: 'transparent'
      }
    }

    return value
      ? '3px solid #2196F3' // Blue when filled
      : '3px solid #BFDBFE' // Light blue when empty
  }

  // Background color based on feedback
  const getBackgroundColor = () => {
    if (showFeedback) {
      return isCorrect ? '#F0FDF4' : '#FEF2F2' // Light green/red
    }
    // Use custom background if answer-box style
    if (isAnswerBoxStyle && field.style?.backgroundColor) {
      return field.style.backgroundColor
    }
    return disabled ? '#F3F4F6' : '#FFFFFF'
  }

  const borderStyle = getBorderStyle()
  const borderStyles = typeof borderStyle === 'object' ? borderStyle : {}
  
  // Answer-box style inputs get 140px width (+20px from original 120px)
  const inputStyles = {
    ...baseStyles,
    width: field.style?.width || (isAnswerBoxStyle ? '140px' : '100%'),
    minWidth: field.style?.minWidth || (isAnswerBoxStyle ? '140px' : undefined),
    height: field.style?.height || (isAnswerBoxStyle ? '42px' : undefined),
    border: typeof borderStyle === 'string' ? borderStyle : undefined,
    ...borderStyles,
    backgroundColor: getBackgroundColor(),
    outline: 'none',
    display: field.inputType === 'textarea' ? 'block' : 'inline-block'
  }

  const containerStyles = {
    display: 'inline-block',
    margin: field.inputType === 'textarea' ? '15px 0' : '0 4px',
    verticalAlign: 'middle'
  }

  return (
    <span style={containerStyles}>
      {field.label && (
        <label
          htmlFor={`input-${field.subId}`}
          style={{
            fontWeight: 'bold',
            fontSize: '14pt',
            marginRight: '8px',
            display: field.inputType === 'textarea' ? 'block' : 'inline',
            marginBottom: field.inputType === 'textarea' ? '8px' : '0'
          }}
        >
          {field.label}
        </label>
      )}

      {field.inputType === 'textarea' ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          id={`input-${field.subId}`}
          value={value || ''}
          onChange={handleChange}
          placeholder={field.placeholder}
          disabled={disabled}
          style={{
            ...inputStyles,
            minHeight: '80px',
            resize: 'vertical' as const,
            width: '100%'
          }}
          aria-label={field.label || field.placeholder}
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="text"
          id={`input-${field.subId}`}
          value={value || ''}
          onChange={handleChange}
          placeholder={field.placeholder}
          disabled={disabled}
          style={inputStyles}
          aria-label={field.label || field.placeholder}
        />
      )}
    </span>
  )
}
