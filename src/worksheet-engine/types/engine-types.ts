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
  // Golden Reference commands
  createGolden?: boolean
  updateGoldenSet?: boolean
  listGolden?: boolean
  deleteGolden?: boolean
  validateGolden?: boolean
  approve?: boolean
  source?: string
  batchApproved?: string
  filter?: string
  // A/B Testing commands
  abTest?: boolean
  batchTest?: boolean
  regressionTest?: boolean
  variants?: string
  iterations?: number
  parallel?: boolean
  baselineDir?: string
  newVariant?: string
  configSet?: string
  configFile?: string
  // Quality Gates commands
  qualityGates?: boolean
  validateDeployment?: boolean
  batchQualityGates?: boolean
  customThresholds?: string
  skipRegression?: boolean
  skipGolden?: boolean
  // Reporting commands
  generateReport?: boolean
  reportType?: string
  timeRange?: string
  compare?: boolean
  aggregateResults?: boolean
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

// Golden Reference System Types

export interface GoldenReferenceMetadata {
  referenceId: string
  config: {
    layout: string
    yearGroup: string
    topic: string
    subtopic: string
    difficulty: string
    questionCount: number
  }
  qualityScores: QualityScores
  approvalInfo: {
    approvedBy: string
    approvedDate: string
    approvalNotes: string
  }
  version: string
  createdFrom: string
}

export interface GoldenReference {
  metadata: GoldenReferenceMetadata
  pdfPath: string
  htmlPath?: string
}

// A/B Testing Types

export interface ABTestConfig {
  testName: string
  configurations: string[]
  promptVariants: Record<string, string>
  testSettings: {
    iterations: number
    parallelExecution: boolean
    qualityThreshold: number
    statisticalSignificance: number
  }
}

export interface ABTestVariantResult {
  averageScore: number
  standardDeviation: number
  iterations: number
  scores: number[]
}

export interface ABTestResult {
  testId: string
  timestamp: string
  configuration: string
  variants: Record<string, ABTestVariantResult>
  statisticalAnalysis: {
    significant: boolean
    pValue: number
    confidenceLevel: number
    effectSize: number
  }
  recommendation: string
  winner: string
}

export interface BatchTestConfig {
  batchName: string
  configurations: string[]
  variants: string[]
  parallelExecution: boolean
  outputDir: string
}

// Quality Gates Types

export interface QualityGateConfig {
  minimumComposite: number
  minimumPerDimension: {
    visualSimilarity: number
    contentAnalysis: number
    ruleBasedLayout: number
  }
  regressionThreshold: number
  approvalRequired: boolean
}

export interface QualityGateResult {
  passed: boolean
  failedChecks: string[]
  scores: QualityScores
  thresholds: QualityGateConfig
}