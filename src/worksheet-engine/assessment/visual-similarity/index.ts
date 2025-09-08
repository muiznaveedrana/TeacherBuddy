/**
 * Visual Similarity Module - Main exports for visual comparison assessment
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

// Main assessment interface
export { VisualSimilarityAssessment } from './visual-similarity-assessment'

// Core components
export { ImageComparator, type ImageComparisonResult, type ComparisonOptions } from './image-comparison'
export { PdfToImageConverter } from './pdf-to-image'
export { SimilarityCalculator, type SimilarityMetrics } from './similarity-metrics'