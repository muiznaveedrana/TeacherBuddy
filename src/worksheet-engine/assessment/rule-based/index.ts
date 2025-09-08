/**
 * Rule-Based Assessment Module - Main orchestrator for layout quality assessment
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

import { RuleBasedLayoutScore } from '../../types/engine-types'
import { LayoutAnalyzer, LayoutAnalysisResult } from './layout-analyzer'
import { TypographyChecker, TypographyAnalysisResult } from './typography-checker'
import { SpacingValidator, SpacingValidationResult } from './spacing-validator'

export interface RuleBasedAssessmentResult {
  layoutAnalysis: LayoutAnalysisResult
  typographyAnalysis: TypographyAnalysisResult
  spacingValidation: SpacingValidationResult
  overallScore: RuleBasedLayoutScore
  processingTime: number
  assessmentDetails: {
    layoutScore: number
    typographyScore: number
    spacingScore: number
    combinedScore: number
  }
}

export class RuleBasedAssessment {
  private layoutAnalyzer: LayoutAnalyzer
  private typographyChecker: TypographyChecker
  private spacingValidator: SpacingValidator

  constructor() {
    this.layoutAnalyzer = new LayoutAnalyzer()
    this.typographyChecker = new TypographyChecker()
    this.spacingValidator = new SpacingValidator()
  }

  async assessWorksheet(htmlContent: string): Promise<RuleBasedAssessmentResult> {
    const startTime = Date.now()

    try {
      // Run all assessments in parallel for better performance
      const [layoutAnalysis, typographyAnalysis, spacingValidation] = await Promise.all([
        this.layoutAnalyzer.analyzeLayout(htmlContent),
        this.typographyChecker.checkTypography(htmlContent),
        this.spacingValidator.validateSpacing(htmlContent)
      ])

      // Calculate individual scores
      const layoutScore = this.layoutAnalyzer.generateLayoutScore(layoutAnalysis)
      const typographyScore = this.typographyChecker.calculateOverallTypographyScore(typographyAnalysis)
      const spacingScore = this.spacingValidator.calculateOverallSpacingScore(spacingValidation)

      // Calculate combined rule-based score
      const combinedScore = this.calculateCombinedScore(layoutScore.score, typographyScore, spacingScore)

      const overallScore: RuleBasedLayoutScore = {
        score: combinedScore,
        details: {
          fontConsistency: Number(((layoutAnalysis.fontConsistency + typographyAnalysis.fontFamilyConsistency) / 2).toFixed(1)),
          spacingQuality: Number(((layoutAnalysis.spacingQuality + spacingScore) / 2).toFixed(1)),
          elementPositioning: layoutAnalysis.elementPositioning
        }
      }

      const processingTime = Date.now() - startTime

      return {
        layoutAnalysis,
        typographyAnalysis,
        spacingValidation,
        overallScore,
        processingTime,
        assessmentDetails: {
          layoutScore: layoutScore.score,
          typographyScore,
          spacingScore,
          combinedScore
        }
      }
    } catch (error) {
      console.error('Rule-based assessment failed:', error)
      
      // Return default scores on error
      const processingTime = Date.now() - startTime
      
      return {
        layoutAnalysis: {
          fontConsistency: 5.0,
          spacingQuality: 5.0,
          elementPositioning: 5.0,
          analysisDetails: {
            fontVariations: 0,
            spacingInconsistencies: 0,
            misalignedElements: 0,
            marginViolations: 0
          }
        },
        typographyAnalysis: {
          fontFamilyConsistency: 5.0,
          sizeHierarchy: 5.0,
          weightUsage: 5.0,
          readability: 5.0,
          details: {
            fontFamilyCount: 0,
            sizeVariations: 0,
            weightVariations: 0,
            readabilityIssues: ['Assessment failed']
          }
        },
        spacingValidation: {
          marginConsistency: 5.0,
          paddingConsistency: 5.0,
          gapConsistency: 5.0,
          verticalRhythm: 5.0,
          details: {
            uniqueMarginValues: 0,
            uniquePaddingValues: 0,
            spacingViolations: ['Assessment failed'],
            standardSpacingUsage: 0
          }
        },
        overallScore: {
          score: 5.0,
          details: {
            fontConsistency: 5.0,
            spacingQuality: 5.0,
            elementPositioning: 5.0
          }
        },
        processingTime,
        assessmentDetails: {
          layoutScore: 5.0,
          typographyScore: 5.0,
          spacingScore: 5.0,
          combinedScore: 5.0
        }
      }
    }
  }

  private calculateCombinedScore(layoutScore: number, typographyScore: number, spacingScore: number): number {
    // Weight the different aspects of rule-based assessment
    const LAYOUT_WEIGHT = 0.35
    const TYPOGRAPHY_WEIGHT = 0.35
    const SPACING_WEIGHT = 0.30

    const weightedScore = (
      (layoutScore * LAYOUT_WEIGHT) +
      (typographyScore * TYPOGRAPHY_WEIGHT) +
      (spacingScore * SPACING_WEIGHT)
    )

    return Number(weightedScore.toFixed(1))
  }

  generateDetailedReport(result: RuleBasedAssessmentResult): string {
    const report = []

    report.push('=== Rule-Based Layout Assessment Report ===')
    report.push(`Overall Score: ${result.overallScore.score}/10.0`)
    report.push(`Processing Time: ${result.processingTime}ms`)
    report.push('')

    // Layout Analysis Details
    report.push('--- Layout Analysis ---')
    report.push(`Font Consistency: ${result.layoutAnalysis.fontConsistency}/10.0`)
    report.push(`Spacing Quality: ${result.layoutAnalysis.spacingQuality}/10.0`)
    report.push(`Element Positioning: ${result.layoutAnalysis.elementPositioning}/10.0`)
    report.push(`Font Variations: ${result.layoutAnalysis.analysisDetails.fontVariations}`)
    report.push(`Spacing Inconsistencies: ${result.layoutAnalysis.analysisDetails.spacingInconsistencies}`)
    report.push(`Misaligned Elements: ${result.layoutAnalysis.analysisDetails.misalignedElements}`)
    report.push('')

    // Typography Analysis Details
    report.push('--- Typography Analysis ---')
    report.push(`Font Family Consistency: ${result.typographyAnalysis.fontFamilyConsistency}/10.0`)
    report.push(`Size Hierarchy: ${result.typographyAnalysis.sizeHierarchy}/10.0`)
    report.push(`Weight Usage: ${result.typographyAnalysis.weightUsage}/10.0`)
    report.push(`Readability: ${result.typographyAnalysis.readability}/10.0`)
    report.push(`Font Family Count: ${result.typographyAnalysis.details.fontFamilyCount}`)
    report.push(`Size Variations: ${result.typographyAnalysis.details.sizeVariations}`)
    report.push(`Weight Variations: ${result.typographyAnalysis.details.weightVariations}`)
    
    if (result.typographyAnalysis.details.readabilityIssues.length > 0) {
      report.push('Readability Issues:')
      result.typographyAnalysis.details.readabilityIssues.forEach(issue => {
        report.push(`  - ${issue}`)
      })
    }
    report.push('')

    // Spacing Validation Details
    report.push('--- Spacing Validation ---')
    report.push(`Margin Consistency: ${result.spacingValidation.marginConsistency}/10.0`)
    report.push(`Padding Consistency: ${result.spacingValidation.paddingConsistency}/10.0`)
    report.push(`Gap Consistency: ${result.spacingValidation.gapConsistency}/10.0`)
    report.push(`Vertical Rhythm: ${result.spacingValidation.verticalRhythm}/10.0`)
    report.push(`Standard Spacing Usage: ${(result.spacingValidation.details.standardSpacingUsage * 100).toFixed(1)}%`)
    
    if (result.spacingValidation.details.spacingViolations.length > 0) {
      report.push('Spacing Violations:')
      result.spacingValidation.details.spacingViolations.forEach(violation => {
        report.push(`  - ${violation}`)
      })
    }

    return report.join('\n')
  }
}

// Export the main assessment class for external use
export { RuleBasedLayoutAssessment } from './rule-based-layout-assessment'