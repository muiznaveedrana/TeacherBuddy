/**
 * Core types for the worksheet generation system
 * Centralized type definitions for better maintainability and type safety
 */

export type DifficultyLevel = 'easy' | 'average' | 'hard'

export type QuestionType = 'word-problem' | 'calculation' | 'visual-problem'

export type LayoutType = 'standard' | 'fluency' | 'grid' | 'differentiated' | 'reasoning'

export interface LayoutTemplate {
  id: LayoutType
  name: string
  description: string
  icon: string
  features: string[]
  suitable: string[]
  questionRange?: { min: number; max: number }
}

export interface WorksheetConfig {
  layout: LayoutType // Layout selection drives template and configuration options
  topic: string
  subtopic: string
  difficulty: DifficultyLevel
  questionCount: number
  yearGroup: string // Mandatory for age-appropriate content
  studentNames: string[]
}

export interface GeneratedWorksheet {
  title: string
  html: string
  metadata: WorksheetMetadata
}

export interface WorksheetMetadata {
  topic: string
  subtopic: string
  difficulty: DifficultyLevel
  questionCount: number
  curriculum: string
  generatedAt: string
}

export interface CurriculumContext {
  topicName: string
  subtopicName: string
  ageGroup: string
  learningObjectives: string[]
  yearGroup: string
  complexity: string
  mathFocus: string
}

export interface WorksheetGenerationResult {
  success: boolean
  worksheet?: GeneratedWorksheet
  generationTime: number
  timestamp: string
  error?: string
  message?: string
}

// Validation types
export interface ValidationError {
  field: string
  message: string
  code: string
}

export interface WorksheetValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

// Performance tracking
export interface GenerationMetrics {
  startTime: number
  endTime: number
  duration: number
  promptLength: number
  responseLength: number
  success: boolean
  errorType?: string
}