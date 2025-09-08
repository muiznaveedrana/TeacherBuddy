/**
 * Assessment Module Main Exports
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

// Main assessment runner
export { AssessmentRunner } from './assessment-runner'

// Composite scoring
export { CompositeScorer } from './composite-scorer'

// Assessment modules
export { VisualSimilarityAssessment } from './visual-similarity/image-comparison'
export { ContentAnalysisAssessment } from './content-analysis'
export { RuleBasedLayoutAssessment } from './rule-based'

// Visual similarity utilities
export { SimilarityCalculator } from './visual-similarity/similarity-metrics'
export { PdfToImageConverter } from './visual-similarity/pdf-to-image'

// Type exports from engine types
export type {
  QualityScores,
  QualityAssessmentResult,
  AssessmentContext,
  AssessmentOptions,
  VisualSimilarityScore,
  ContentAnalysisScore,
  RuleBasedLayoutScore
} from '../types/engine-types'