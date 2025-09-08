/**
 * Prompt service wrapper for CLI engine integration
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

import { PromptService } from '@/lib/services/promptService'
import { WorksheetConfig } from '@/lib/types/worksheet'
import { EngineConfig, CliError } from '../types/engine-types'
import { mapEngineConfigToWorksheetConfig } from './config-mapper'

export class EnginePromptService {
  static async generatePrompt(engineConfig: EngineConfig): Promise<{ prompt: string; metadata: unknown }> {
    try {
      // Map engine config to worksheet config
      const worksheetConfig: WorksheetConfig = mapEngineConfigToWorksheetConfig(engineConfig)
      
      // Generate prompt using existing service
      const result = PromptService.generatePrompt(worksheetConfig, {
        forceEnhanced: true, // Always use enhanced mode for CLI
        iterativeCycle: 1,
        targetQuality: 4.5
      })

      return result
    } catch (error) {
      const cliError: CliError = new Error(`Failed to generate prompt: ${error instanceof Error ? error.message : 'Unknown error'}`) as CliError
      cliError.code = 'SERVICE_ERROR'
      cliError.details = { engineConfig, originalError: error }
      throw cliError
    }
  }
}