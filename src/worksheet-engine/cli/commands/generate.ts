/**
 * Generate worksheet command implementation for worksheet engine CLI
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

import { generateWorksheet } from '@/lib/services/gemini'
import { parseConfigId, validateConfig } from '../utils/config-parser'
import { OutputManager } from '../utils/output-manager'
import { mapEngineConfigToWorksheetConfig, validateServiceCompatibility } from '../../integration/config-mapper'
import { CliError, GenerationResult, AssessmentContext } from '../types/engine-types'
import { Logger } from '../../utils/logger'
// import { AssessmentRunner } from '../../assessment' // Temporarily disabled due to missing deps

export async function generateWorksheetCommand(
  configId: string,
  promptVariant: string = 'baseline',
  outputDir?: string,
  enableAssessment?: boolean,
  goldenReferencePath?: string
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
    
    // Step 5: Run quality assessment if requested
    if (enableAssessment) {
      Logger.separator()
      Logger.step(5, 5, 'Running quality assessment...')
      
      // Assessment temporarily disabled due to missing dependencies
      /*
      try {
        const assessmentContext: AssessmentContext = {
          worksheetPdfPath: result.outputPath.replace('.html', '.pdf'),
          worksheetHtmlPath: result.outputPath,
          config: engineConfig,
          options: {
            enableVisualSimilarity: !!goldenReferencePath,
            enableContentAnalysis: true,
            enableRuleBasedLayout: true,
            goldenReferencePath,
            qualityThreshold: 7.0
          }
        }

        const assessmentRunner = new AssessmentRunner(assessmentContext)
        const assessmentResult = await assessmentRunner.runAssessment()
        
        // Save assessment results
        const assessmentReportPath = await assessmentRunner.saveResults(assessmentResult, finalOutputDir)
        
        // Display assessment summary
        Logger.separator()
        Logger.success('Quality assessment completed!')
        Logger.info(`Composite Score: ${assessmentResult.scores.composite}/10`)
        Logger.info(`Quality Gate: ${assessmentResult.qualityGate}`)
        Logger.info(`Assessment Time: ${assessmentResult.assessmentTime}s`)
        
        if (assessmentResult.recommendations.length > 0) {
          Logger.info('\n📝 Recommendations:')
          assessmentResult.recommendations.forEach(rec => {
            Logger.info(`  • ${rec}`)
          })
        }
        
        Logger.info(`Assessment report: ${assessmentReportPath}`)
        
      } catch (assessmentError) {
        Logger.warn('Assessment failed, but generation was successful')
        console.error('Assessment error:', assessmentError)
      }
      */
      Logger.info('⚠️  Assessment system temporarily disabled - install missing dependencies to enable')
    }
    
    Logger.separator()
    Logger.success('Generation completed successfully!')
    Logger.info(`Processing time: ${processingTime}ms`)
    Logger.info(`Files saved to: ${finalOutputDir}`)
    Logger.separator()
    Logger.info('Output files:')
    Logger.info('  - config.json              # Input configuration')
    Logger.info('  - worksheet.html           # Generated HTML worksheet')
    Logger.info('  - worksheet.pdf            # Generated PDF')
    Logger.info('  - generation-log.json      # Generation metadata')
    Logger.info('  - engine-metadata.json     # Engine-specific metadata')
    if (enableAssessment) {
      Logger.info('  - assessment/              # Quality assessment results')
    }
    
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