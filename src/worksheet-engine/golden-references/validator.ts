/**
 * Golden Reference Validator
 * Validates golden references for quality and completeness
 */

import fs from 'fs/promises'
import { GoldenReference, QualityScores } from '../types/engine-types'

export class GoldenReferenceValidator {
  private static readonly MINIMUM_QUALITY_THRESHOLD = 7.0
  private static readonly REQUIRED_DIMENSIONS = ['visualSimilarity', 'contentAnalysis', 'ruleBasedLayout']

  async validateGoldenReference(goldenRef: GoldenReference): Promise<ValidationResult> {
    const issues: string[] = []
    const warnings: string[] = []

    // Validate metadata completeness
    const metadataIssues = this.validateMetadata(goldenRef)
    issues.push(...metadataIssues)

    // Validate file existence
    const fileIssues = await this.validateFiles(goldenRef)
    issues.push(...fileIssues)

    // Validate quality scores
    const qualityIssues = this.validateQualityScores(goldenRef.metadata.qualityScores)
    issues.push(...qualityIssues.issues)
    warnings.push(...qualityIssues.warnings)

    // Validate approval information
    const approvalIssues = this.validateApprovalInfo(goldenRef)
    issues.push(...approvalIssues)

    return {
      isValid: issues.length === 0,
      issues,
      warnings,
      qualityScore: goldenRef.metadata.qualityScores.composite
    }
  }

  async validateGoldenReferenceSet(goldenRefs: GoldenReference[]): Promise<SetValidationResult> {
    const results: Array<{ configId: string; result: ValidationResult }> = []
    let totalValid = 0
    let totalInvalid = 0

    for (const goldenRef of goldenRefs) {
      const result = await this.validateGoldenReference(goldenRef)
      results.push({
        configId: goldenRef.metadata.config.yearGroup + '-' + goldenRef.metadata.config.topic,
        result
      })

      if (result.isValid) {
        totalValid++
      } else {
        totalInvalid++
      }
    }

    // Check for coverage gaps
    const coverageWarnings = this.analyzeCoverage(goldenRefs)

    return {
      totalReferences: goldenRefs.length,
      validReferences: totalValid,
      invalidReferences: totalInvalid,
      validationResults: results,
      coverageWarnings,
      overallHealth: totalValid / goldenRefs.length
    }
  }

  private validateMetadata(goldenRef: GoldenReference): string[] {
    const issues: string[] = []
    const metadata = goldenRef.metadata

    if (!metadata.referenceId) {
      issues.push('Missing reference ID')
    }

    if (!metadata.version) {
      issues.push('Missing version information')
    }

    if (!metadata.createdFrom) {
      issues.push('Missing source file reference')
    }

    // Validate config completeness
    const config = metadata.config
    const requiredConfigFields = ['layout', 'yearGroup', 'topic', 'difficulty', 'questionCount']
    
    for (const field of requiredConfigFields) {
      if (!config[field as keyof typeof config]) {
        issues.push(`Missing config field: ${field}`)
      }
    }

    if (config.questionCount && (config.questionCount < 1 || config.questionCount > 20)) {
      issues.push('Question count must be between 1 and 20')
    }

    return issues
  }

  private async validateFiles(goldenRef: GoldenReference): Promise<string[]> {
    const issues: string[] = []

    // Check PDF file exists
    try {
      await fs.access(goldenRef.pdfPath)
      
      // Check file size (should not be empty)
      const pdfStats = await fs.stat(goldenRef.pdfPath)
      if (pdfStats.size < 1000) { // Less than 1KB is likely invalid
        issues.push('PDF file appears to be invalid (too small)')
      }
    } catch (error) {
      issues.push('PDF file does not exist or is not accessible')
    }

    // Check HTML file if specified
    if (goldenRef.htmlPath) {
      try {
        await fs.access(goldenRef.htmlPath)
        
        const htmlStats = await fs.stat(goldenRef.htmlPath)
        if (htmlStats.size < 100) { // Less than 100 bytes is likely invalid
          issues.push('HTML file appears to be invalid (too small)')
        }
      } catch (error) {
        issues.push('HTML file specified but does not exist or is not accessible')
      }
    }

    return issues
  }

