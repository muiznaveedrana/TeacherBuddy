/**
 * Visual Similarity Assessment - Main interface for visual comparison assessment
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

import { VisualSimilarityScore } from '../../types/engine-types'
import { PdfToImageConverter } from './pdf-to-image'
import { ImageComparator, ImageComparisonResult, ComparisonOptions } from './image-comparison'
import { SimilarityCalculator } from './similarity-metrics'
import fs from 'fs'
import path from 'path'

export class VisualSimilarityAssessment {
  private pdfConverter: PdfToImageConverter
  private imageComparator: ImageComparator

  constructor() {
    this.pdfConverter = new PdfToImageConverter()
    this.imageComparator = new ImageComparator()
  }

  /**
   * Compare worksheet PDF with golden reference
   * This is the main interface method expected by AssessmentRunner
   */
  async compare(worksheetPdfPath: string, goldenReferencePath: string): Promise<VisualSimilarityScore> {
    try {
      if (!fs.existsSync(worksheetPdfPath)) {
        throw new Error(`Worksheet PDF not found: ${worksheetPdfPath}`)
      }

      if (!fs.existsSync(goldenReferencePath)) {
        throw new Error(`Golden reference not found: ${goldenReferencePath}`)
      }

      // Convert PDFs to images for comparison
      const tempDir = path.join(path.dirname(worksheetPdfPath), 'temp_images')
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true })
      }

      const worksheetImagePath = path.join(tempDir, 'worksheet_page1.png')
      const referenceImagePath = path.join(tempDir, 'reference_page1.png')

      // Convert both PDFs to images (first page only for now)
      await Promise.all([
        this.pdfConverter.convertToImage(worksheetPdfPath, worksheetImagePath, { pageNumber: 1 }),
        this.pdfConverter.convertToImage(goldenReferencePath, referenceImagePath, { pageNumber: 1 })
      ])

      // Compare the images
      const comparisonOptions: Partial<ComparisonOptions> = {
        threshold: 0.05,
        includeColorAnalysis: true,
        includeLayoutAnalysis: true,
        resizeToMatch: true,
        ignoreAntialiasing: true
      }

      const comparisonResult = await this.imageComparator.compareImages(
        referenceImagePath,
        worksheetImagePath,
        comparisonOptions
      )

      // Convert comparison result to VisualSimilarityScore format
      const score = this.convertToVisualSimilarityScore(comparisonResult)

      // Clean up temporary files
      this.cleanupTempFiles([worksheetImagePath, referenceImagePath])

      return score

    } catch (error) {
      console.error('Visual similarity assessment failed:', error)
      
      // Return default scores on error
      return {
        score: 0,
        details: {
          structuralSimilarity: 0,
          layoutConsistency: 0,
          visualAlignment: 0
        }
      }
    }
  }

  /**
   * Compare images directly (when already converted)
   */
  async compareImages(referenceImagePath: string, worksheetImagePath: string): Promise<VisualSimilarityScore> {
    try {
      const comparisonOptions: Partial<ComparisonOptions> = {
        threshold: 0.05,
        includeColorAnalysis: true,
        includeLayoutAnalysis: true,
        resizeToMatch: true,
        ignoreAntialiasing: true
      }

      const comparisonResult = await this.imageComparator.compareImages(
        referenceImagePath,
        worksheetImagePath,
        comparisonOptions
      )

      return this.convertToVisualSimilarityScore(comparisonResult)

    } catch (error) {
      console.error('Image comparison failed:', error)
      
      return {
        score: 0,
        details: {
          structuralSimilarity: 0,
          layoutConsistency: 0,
          visualAlignment: 0
        }
      }
    }
  }

  /**
   * Get detailed comparison results
   */
  async compareDetailed(worksheetPdfPath: string, goldenReferencePath: string): Promise<ImageComparisonResult> {
    const tempDir = path.join(path.dirname(worksheetPdfPath), 'temp_images')
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true })
    }

    const worksheetImagePath = path.join(tempDir, 'worksheet_detailed.png')
    const referenceImagePath = path.join(tempDir, 'reference_detailed.png')

    try {
      // Convert PDFs to images
      await Promise.all([
        this.pdfConverter.convertToImage(worksheetPdfPath, worksheetImagePath, { pageNumber: 1, quality: 300 }),
        this.pdfConverter.convertToImage(goldenReferencePath, referenceImagePath, { pageNumber: 1, quality: 300 })
      ])

      const comparisonResult = await this.imageComparator.compareImages(
        referenceImagePath,
        worksheetImagePath,
        {
          threshold: 0.02, // Higher precision for detailed analysis
          includeColorAnalysis: true,
          includeLayoutAnalysis: true,
          resizeToMatch: true,
          ignoreAntialiasing: false
        }
      )

      // Clean up temporary files
      this.cleanupTempFiles([worksheetImagePath, referenceImagePath])

      return comparisonResult

    } catch (error) {
      // Clean up temporary files even on error
      this.cleanupTempFiles([worksheetImagePath, referenceImagePath])
      throw error
    }
  }

  /**
   * Quick assessment with basic metrics
   */
  async quickAssess(worksheetPdfPath: string, goldenReferencePath: string): Promise<{
    score: number
    isMatch: boolean
    majorDifferences: number
    similarityPercentage: number
  }> {
    try {
      const result = await this.compare(worksheetPdfPath, goldenReferencePath)
      
      return {
        score: result.score,
        isMatch: result.score >= 7.0,
        majorDifferences: result.details.structuralSimilarity < 6.0 ? 1 : 0,
        similarityPercentage: (result.score / 10) * 100
      }
    } catch (error) {
      console.error('Quick visual assessment failed:', error)
      return {
        score: 0,
        isMatch: false,
        majorDifferences: 10,
        similarityPercentage: 0
      }
    }
  }

  private convertToVisualSimilarityScore(comparisonResult: ImageComparisonResult): VisualSimilarityScore {
    // Convert the ImageComparisonResult to our expected VisualSimilarityScore format
    const structuralSimilarity = Math.round(comparisonResult.ssim * 100) / 10 // Convert 0-1 to 0-10
    const layoutConsistency = Math.round(comparisonResult.layoutConsistency * 10) / 10
    
    // Calculate visual alignment from pixel difference (inverse relationship)
    const visualAlignment = Math.max(0, Math.round((100 - comparisonResult.pixelDifference) / 10 * 10) / 10)

    // Overall score is the weighted average
    const overallScore = Math.round(
      (structuralSimilarity * 0.4 + layoutConsistency * 0.35 + visualAlignment * 0.25) * 10
    ) / 10

    return {
      score: Math.min(10, Math.max(0, overallScore)),
      details: {
        structuralSimilarity: Math.min(10, Math.max(0, structuralSimilarity)),
        layoutConsistency: Math.min(10, Math.max(0, layoutConsistency)),
        visualAlignment: Math.min(10, Math.max(0, visualAlignment))
      }
    }
  }

  private cleanupTempFiles(filePaths: string[]): void {
    filePaths.forEach(filePath => {
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      } catch (error) {
        console.warn(`Failed to cleanup temp file ${filePath}:`, error)
      }
    })
  }
}