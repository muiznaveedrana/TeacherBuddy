#!/usr/bin/env node

/**
 * Main CLI entry point for worksheet engine
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

import { CliOptions, CliError } from '../types/engine-types'
import { generateWorksheetCommand } from './commands/generate'
import { listConfigs } from './commands/list-configs'
import { showHelp } from './commands/help'
import { 
  createGoldenReference, 
  listGoldenReferences, 
  updateGoldenSet, 
  validateGoldenReferences, 
  deleteGoldenReference,
  listPendingApprovals,
  approveSubmission,
  getApprovalStatistics
} from './commands/golden-reference'
import {
  runABTest,
  runBatchTest,
  runRegressionTest,
  compareResults,
  singleVariantComparison
} from './commands/ab-test'
import {
  runQualityGates,
  runBatchQualityGates,
  validateDeploymentReadiness,
  getQualityGateConfiguration,
  updateQualityGateConfiguration
} from './commands/quality-gates'
import {
  generateReport,
  aggregateResults,
  compareReports
} from './commands/reporting'

function parseCliArgs(args: string[]): CliOptions {
  const options: CliOptions = {}
  
  for (const arg of args) {
    // Basic commands
    if (arg === '--help' || arg === '-h') {
      options.help = true
    } else if (arg === '--list-configs') {
      options.listConfigs = true
    }
    
    // Common options
    else if (arg.startsWith('--config=')) {
      const value = arg.split('=', 2)[1]?.replace(/^["']|["']$/g, '')
      if (value) {
        options.config = value
      }
    } else if (arg.startsWith('--prompt-variant=')) {
      const value = arg.split('=', 2)[1]?.replace(/^["']|["']$/g, '')
      if (value) {
        options.promptVariant = value
      }
    } else if (arg.startsWith('--output-dir=')) {
      const value = arg.split('=', 2)[1]?.replace(/^["']|["']$/g, '')
      if (value) {
        options.outputDir = value
      }
    } else if (arg === '--assess') {
      options.assess = true
    } else if (arg.startsWith('--golden-ref=')) {
      const value = arg.split('=', 2)[1]?.replace(/^["']|["']$/g, '')
      if (value) {
        options.goldenRef = value
      }
    }
    
    // Golden Reference commands
    else if (arg === '--create-golden') {
      options.createGolden = true
    } else if (arg === '--update-golden-set') {
      options.updateGoldenSet = true
    } else if (arg === '--list-golden') {
      options.listGolden = true
    } else if (arg === '--delete-golden') {
      options.deleteGolden = true
    } else if (arg === '--validate-golden') {
      options.validateGolden = true
    } else if (arg === '--approve') {
      options.approve = true
    } else if (arg.startsWith('--source=')) {
      const value = arg.split('=', 2)[1]?.replace(/^["']|["']$/g, '')
      if (value) {
        options.source = value
      }
    } else if (arg.startsWith('--batch-approved=')) {
      const value = arg.split('=', 2)[1]?.replace(/^["']|["']$/g, '')
      if (value) {
        options.batchApproved = value
      }
    } else if (arg.startsWith('--filter=')) {
      const value = arg.split('=', 2)[1]?.replace(/^["']|["']$/g, '')
      if (value) {
        options.filter = value
      }
    }
    
    // A/B Testing commands
    else if (arg === '--ab-test') {
      options.abTest = true
    } else if (arg === '--batch-test') {
      options.batchTest = true
    } else if (arg === '--regression-test') {
      options.regressionTest = true
    } else if (arg.startsWith('--variants=')) {
      const value = arg.split('=', 2)[1]?.replace(/^["']|["']$/g, '')
      if (value) {
        options.variants = value
      }
    } else if (arg.startsWith('--iterations=')) {
      const value = parseInt(arg.split('=', 2)[1] || '5')
      if (!isNaN(value)) {
        options.iterations = value
      }
    } else if (arg === '--parallel') {
      options.parallel = true
    } else if (arg.startsWith('--baseline-dir=')) {
      const value = arg.split('=', 2)[1]?.replace(/^["']|["']$/g, '')
      if (value) {
        options.baselineDir = value
      }
    } else if (arg.startsWith('--new-variant=')) {
      const value = arg.split('=', 2)[1]?.replace(/^["']|["']$/g, '')
      if (value) {
        options.newVariant = value
      }
    } else if (arg.startsWith('--config-file=')) {
      const value = arg.split('=', 2)[1]?.replace(/^["']|["']$/g, '')
      if (value) {
        options.configFile = value
      }
    }
    
    // Quality Gates commands
    else if (arg === '--quality-gates') {
      options.qualityGates = true
    } else if (arg === '--validate-deployment') {
      options.validateDeployment = true
    } else if (arg === '--batch-quality-gates') {
      options.batchQualityGates = true
    } else if (arg.startsWith('--custom-thresholds=')) {
      const value = arg.split('=', 2)[1]?.replace(/^["']|["']$/g, '')
      if (value) {
        options.customThresholds = value
      }
    } else if (arg === '--skip-regression') {
      options.skipRegression = true
    } else if (arg === '--skip-golden') {
      options.skipGolden = true
    }
    
    // Reporting commands
    else if (arg === '--generate-report') {
      options.generateReport = true
    } else if (arg.startsWith('--report-type=')) {
      const value = arg.split('=', 2)[1]?.replace(/^["']|["']$/g, '')
      if (value) {
        options.reportType = value
      }
    } else if (arg.startsWith('--time-range=')) {
      const value = arg.split('=', 2)[1]?.replace(/^["']|["']$/g, '')
      if (value) {
        options.timeRange = value
      }
    } else if (arg === '--aggregate-results') {
      options.aggregateResults = true
    } else if (arg === '--compare') {
      options.compare = true
    }
  }
  
  return options
}

function validateOptions(options: CliOptions): void {
  // Commands that don't require a config
  const configNotRequiredCommands = [
    'help', 'listConfigs', 'listGolden', 'validateGolden', 'generateReport', 
    'aggregateResults', 'compare'
  ]
  
  const hasConfigNotRequiredCommand = configNotRequiredCommands.some(cmd => 
    options[cmd as keyof CliOptions]
  )
  
  // Commands that require specific parameters
  if (options.createGolden && (!options.config || !options.source)) {
    throw new Error('--create-golden requires --config and --source parameters')
  }
  
  if (options.updateGoldenSet && !options.batchApproved) {
    throw new Error('--update-golden-set requires --batch-approved parameter')
  }
  
  if (options.deleteGolden && !options.config) {
    throw new Error('--delete-golden requires --config parameter')
  }
  
  if (options.abTest && (!options.config || !options.variants)) {
    throw new Error('--ab-test requires --config and --variants parameters')
  }
  
  if (options.batchTest && (!options.configFile || !options.variants)) {
    throw new Error('--batch-test requires --config-file and --variants parameters')
  }
  
  if (options.regressionTest && (!options.baselineDir || !options.newVariant)) {
    throw new Error('--regression-test requires --baseline-dir and --new-variant parameters')
  }
  
  if (options.qualityGates && !options.config) {
    throw new Error('--quality-gates requires --config parameter')
  }
  
  if (options.validateDeployment && !options.config) {
    throw new Error('--validate-deployment requires --config parameter')
  }
  
  if (options.batchQualityGates && !options.configFile) {
    throw new Error('--batch-quality-gates requires --config-file parameter')
  }
  
  if (options.generateReport && !options.reportType) {
    throw new Error('--generate-report requires --report-type parameter')
  }
  
  if (options.aggregateResults && !options.outputDir) {
    throw new Error('--aggregate-results requires --output-dir parameter')
  }
  
  // Basic worksheet generation validation
  const isBasicGeneration = !hasConfigNotRequiredCommand && 
    !options.createGolden && !options.updateGoldenSet && !options.deleteGolden &&
    !options.abTest && !options.batchTest && !options.regressionTest &&
    !options.qualityGates && !options.validateDeployment && !options.batchQualityGates &&
    !options.generateReport && !options.aggregateResults && !options.compare
  
  if (isBasicGeneration && !options.config) {
    const error: CliError = new Error('Configuration ID is required. Use --config="<config-id>" or --help for usage information.') as CliError
    error.code = 'INVALID_CONFIG'
    throw error
  }
  
  if (options.config && options.config.length === 0) {
    const error: CliError = new Error('Configuration ID cannot be empty') as CliError
    error.code = 'INVALID_CONFIG'
    throw error
  }
}

async function main(): Promise<void> {
  try {
    const args = process.argv.slice(2)
    const options = parseCliArgs(args)
    
    // Show help if requested or no arguments provided
    if (options.help || args.length === 0) {
      showHelp()
      return
    }
    
    console.log('Worksheet Engine CLI v1.3.0')
    console.log('Golden Reference System and A/B Testing Infrastructure\n')
    
    // Validate options
    validateOptions(options)
    
    // Route to appropriate command
    
    // Basic commands
    if (options.listConfigs) {
      listConfigs()
      return
    }
    
    // Golden Reference commands
    if (options.createGolden) {
      await createGoldenReference(
        options.config!,
        options.source!,
        options.approve || false
      )
      return
    }
    
    if (options.updateGoldenSet) {
      await updateGoldenSet(options.batchApproved!)
      return
    }
    
    if (options.listGolden) {
      await listGoldenReferences(options.filter)
      return
    }
    
    if (options.deleteGolden) {
      await deleteGoldenReference(options.config!)
      return
    }
    
    if (options.validateGolden) {
      await validateGoldenReferences()
      return
    }
    
    // A/B Testing commands
    if (options.abTest) {
      const variants = options.variants!.split(',').map(v => v.trim())
      await runABTest(
        options.config!,
        variants,
        options.iterations || 5,
        options.parallel || false,
        options.outputDir
      )
      return
    }
    
    if (options.batchTest) {
      const variants = options.variants!.split(',').map(v => v.trim())
      await runBatchTest(
        options.configFile!,
        variants,
        options.parallel !== false, // Default to true
        options.outputDir
      )
      return
    }
    
    if (options.regressionTest) {
      const configIds = options.config ? [options.config] : []
      await runRegressionTest(
        options.baselineDir!,
        options.newVariant!,
        configIds,
        options.outputDir
      )
      return
    }
    
    // Quality Gates commands
    if (options.qualityGates) {
      await runQualityGates(
        options.config!,
        options.promptVariant || 'baseline',
        options.skipRegression || false,
        options.skipGolden || false,
        options.customThresholds
      )
      return
    }
    
    if (options.validateDeployment) {
      const configIds = options.config!.split(',').map(id => id.trim())
      await validateDeploymentReadiness(
        configIds,
        options.promptVariant || 'baseline'
      )
      return
    }
    
    if (options.batchQualityGates) {
      await runBatchQualityGates(
        options.configFile!,
        options.promptVariant || 'baseline'
      )
      return
    }
    
    // Reporting commands
    if (options.generateReport) {
      await generateReport(
        options.reportType!,
        options.timeRange,
        options.outputDir
      )
      return
    }
    
    if (options.aggregateResults) {
      await aggregateResults(
        options.outputDir!,
        options.timeRange
      )
      return
    }
    
    if (options.compare) {
      console.log('⚠️  Report comparison feature requires baseline and current report IDs')
      console.log('💡 Use --baseline="<id>" --current="<id>" parameters')
      return
    }
    
    // Default: Generate worksheet (backward compatibility)
    if (options.config) {
      await generateWorksheetCommand(
        options.config,
        options.promptVariant || 'baseline',
        options.outputDir,
        options.assess,
        options.goldenRef
      )
      return
    }
    
    // If no command was matched, show help
    console.log('❌ No valid command specified\n')
    showHelp()
    
  } catch (error) {
    console.error('\n❌ Error:', error instanceof Error ? error.message : 'Unknown error occurred')
    
    if (error instanceof Error && 'details' in error) {
      const cliError = error as CliError
      if (cliError.details && process.env.NODE_ENV === 'development') {
        console.error('Details:', cliError.details)
      }
    }
    
    // Provide helpful suggestions
    if (error instanceof Error) {
      if (error.message.includes('Configuration') && error.message.includes('not found')) {
        console.error('\n💡 Tip: Use --list-configs to see available configurations')
      } else if (error.message.includes('GEMINI_API_KEY')) {
        console.error('\n💡 Tip: Ensure GEMINI_API_KEY environment variable is set')
      } else if (error.message.includes('Failed to create output directory')) {
        console.error('\n💡 Tip: Check that the output directory path is valid and writable')
      } else if (error.message.includes('requires')) {
        console.error('\n💡 Tip: Check the required parameters for the command')
      } else if (error.message.includes('config-file') || error.message.includes('configFile')) {
        console.error('\n💡 Tip: Config file should contain a JSON array of configuration IDs')
      } else if (error.message.includes('variants')) {
        console.error('\n💡 Tip: Variants should be comma-separated (e.g., "baseline,enhanced-v1")')
      }
    }
    
    console.error('\n🔧 Use --help for usage information\n')
    process.exit(1)
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message)
  process.exit(1)
})

// Only run main if this file is executed directly
if (require.main === module) {
  main()
}