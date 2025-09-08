/**
 * PDF service wrapper for CLI engine integration
 * Story Engine.1.1: Core Engine Infrastructure and Service Integration
 */

import { generateWorksheetPdf, PdfGenerationRequest } from '@/lib/services/pdfGenerationService'
import { WorksheetConfig } from '@/lib/types/worksheet'
import { CliError } from '../types/engine-types'
import { writeFileSync } from 'fs'
import { dirname } from 'path'
import { mkdirSync } from 'fs'

export class EnginePdfService {
  static async generatePdf(
    htmlContent: string, 
    outputPath: string, 
    config: WorksheetConfig,
    title: string
  ): Promise<string> {
    try {
      console.log('[PDF Service] Starting PDF generation...')
      
      const pdfPath = outputPath.replace('.html', '.pdf')
      
      // Prepare PDF generation request
      const pdfRequest: PdfGenerationRequest = {
        config,
        generatedContent: htmlContent,
        title
      }
      
      // Generate PDF using the existing service (same as UI)
      const result = await generateWorksheetPdf(pdfRequest, 'cli-engine')
      
      if (!result.success) {
        throw new Error(result.error || 'PDF generation failed')
      }
      
      if (!result.buffer) {
        throw new Error('PDF buffer is empty')
      }
      
      // Ensure output directory exists
      const outputDir = dirname(pdfPath)
      try {
        mkdirSync(outputDir, { recursive: true })
      } catch (error) {
        // Directory might already exist, ignore error
      }
      
      // Write PDF buffer to file
      writeFileSync(pdfPath, result.buffer)
      
      console.log(`[PDF Service] ✅ PDF generated successfully: ${pdfPath}`)
      console.log(`[PDF Service] Generation time: ${result.generationTime}ms`)
      console.log(`[PDF Service] Filename: ${result.filename}`)
      
      return pdfPath
    } catch (error) {
      const cliError: CliError = new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`) as CliError
      cliError.code = 'SERVICE_ERROR'
      cliError.details = { 
        htmlContentLength: htmlContent.length, 
        outputPath, 
        originalError: error instanceof Error ? error.message : 'Unknown error'
      }
      throw cliError
    }
  }
}