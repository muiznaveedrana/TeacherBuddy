/**
 * Results directory management utilities for worksheet engine CLI
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

import { promises as fs } from 'fs'
import { join, resolve } from 'path'
import { EngineConfig, GenerationResult, EngineMetadata, OutputStructure, CliError } from '../../types/engine-types'
import { GeneratedWorksheet } from '@/lib/types/worksheet'
import { EnginePdfService } from '../../integration/pdf-service'
import { mapEngineConfigToWorksheetConfig } from '../../integration/config-mapper'

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

      // Generate PDF using the real PDF service
      try {
        const worksheetConfig = mapEngineConfigToWorksheetConfig(config)
        const title = `${worksheetConfig.topic} - ${worksheetConfig.subtopic}`
        
        await EnginePdfService.generatePdf(
          worksheet.html, 
          outputPaths.worksheetHtml, 
          worksheetConfig,
          title
        )
      } catch (pdfError) {
        console.warn('[OutputManager] PDF generation failed, HTML saved successfully')
        console.warn('[OutputManager] PDF Error:', pdfError instanceof Error ? pdfError.message : 'Unknown error')
        // Don't fail the entire operation if PDF generation fails
      }

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

  async generatePdf(
    htmlContent: string, 
    config: EngineConfig, 
    title: string
  ): Promise<string> {
    const pdfPath = join(this.outputDir, 'worksheet.pdf')
    const htmlPath = join(this.outputDir, 'worksheet.html')
    
    try {
      const worksheetConfig = mapEngineConfigToWorksheetConfig(config)
      
      return await EnginePdfService.generatePdf(
        htmlContent,
        htmlPath,
        worksheetConfig,
        title
      )
    } catch (error) {
      const cliError: CliError = new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`) as CliError
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