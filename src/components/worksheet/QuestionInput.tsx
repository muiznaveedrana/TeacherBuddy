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

  // Base styles
  const baseStyles = {
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
    return disabled ? '#F3F4F6' : '#FFFFFF'
  }

  const inputStyles = {
    ...baseStyles,
    width: field.style?.width || '100%',
    border: typeof getBorderStyle() === 'string' ? getBorderStyle() : undefined,
    ...(typeof getBorderStyle() === 'object' ? getBorderStyle() : {}),
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