  private validateQualityScores(qualityScores: QualityScores): { issues: string[]; warnings: string[] } {
    const issues: string[] = []
    const warnings: string[] = []

    // Check composite score exists and is valid
    if (typeof qualityScores.composite !== 'number') {
      issues.push('Missing or invalid composite quality score')
    } else {
      if (qualityScores.composite < 0 || qualityScores.composite > 10) {
        issues.push('Composite score must be between 0 and 10')
      } else if (qualityScores.composite < GoldenReferenceValidator.MINIMUM_QUALITY_THRESHOLD) {
        warnings.push(`Composite score (${qualityScores.composite}) is below recommended minimum (${GoldenReferenceValidator.MINIMUM_QUALITY_THRESHOLD})`)
      }
    }

    // Validate individual dimension scores
    const dimensions = ['visualSimilarity', 'contentAnalysis', 'ruleBasedLayout'] as const
    
    for (const dimension of dimensions) {
      const dimScore = qualityScores[dimension]
      
      if (!dimScore || typeof dimScore.score !== 'number') {
        issues.push(`Missing or invalid ${dimension} score`)
        continue
      }

      if (dimScore.score < 0 || dimScore.score > 10) {
        issues.push(`${dimension} score must be between 0 and 10`)
      } else if (dimScore.score < GoldenReferenceValidator.MINIMUM_QUALITY_THRESHOLD) {
        warnings.push(`${dimension} score (${dimScore.score}) is below recommended minimum`)
      }

      // Validate dimension details exist
      if (!dimScore.details || typeof dimScore.details !== 'object') {
        warnings.push(`Missing detailed breakdown for ${dimension}`)
      }
    }

    // Check score consistency
    const avgDimensionScore = dimensions.reduce((sum, dim) => 
      sum + (qualityScores[dim]?.score || 0), 0) / dimensions.length
    
    const scoreDifference = Math.abs(qualityScores.composite - avgDimensionScore)
    if (scoreDifference > 1.0) {
      warnings.push(`Composite score (${qualityScores.composite}) differs significantly from dimension average (${avgDimensionScore.toFixed(2)})`)
    }

    return { issues, warnings }
  }

  private validateApprovalInfo(goldenRef: GoldenReference): string[] {
    const issues: string[] = []
    const approval = goldenRef.metadata.approvalInfo

    if (!approval.approvedBy) {
      issues.push('Missing approval information (approvedBy)')
    }

    if (!approval.approvedDate) {
      issues.push('Missing approval date')
    } else {
      // Validate date format
      const approvalDate = new Date(approval.approvedDate)
      if (isNaN(approvalDate.getTime())) {
        issues.push('Invalid approval date format')
      } else {
        // Check if approval date is in the future
        if (approvalDate > new Date()) {
          issues.push('Approval date cannot be in the future')
        }
      }
    }

    if (!approval.approvalNotes) {
      issues.push('Missing approval notes')
    } else if (approval.approvalNotes.length < 10) {
      issues.push('Approval notes should be more descriptive (minimum 10 characters)')
    }

    return issues
  }

  private analyzeCoverage(goldenRefs: GoldenReference[]): string[] {
    const warnings: string[] = []
    
    // Analyze coverage by year group
    const yearGroups = new Set(goldenRefs.map(ref => ref.metadata.config.yearGroup))
    const expectedYearGroups = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6']
    
    for (const expectedYear of expectedYearGroups) {
      if (!yearGroups.has(expectedYear)) {
        warnings.push(`Missing golden references for ${expectedYear}`)
      }
    }

    // Analyze coverage by difficulty
    const difficulties = new Set(goldenRefs.map(ref => ref.metadata.config.difficulty))
    const expectedDifficulties = ['easy', 'average', 'hard']
    
    for (const expectedDifficulty of expectedDifficulties) {
      if (!difficulties.has(expectedDifficulty)) {
        warnings.push(`Limited coverage for ${expectedDifficulty} difficulty level`)
      }
    }

    // Analyze coverage by topic
    const topics = new Set(goldenRefs.map(ref => ref.metadata.config.topic))
    if (topics.size < 3) {
      warnings.push('Limited topic coverage - consider adding more diverse mathematical topics')
    }

    return warnings
  }
}

export interface ValidationResult {
  isValid: boolean
  issues: string[]
  warnings: string[]
  qualityScore: number
}

export interface SetValidationResult {
  totalReferences: number
  validReferences: number
  invalidReferences: number
  validationResults: Array<{ configId: string; result: ValidationResult }>
  coverageWarnings: string[]
  overallHealth: number
}