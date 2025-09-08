/**
 * Results directory management utilities for worksheet engine CLI
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

import { promises as fs } from 'fs'
import { join, resolve } from 'path'
import { EngineConfig, GenerationResult, EngineMetadata, OutputStructure, CliError } from '../../types/engine-types'
import { GeneratedWorksheet } from '@/lib/types/worksheet'

export class OutputManager {
  private outputDir: string

  constructor(outputDir: string) {
    this.outputDir = resolve(outputDir)
  }

  async ensureOutputDirectory(): Promise<void> {
    try {
      await fs.mkdir(this.outputDir, { recursive: true })
    } catch (error) {
      const cliError: CliError = new Error(`Failed to create output directory: ${this.outputDir}`) as CliError
      cliError.code = 'OUTPUT_ERROR'
      cliError.details = { outputDir: this.outputDir, originalError: error }
      throw cliError
    }
  }

  async saveResults(
    worksheet: GeneratedWorksheet,
    config: EngineConfig,
    processingTime: number
  ): Promise<GenerationResult> {
    await this.ensureOutputDirectory()

    const metadata: EngineMetadata = {
      configId: config.configId,
      generatedAt: new Date().toISOString(),
      processingTime,
      promptVariant: config.promptVariant,
      serviceVersion: '2.0.0-unified',
      outputDirectory: this.outputDir
    }

    const outputPaths: OutputStructure = {
      configJson: join(this.outputDir, 'config.json'),
      worksheetHtml: join(this.outputDir, 'worksheet.html'),
      worksheetPdf: join(this.outputDir, 'worksheet.pdf'),
      generationLog: join(this.outputDir, 'generation-log.json'),
      engineMetadata: join(this.outputDir, 'engine-metadata.json')
    }

    try {
      // Save configuration
      await fs.writeFile(
        outputPaths.configJson,
        JSON.stringify(config, null, 2),
        'utf-8'
      )

      // Save HTML worksheet
      await fs.writeFile(
        outputPaths.worksheetHtml,
        worksheet.html,
        'utf-8'
      )

      // Save generation metadata
      const generationLog = {
        worksheet: worksheet.metadata,
        generatedAt: metadata.generatedAt,
        processingTime: metadata.processingTime
      }
      
      await fs.writeFile(
        outputPaths.generationLog,
        JSON.stringify(generationLog, null, 2),
        'utf-8'
      )

      // Save engine metadata
      await fs.writeFile(
        outputPaths.engineMetadata,
        JSON.stringify(metadata, null, 2),
        'utf-8'
      )

      return {
        worksheet,
        config,
        outputPath: this.outputDir,
        metadata
      }
    } catch (error) {
      const cliError: CliError = new Error(`Failed to save results to ${this.outputDir}`) as CliError
      cliError.code = 'OUTPUT_ERROR'
      cliError.details = { outputDir: this.outputDir, originalError: error }
      throw cliError
    }
  }

  async generatePdf(_htmlContent: string): Promise<string> {
    // Note: PDF generation would require integration with the existing PDF service
    // For now, we'll create a placeholder that can be implemented later
    const pdfPath = join(this.outputDir, 'worksheet.pdf')
    
    try {
      // Create a placeholder PDF file
      const placeholder = `PDF generation not yet implemented for CLI engine.
HTML content saved to worksheet.html can be manually converted to PDF.

Configuration: ${this.outputDir}
Generated: ${new Date().toISOString()}
`
      await fs.writeFile(pdfPath, placeholder, 'utf-8')
      return pdfPath
    } catch (error) {
      const cliError: CliError = new Error('Failed to create PDF placeholder') as CliError
      cliError.code = 'OUTPUT_ERROR'
      cliError.details = { pdfPath, originalError: error }
      throw cliError
    }
  }

  getOutputPath(): string {
    return this.outputDir
  }

  static getDefaultOutputDir(configId: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
    return join('./results', `${configId}-${timestamp}`)
  }
}