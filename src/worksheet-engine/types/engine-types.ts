/**
 * Engine-specific type definitions for worksheet generation CLI
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

import { GeneratedWorksheet } from '@/lib/types/worksheet'

export interface EngineConfig {
  configId: string
  layout: string
  yearGroup: string
  topic: string
  subtopic: string
  difficulty: string
  questionCount: number
  promptVariant: string
}

export interface CliOptions {
  config?: string
  promptVariant?: string
  outputDir?: string
  help?: boolean
  listConfigs?: boolean
  assess?: boolean
  goldenRef?: string
}

export interface GenerationResult {
  worksheet: GeneratedWorksheet
  config: EngineConfig
  outputPath: string
  metadata: EngineMetadata
}

export interface EngineMetadata {
  configId: string
  generatedAt: string
  processingTime: number
  promptVariant: string
  serviceVersion: string
  outputDirectory: string
}

export interface OutputStructure {
  configJson: string
  worksheetHtml: string
  worksheetPdf: string
  generationLog: string
  engineMetadata: string
}

export interface ConfigMapping {
  [configId: string]: {
    layout: string
    yearGroup: string
    topic: string
    subtopic: string
    difficulty: string
    questionCount: number
  }
}

export interface CliError extends Error {
  code: 'CONFIG_NOT_FOUND' | 'INVALID_CONFIG' | 'GENERATION_FAILED' | 'OUTPUT_ERROR' | 'SERVICE_ERROR' | 'ASSESSMENT_FAILED'
  details?: unknown
}

// Quality Assessment Types

export interface QualityScores {
  visualSimilarity: VisualSimilarityScore
  contentAnalysis: ContentAnalysisScore
  ruleBasedLayout: RuleBasedLayoutScore
  composite: number
}

export interface VisualSimilarityScore {
  score: number
  details: {
    structuralSimilarity: number
    layoutConsistency: number
    visualAlignment: number
  }
}

export interface ContentAnalysisScore {
  score: number
  details: {
    curriculumAlignment: number
    languageAppropriate: number
    mathematicalAccuracy: number
  }
}

export interface RuleBasedLayoutScore {
  score: number
  details: {
    fontConsistency: number
    spacingQuality: number
    elementPositioning: number
  }
}

export interface QualityAssessmentResult {
  assessmentId: string
  timestamp: string
  config: string
  scores: QualityScores
  qualityGate: 'PASSED' | 'FAILED'
  recommendations: string[]
  assessmentTime: number
}

export interface AssessmentOptions {
  enableVisualSimilarity: boolean
  enableContentAnalysis: boolean
  enableRuleBasedLayout: boolean
  goldenReferencePath?: string
  qualityThreshold?: number
}

export interface AssessmentContext {
  worksheetPdfPath: string
  worksheetHtmlPath: string
  config: EngineConfig
  options: AssessmentOptions
}