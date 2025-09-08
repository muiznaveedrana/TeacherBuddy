/**
 * Content Analysis Assessment - Main interface for content quality assessment
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

import { ContentAnalysisScore, EngineConfig } from '../../types/engine-types'
import { ContentAnalysisAssessment as ContentAssessmentCore, ContentAnalysisResult } from './index'
import fs from 'fs'

export class ContentAnalysisAssessment {
  private assessmentCore: ContentAssessmentCore

  constructor() {
    this.assessmentCore = new ContentAssessmentCore()
  }

  /**
   * Assess worksheet PDF file for content quality
   * This is the main interface method expected by AssessmentRunner
   */
  async assess(pdfPath: string, config: EngineConfig): Promise<ContentAnalysisScore> {
    try {
      // Try to find corresponding HTML file for better content extraction
      const htmlPath = pdfPath.replace('.pdf', '.html')
      let htmlContent: string | undefined

      if (fs.existsSync(htmlPath)) {
        htmlContent = fs.readFileSync(htmlPath, 'utf-8')
      }

      const result = await this.assessmentCore.assessContent(pdfPath, htmlContent, config)
      return result.overallScore
    } catch (error) {
      console.error('Content analysis assessment failed:', error)
      
      // Return default scores on error
      return {
        score: 5.0,
        details: {
          curriculumAlignment: 5.0,
          languageAppropriate: 5.0,
          mathematicalAccuracy: 5.0
        }
      }
    }
  }

  /**
   * Assess HTML content directly for content quality
   */
  async assessHtml(htmlContent: string, config: EngineConfig): Promise<ContentAnalysisScore> {
    try {
      const result = await this.assessmentCore.assessContent(undefined, htmlContent, config)
      return result.overallScore
    } catch (error) {
      console.error('HTML content analysis failed:', error)
      
      return {
        score: 5.0,
        details: {
          curriculumAlignment: 5.0,
          languageAppropriate: 5.0,
          mathematicalAccuracy: 5.0
        }
      }
    }
  }

  /**
   * Get detailed assessment results
   */
  async assessDetailed(pdfPath: string, config: EngineConfig): Promise<ContentAnalysisResult> {
    try {
      const htmlPath = pdfPath.replace('.pdf', '.html')
      let htmlContent: string | undefined

      if (fs.existsSync(htmlPath)) {
        htmlContent = fs.readFileSync(htmlPath, 'utf-8')
      }

      return await this.assessmentCore.assessContent(pdfPath, htmlContent, config)
    } catch (error) {
      console.error('Detailed content analysis failed:', error)
      throw error
    }
  }

  /**
   * Generate detailed assessment report
   */
  async generateReport(pdfPath: string, config: EngineConfig): Promise<string> {
    try {
      const result = await this.assessDetailed(pdfPath, config)
      return this.assessmentCore.generateDetailedReport(result)
    } catch (error) {
      console.error('Content analysis report generation failed:', error)
      return `Content analysis report generation failed: ${error}`
    }
  }

  /**
   * Quick assessment with basic metrics
   */
  async quickAssess(htmlContent: string, config: EngineConfig): Promise<{
    score: number
    wordCount: number
    questionCount: number
    hasInstructions: boolean
    mathAccuracy: number
  }> {
    try {
      const result = await this.assessmentCore.assessContent(undefined, htmlContent, config)
      
      return {
        score: result.overallScore.score,
        wordCount: result.extractedContent.structuredContent.metadata.wordCount,
        questionCount: result.extractedContent.structuredContent.metadata.questionCount,
        hasInstructions: result.extractedContent.structuredContent.instructions.length > 0,
        mathAccuracy: result.scoringResult.mathematicalAccuracy
      }
    } catch (error) {
      console.error('Quick content assessment failed:', error)
      return {
        score: 5.0,
        wordCount: 0,
        questionCount: 0,
        hasInstructions: false,
        mathAccuracy: 5.0
      }
    }
  }
}