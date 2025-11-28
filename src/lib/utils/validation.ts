/**
 * Validation utilities for worksheet generation
 * Centralized validation logic with detailed error reporting
 */

import { ValidationError, WorksheetValidationResult, LayoutType } from '@/lib/types/worksheet'

export const VALIDATION_RULES = {
  QUESTION_COUNT: { min: 5, max: 30 },
  TOPIC_MIN_LENGTH: 3,
  SUBTOPIC_MIN_LENGTH: 3,
  DIFFICULTY_LEVELS: ['easy', 'average', 'hard'] as const,
  LAYOUT_TYPES: ['standard', 'fluency', 'grid', 'differentiated', 'reasoning'] as const,
  YEAR_GROUPS: ['Reception', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'] as const,
  STUDENT_NAMES_MIN_COUNT: 1,
  STUDENT_NAME_MAX_LENGTH: 50
} as const

/**
 * Validates worksheet generation request parameters
 */
export function validateWorksheetRequest(body: unknown): WorksheetValidationResult {
  const errors: ValidationError[] = []
  const bodyData = body as Record<string, unknown>

  // Check required fields
  const requiredFields = ['layout', 'topic', 'subtopic', 'difficulty', 'questionCount', 'yearGroup']
  for (const field of requiredFields) {
    if (!bodyData[field]) {
      errors.push({
        field,
        message: `${field} is required`,
        code: 'REQUIRED_FIELD_MISSING'
      })
    }
  }

  // Validate layout
  if (bodyData.layout && typeof bodyData.layout !== 'string') {
    errors.push({
      field: 'layout',
      message: 'Layout must be a string',
      code: 'INVALID_TYPE'
    })
  } else if (bodyData.layout && !VALIDATION_RULES.LAYOUT_TYPES.includes(bodyData.layout as LayoutType)) {
    errors.push({
      field: 'layout',
      message: `Layout must be one of: ${VALIDATION_RULES.LAYOUT_TYPES.join(', ')}`,
      code: 'INVALID_VALUE'
    })
  }

  // Validate topic
  if (bodyData.topic && typeof bodyData.topic !== 'string') {
    errors.push({
      field: 'topic',
      message: 'Topic must be a string',
      code: 'INVALID_TYPE'
    })
  } else if (bodyData.topic && typeof bodyData.topic === 'string' && bodyData.topic.length < VALIDATION_RULES.TOPIC_MIN_LENGTH) {
    errors.push({
      field: 'topic',
      message: `Topic must be at least ${VALIDATION_RULES.TOPIC_MIN_LENGTH} characters`,
      code: 'INVALID_LENGTH'
    })
  }

  // Validate subtopic
  if (bodyData.subtopic && typeof bodyData.subtopic !== 'string') {
    errors.push({
      field: 'subtopic',
      message: 'Subtopic must be a string',
      code: 'INVALID_TYPE'
    })
  } else if (bodyData.subtopic && typeof bodyData.subtopic === 'string' && bodyData.subtopic.length < VALIDATION_RULES.SUBTOPIC_MIN_LENGTH) {
    errors.push({
      field: 'subtopic',
      message: `Subtopic must be at least ${VALIDATION_RULES.SUBTOPIC_MIN_LENGTH} characters`,
      code: 'INVALID_LENGTH'
    })
  }

  // Validate difficulty
  if (bodyData.difficulty && !VALIDATION_RULES.DIFFICULTY_LEVELS.includes(bodyData.difficulty as 'easy' | 'average' | 'hard')) {
    errors.push({
      field: 'difficulty',
      message: `Difficulty must be one of: ${VALIDATION_RULES.DIFFICULTY_LEVELS.join(', ')}`,
      code: 'INVALID_VALUE'
    })
  }

  // Validate question count
  if (bodyData.questionCount) {
    const count = parseInt(String(bodyData.questionCount))
    if (isNaN(count)) {
      errors.push({
        field: 'questionCount',
        message: 'Question count must be a valid number',
        code: 'INVALID_TYPE'
      })
    } else if (count < VALIDATION_RULES.QUESTION_COUNT.min || count > VALIDATION_RULES.QUESTION_COUNT.max) {
      errors.push({
        field: 'questionCount',
        message: `Question count must be between ${VALIDATION_RULES.QUESTION_COUNT.min} and ${VALIDATION_RULES.QUESTION_COUNT.max}`,
        code: 'OUT_OF_RANGE'
      })
    }
  }

  // Validate yearGroup
  if (bodyData.yearGroup) {
    if (typeof bodyData.yearGroup !== 'string') {
      errors.push({
        field: 'yearGroup',
        message: 'Year group must be a string',
        code: 'INVALID_TYPE'
      })
    } else if (!VALIDATION_RULES.YEAR_GROUPS.includes(bodyData.yearGroup as typeof VALIDATION_RULES.YEAR_GROUPS[number])) {
      errors.push({
        field: 'yearGroup',
        message: `Year group must be one of: ${VALIDATION_RULES.YEAR_GROUPS.join(', ')}`,
        code: 'INVALID_VALUE'
      })
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validates student names array
 */
export function validateStudentNames(studentNames: string[]): WorksheetValidationResult {
  const errors: ValidationError[] = []

  if (!Array.isArray(studentNames)) {
    errors.push({
      field: 'studentNames',
      message: 'Student names must be an array',
      code: 'INVALID_TYPE'
    })
    return { isValid: false, errors }
  }

  if (studentNames.length < VALIDATION_RULES.STUDENT_NAMES_MIN_COUNT) {
    errors.push({
      field: 'studentNames',
      message: `At least ${VALIDATION_RULES.STUDENT_NAMES_MIN_COUNT} student name is required`,
      code: 'INSUFFICIENT_NAMES'
    })
  }

  // Validate each name
  studentNames.forEach((name, index) => {
    if (typeof name !== 'string') {
      errors.push({
        field: `studentNames[${index}]`,
        message: 'Student name must be a string',
        code: 'INVALID_TYPE'
      })
    } else if (name.trim().length === 0) {
      errors.push({
        field: `studentNames[${index}]`,
        message: 'Student name cannot be empty',
        code: 'EMPTY_NAME'
      })
    } else if (name.length > VALIDATION_RULES.STUDENT_NAME_MAX_LENGTH) {
      errors.push({
        field: `studentNames[${index}]`,
        message: `Student name cannot exceed ${VALIDATION_RULES.STUDENT_NAME_MAX_LENGTH} characters`,
        code: 'NAME_TOO_LONG'
      })
    }
  })

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validates generated HTML content structure
 */
export function validateGeneratedHTML(html: string): WorksheetValidationResult {
  const errors: ValidationError[] = []

  if (!html || typeof html !== 'string') {
    errors.push({
      field: 'html',
      message: 'Generated HTML must be a non-empty string',
      code: 'INVALID_HTML'
    })
    return { isValid: false, errors }
  }

  // Check for required structure elements based on actual layout template structure
  const requiredElements = [
    { element: '<div class="worksheet-header">', description: 'worksheet header' },
    { element: '<div class="worksheet-content">', description: 'worksheet content' },
    { element: '<title>', description: 'HTML title' },
    { element: '<body>', description: 'HTML body' }
  ]

  for (const { element, description } of requiredElements) {
    if (!html.includes(element)) {
      errors.push({
        field: 'html',
        message: `Generated HTML missing required ${description}`,
        code: 'MISSING_STRUCTURE'
      })
    }
  }

  // Check for potential security issues (basic XSS prevention)
  // More specific patterns to avoid false positives with legitimate CSS
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /\son\w+\s*=/gi  // Only match event handlers as HTML attributes (with leading space)
  ]

  for (const pattern of dangerousPatterns) {
    if (pattern.test(html)) {
      errors.push({
        field: 'html',
        message: 'Generated HTML contains potentially dangerous content',
        code: 'SECURITY_VIOLATION'
      })
      break
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Sanitizes and normalizes input data
 */
export function sanitizeWorksheetRequest(body: unknown): unknown {
  const bodyData = body as Record<string, unknown>
  return {
    layout: typeof bodyData.layout === 'string' ? bodyData.layout.trim().toLowerCase() : bodyData.layout,
    topic: typeof bodyData.topic === 'string' ? bodyData.topic.trim().toLowerCase() : bodyData.topic,
    subtopic: typeof bodyData.subtopic === 'string' ? bodyData.subtopic.trim().toLowerCase() : bodyData.subtopic,
    difficulty: typeof bodyData.difficulty === 'string' ? bodyData.difficulty.trim().toLowerCase() : bodyData.difficulty,
    questionCount: parseInt(String(bodyData.questionCount)),
    nameList: typeof bodyData.nameList === 'string' ? bodyData.nameList.trim() : bodyData.nameList,
    yearGroup: typeof bodyData.yearGroup === 'string' ? bodyData.yearGroup.trim() : bodyData.yearGroup,
    // Enhanced configuration options (USP.2)
    visualTheme: typeof bodyData.visualTheme === 'string' ? bodyData.visualTheme.trim() : bodyData.visualTheme,
    // Region for currency/measurement specific content (money, coins)
    region: typeof bodyData.region === 'string' ? bodyData.region.trim().toUpperCase() : bodyData.region,
    // Cross-iteration freshness tracking
    previousWorksheets: Array.isArray(bodyData.previousWorksheets) ? bodyData.previousWorksheets : undefined
  }
}