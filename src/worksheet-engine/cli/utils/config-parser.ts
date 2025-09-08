/**
 * Configuration parsing utilities for worksheet engine CLI
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

import { EngineConfig, ConfigMapping, CliError } from '../../types/engine-types'
import { 
  WORKSHEET_CONFIG_PRESETS, 
  VALID_YEAR_GROUPS, 
  CONFIG_CONSTRAINTS 
} from '../../config/presets'

export function parseConfigId(configId: string, promptVariant: string = CONFIG_CONSTRAINTS.DEFAULT_PROMPT_VARIANT): EngineConfig {
  const mapping = WORKSHEET_CONFIG_PRESETS[configId]
  
  if (!mapping) {
    const error: CliError = new Error(`Configuration '${configId}' not found`) as CliError
    error.code = 'CONFIG_NOT_FOUND'
    error.details = { configId, availableConfigs: Object.keys(WORKSHEET_CONFIG_PRESETS) }
    throw error
  }

  return {
    configId,
    promptVariant,
    ...mapping
  }
}

export function listAvailableConfigs(): string[] {
  return Object.keys(WORKSHEET_CONFIG_PRESETS)
}

export function getConfigDetails(configId: string): ConfigMapping[string] | null {
  return WORKSHEET_CONFIG_PRESETS[configId] || null
}

export function validateConfig(config: EngineConfig): void {
  const requiredFields: (keyof EngineConfig)[] = [
    'configId', 'layout', 'yearGroup', 'topic', 
    'subtopic', 'difficulty', 'questionCount', 'promptVariant'
  ]

  const missingFields = requiredFields.filter(field => !config[field])
  
  if (missingFields.length > 0) {
    const error: CliError = new Error(`Invalid configuration: missing fields ${missingFields.join(', ')}`) as CliError
    error.code = 'INVALID_CONFIG'
    error.details = { missingFields, config }
    throw error
  }

  // Validate question count
  if (config.questionCount < CONFIG_CONSTRAINTS.MIN_QUESTION_COUNT || 
      config.questionCount > CONFIG_CONSTRAINTS.MAX_QUESTION_COUNT) {
    const error: CliError = new Error(
      `Question count must be between ${CONFIG_CONSTRAINTS.MIN_QUESTION_COUNT} and ${CONFIG_CONSTRAINTS.MAX_QUESTION_COUNT}`
    ) as CliError
    error.code = 'INVALID_CONFIG'
    error.details = { 
      questionCount: config.questionCount,
      constraints: {
        min: CONFIG_CONSTRAINTS.MIN_QUESTION_COUNT,
        max: CONFIG_CONSTRAINTS.MAX_QUESTION_COUNT
      }
    }
    throw error
  }

  // Validate year group format
  if (!VALID_YEAR_GROUPS.includes(config.yearGroup as typeof VALID_YEAR_GROUPS[number])) {
    const error: CliError = new Error(`Invalid year group: ${config.yearGroup}`) as CliError
    error.code = 'INVALID_CONFIG'
    error.details = { yearGroup: config.yearGroup, validYearGroups: [...VALID_YEAR_GROUPS] }
    throw error
  }
}