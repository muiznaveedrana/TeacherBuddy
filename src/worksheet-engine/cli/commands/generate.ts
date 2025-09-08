/**
 * Generate worksheet command implementation for worksheet engine CLI
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

import { generateWorksheet } from '@/lib/services/gemini'
import { parseConfigId, validateConfig } from '../utils/config-parser'
import { OutputManager } from '../utils/output-manager'
import { mapEngineConfigToWorksheetConfig, validateServiceCompatibility } from '../integration/config-mapper'
import { CliError, GenerationResult } from '../types/engine-types'
import { Logger } from '../../utils/logger'

export async function generateWorksheetCommand(
  configId: string,
  promptVariant: string = 'baseline',
  outputDir?: string
): Promise<GenerationResult> {
  const startTime = Date.now()
  
  try {
    Logger.info(`Generating worksheet with configuration: ${configId}`)
    Logger.info(`Prompt variant: ${promptVariant}`)
    Logger.separator()
    
    // Step 1: Parse and validate configuration
    Logger.step(1, 4, 'Parsing and validating configuration...')
    const engineConfig = parseConfigId(configId, promptVariant)
    validateConfig(engineConfig)
    validateServiceCompatibility(engineConfig)
    Logger.success('Configuration validated successfully')
    
    // Step 2: Set up output directory
    Logger.step(2, 4, 'Setting up output directory...')
    const finalOutputDir = outputDir || OutputManager.getDefaultOutputDir(configId)
    const outputManager = new OutputManager(finalOutputDir)
    Logger.info(`Output directory: ${finalOutputDir}`)
    
    // Step 3: Generate worksheet
    Logger.step(3, 4, 'Generating worksheet content...')
    const worksheetConfig = mapEngineConfigToWorksheetConfig(engineConfig)
    
    const worksheet = await generateWorksheet(worksheetConfig, {
      forceEnhanced: true,
      iterativeCycle: 1
    })
    Logger.success('Worksheet generated successfully')
    
    // Step 4: Save results
    Logger.step(4, 4, 'Saving results to output directory...')
    const processingTime = Date.now() - startTime
    const result = await outputManager.saveResults(worksheet, engineConfig, processingTime)
    
    Logger.separator()
    Logger.success('Generation completed successfully!')
    Logger.info(`Processing time: ${processingTime}ms`)
    Logger.info(`Files saved to: ${finalOutputDir}`)
    Logger.separator()
    Logger.info('Output files:')
    Logger.info('  - config.json              # Input configuration')
    Logger.info('  - worksheet.html           # Generated HTML worksheet')
    Logger.info('  - worksheet.pdf            # Generated PDF (placeholder)')
    Logger.info('  - generation-log.json      # Generation metadata')
    Logger.info('  - engine-metadata.json     # Engine-specific metadata')
    
    return result
    
  } catch (error) {
    const processingTime = Date.now() - startTime
    
    if (error instanceof Error && 'code' in error) {
      // Already a CliError, re-throw
      throw error
    }
    
    // Convert to CliError
    const cliError: CliError = new Error(
      `Worksheet generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    ) as CliError
    cliError.code = 'GENERATION_FAILED'
    cliError.details = { 
      configId, 
      promptVariant, 
      outputDir, 
      processingTime,
      originalError: error 
    }
    
    throw cliError
  }
}