#!/usr/bin/env node

/**
 * Main CLI entry point for worksheet engine
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

import { CliOptions, CliError } from '../types/engine-types'
import { generateWorksheetCommand } from './commands/generate'
import { listConfigs } from './commands/list-configs'
import { showHelp } from './commands/help'

function parseCliArgs(args: string[]): CliOptions {
  const options: CliOptions = {}
  
  for (const arg of args) {
    if (arg === '--help' || arg === '-h') {
      options.help = true
    } else if (arg === '--list-configs') {
      options.listConfigs = true
    } else if (arg.startsWith('--config=')) {
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
  }
  
  return options
}

function validateOptions(options: CliOptions): void {
  if (!options.help && !options.listConfigs && !options.config) {
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
    
    // List configurations if requested
    if (options.listConfigs) {
      listConfigs()
      return
    }
    
    // Validate options for generation
    validateOptions(options)
    
    if (!options.config) {
      throw new Error('Configuration ID is required')
    }
    
    // Generate worksheet
    console.log('Worksheet Engine CLI v1.0.0')
    console.log('Core Engine Infrastructure and Service Integration\n')
    
    await generateWorksheetCommand(
      options.config,
      options.promptVariant || 'baseline',
      options.outputDir,
      options.assess,
      options.goldenRef
    )
    
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