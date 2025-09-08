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
  code: 'CONFIG_NOT_FOUND' | 'INVALID_CONFIG' | 'GENERATION_FAILED' | 'OUTPUT_ERROR' | 'SERVICE_ERROR'
  details?: unknown
}