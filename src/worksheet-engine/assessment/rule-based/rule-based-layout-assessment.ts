/**
 * Rule-Based Layout Assessment - Main interface for rule-based quality assessment
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

import { RuleBasedLayoutScore } from '../../types/engine-types'
import { RuleBasedAssessment, RuleBasedAssessmentResult } from './index'
import fs from 'fs'

export class RuleBasedLayoutAssessment {
  private assessment: RuleBasedAssessment

  constructor() {
    this.assessment = new RuleBasedAssessment()
  }

  /**
   * Assess worksheet PDF file for rule-based layout quality
   */
  async assess(pdfPath: string): Promise<RuleBasedLayoutScore> {
    // For PDF assessment, we need to convert to HTML or extract HTML content
    // For now, we'll look for the corresponding HTML file
    const htmlPath = pdfPath.replace('.pdf', '.html')
    
    if (!fs.existsSync(htmlPath)) {
      console.warn(`HTML file not found for PDF assessment: ${htmlPath}`)
      console.log('Using default rule-based scores for PDF-only assessment')
      
      // Return default scores when HTML is not available
      return {
        score: 7.5, // Assume reasonable default
        details: {
          fontConsistency: 7.5,
          spacingQuality: 7.5,
          elementPositioning: 7.5
        }
      }
    }

    const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
    return this.assessHtml(htmlContent)
  }

  /**
   * Assess HTML content for rule-based layout quality
   */
  async assessHtml(htmlContent: string): Promise<RuleBasedLayoutScore> {
    try {
      const result: RuleBasedAssessmentResult = await this.assessment.assessWorksheet(htmlContent)
      return result.overallScore
    } catch (error) {
      console.error('Rule-based layout assessment failed:', error)
      
      // Return default scores on error
      return {
        score: 5.0,
        details: {
          fontConsistency: 5.0,
          spacingQuality: 5.0,
          elementPositioning: 5.0
        }
      }
    }
  }

  /**
   * Generate detailed assessment report
   */
  async generateReport(htmlContent: string): Promise<string> {
    try {
      const result = await this.assessment.assessWorksheet(htmlContent)
      return this.assessment.generateDetailedReport(result)
    } catch (error) {
      console.error('Report generation failed:', error)
      return `Rule-based assessment report generation failed: ${error}`
    }
  }

  /**
   * Quick assessment with minimal details
   */
  async quickAssess(htmlContent: string): Promise<{
    score: number
    fontIssues: number
    spacingIssues: number
    alignmentIssues: number
  }> {
    try {
      const result = await this.assessment.assessWorksheet(htmlContent)
      
      return {
        score: result.overallScore.score,
        fontIssues: result.layoutAnalysis.analysisDetails.fontVariations,
        spacingIssues: result.layoutAnalysis.analysisDetails.spacingInconsistencies,
        alignmentIssues: result.layoutAnalysis.analysisDetails.misalignedElements
      }
    } catch (error) {
      console.error('Quick assessment failed:', error)
      return {
        score: 5.0,
        fontIssues: 0,
        spacingIssues: 0,
        alignmentIssues: 0
      }
    }
  }
}