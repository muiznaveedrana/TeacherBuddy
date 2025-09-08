/**
 * Configuration mapper to convert CLI configs to service configs
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

import { WorksheetConfig, LayoutType, DifficultyLevel } from '@/lib/types/worksheet'
import { EngineConfig } from '../types/engine-types'

export function mapEngineConfigToWorksheetConfig(engineConfig: EngineConfig): WorksheetConfig {
  return {
    layout: engineConfig.layout as LayoutType,
    yearGroup: engineConfig.yearGroup,
    topic: engineConfig.topic,
    subtopic: engineConfig.subtopic,
    difficulty: engineConfig.difficulty as DifficultyLevel,
    questionCount: engineConfig.questionCount,
    studentNames: [], // CLI engine uses default names from prompt service
    visualTheme: undefined // Let LLM decide when undefined
  }
}

export function validateServiceCompatibility(engineConfig: EngineConfig): void {
  // Validate that the engine config can be properly mapped to worksheet config
  const requiredMappings: (keyof EngineConfig)[] = [
    'layout', 'yearGroup', 'topic', 'subtopic', 'difficulty', 'questionCount'
  ]
  
  const missingMappings = requiredMappings.filter(field => !engineConfig[field])
  
  if (missingMappings.length > 0) {
    throw new Error(`Cannot map engine config to worksheet config: missing ${missingMappings.join(', ')}`)
  }
}