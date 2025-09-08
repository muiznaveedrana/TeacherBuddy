/**
 * Threshold Validator
 * Validates quality scores against configurable thresholds
 */

import { QualityScores, QualityGateConfig, QualityGateResult } from '../types/engine-types'

export class ThresholdValidator {
  private static readonly DEFAULT_CONFIG: QualityGateConfig = {
    minimumComposite: 7.5,
    minimumPerDimension: {
      visualSimilarity: 7.0,
      contentAnalysis: 8.0,
      ruleBasedLayout: 7.0
    },
    regressionThreshold: 0.5,
    approvalRequired: true
  }

  private config: QualityGateConfig

  constructor(config: QualityGateConfig = ThresholdValidator.DEFAULT_CONFIG) {
    this.config = config
  }

  validateQualityScores(qualityScores: QualityScores): QualityGateResult {
    const failedChecks: string[] = []
    
    // Validate composite score
    if (qualityScores.composite < this.config.minimumComposite) {
      failedChecks.push(
        `Composite score ${qualityScores.composite.toFixed(2)} below minimum threshold ${this.config.minimumComposite}`
      )
    }

    // Validate dimensional scores
    const dimensionChecks = this.validateDimensionalScores(qualityScores)
    failedChecks.push(...dimensionChecks)

    // Check for score consistency
    const consistencyChecks = this.validateScoreConsistency(qualityScores)
    failedChecks.push(...consistencyChecks)

    return {
      passed: failedChecks.length === 0,
      failedChecks,
      scores: qualityScores,
      thresholds: this.config
    }
  }

  validateBatch(qualityScoresBatch: QualityScores[]): BatchQualityGateResult {
    const results: QualityGateResult[] = []
    let passedCount = 0
    let totalScore = 0

    for (const scores of qualityScoresBatch) {
      const result = this.validateQualityScores(scores)
      results.push(result)
      
      if (result.passed) {
        passedCount++
      }
      
      totalScore += scores.composite
    }

    const passRate = qualityScoresBatch.length > 0 ? passedCount / qualityScoresBatch.length : 0
    const averageScore = qualityScoresBatch.length > 0 ? totalScore / qualityScoresBatch.length : 0

    return {
      totalTests: qualityScoresBatch.length,
      passedTests: passedCount,
      failedTests: qualityScoresBatch.length - passedCount,
      passRate,
      averageScore,
      results,
      batchPassed: passRate >= this.getBatchPassThreshold(),
      recommendations: this.generateBatchRecommendations(results, passRate, averageScore)
    }
  }

  validateAgainstBaseline(
    currentScores: QualityScores,
    baselineScores: QualityScores
  ): BaselineComparisonResult {
    const failedChecks: string[] = []
    const scoreDifferences: ScoreDifferences = {
      composite: currentScores.composite - baselineScores.composite,
      visualSimilarity: currentScores.visualSimilarity.score - baselineScores.visualSimilarity.score,
      contentAnalysis: currentScores.contentAnalysis.score - baselineScores.contentAnalysis.score,
      ruleBasedLayout: currentScores.ruleBasedLayout.score - baselineScores.ruleBasedLayout.score
    }

    // Check for regressions
    if (scoreDifferences.composite < -this.config.regressionThreshold) {
      failedChecks.push(
        `Composite score regression detected: ${scoreDifferences.composite.toFixed(2)} points below baseline`
      )
    }

    // Check dimensional regressions
    const dimensionNames = ['visualSimilarity', 'contentAnalysis', 'ruleBasedLayout'] as const
    
    for (const dimension of dimensionNames) {
      const diff = scoreDifferences[dimension]
      if (diff < -this.config.regressionThreshold) {
        failedChecks.push(
          `${dimension} regression detected: ${diff.toFixed(2)} points below baseline`
        )
      }
    }

    // Still validate against absolute thresholds
    const absoluteValidation = this.validateQualityScores(currentScores)
    failedChecks.push(...absoluteValidation.failedChecks)

    const regressionSeverity = this.assessRegressionSeverity(scoreDifferences)

    return {
      passed: failedChecks.length === 0,
      failedChecks,
      scoreDifferences,
      baselineScores,
      currentScores,
      regressionSeverity,
      recommendation: this.generateBaselineRecommendation(failedChecks, regressionSeverity, scoreDifferences)
    }
  }

  updateThresholds(newConfig: Partial<QualityGateConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }

  getThresholds(): QualityGateConfig {
    return { ...this.config }
  }

  validateCustomThresholds(
    qualityScores: QualityScores,
    customThresholds: CustomThresholds
  ): CustomValidationResult {
    const failedChecks: string[] = []
    const checkedThresholds: Array<{ name: string; value: number; threshold: number; passed: boolean }> = []

    // Validate custom composite threshold
    if (customThresholds.composite !== undefined) {
      const passed = qualityScores.composite >= customThresholds.composite
      checkedThresholds.push({
        name: 'composite',
        value: qualityScores.composite,
        threshold: customThresholds.composite,
        passed
      })
      
      if (!passed) {
        failedChecks.push(
          `Custom composite threshold not met: ${qualityScores.composite.toFixed(2)} < ${customThresholds.composite}`
        )
      }
    }

    // Validate custom dimensional thresholds
    if (customThresholds.visualSimilarity !== undefined) {
      const passed = qualityScores.visualSimilarity.score >= customThresholds.visualSimilarity
      checkedThresholds.push({
        name: 'visualSimilarity',
        value: qualityScores.visualSimilarity.score,
        threshold: customThresholds.visualSimilarity,
        passed
      })
      
      if (!passed) {
        failedChecks.push(
          `Custom visual similarity threshold not met: ${qualityScores.visualSimilarity.score.toFixed(2)} < ${customThresholds.visualSimilarity}`
        )
      }
    }

    if (customThresholds.contentAnalysis !== undefined) {
      const passed = qualityScores.contentAnalysis.score >= customThresholds.contentAnalysis
      checkedThresholds.push({
        name: 'contentAnalysis',
        value: qualityScores.contentAnalysis.score,
        threshold: customThresholds.contentAnalysis,
        passed
      })
      
      if (!passed) {
        failedChecks.push(
          `Custom content analysis threshold not met: ${qualityScores.contentAnalysis.score.toFixed(2)} < ${customThresholds.contentAnalysis}`
        )
      }
    }

    if (customThresholds.ruleBasedLayout !== undefined) {
      const passed = qualityScores.ruleBasedLayout.score >= customThresholds.ruleBasedLayout
      checkedThresholds.push({
        name: 'ruleBasedLayout',
        value: qualityScores.ruleBasedLayout.score,
        threshold: customThresholds.ruleBasedLayout,
        passed
      })
      
      if (!passed) {
        failedChecks.push(
          `Custom rule-based layout threshold not met: ${qualityScores.ruleBasedLayout.score.toFixed(2)} < ${customThresholds.ruleBasedLayout}`
        )
      }
    }

    return {
      passed: failedChecks.length === 0,
      failedChecks,
      checkedThresholds,
      qualityScores
    }
  }

  private validateDimensionalScores(qualityScores: QualityScores): string[] {
    const failedChecks: string[] = []
    
    if (qualityScores.visualSimilarity.score < this.config.minimumPerDimension.visualSimilarity) {
      failedChecks.push(
        `Visual similarity score ${qualityScores.visualSimilarity.score.toFixed(2)} below minimum threshold ${this.config.minimumPerDimension.visualSimilarity}`
      )
    }

    if (qualityScores.contentAnalysis.score < this.config.minimumPerDimension.contentAnalysis) {
      failedChecks.push(
        `Content analysis score ${qualityScores.contentAnalysis.score.toFixed(2)} below minimum threshold ${this.config.minimumPerDimension.contentAnalysis}`
      )
    }

    if (qualityScores.ruleBasedLayout.score < this.config.minimumPerDimension.ruleBasedLayout) {
      failedChecks.push(
        `Rule-based layout score ${qualityScores.ruleBasedLayout.score.toFixed(2)} below minimum threshold ${this.config.minimumPerDimension.ruleBasedLayout}`
      )
    }

    return failedChecks
  }

  private validateScoreConsistency(qualityScores: QualityScores): string[] {
    const failedChecks: string[] = []
    
    // Check if composite score is reasonable compared to dimensional scores
    const dimensionalAverage = (
      qualityScores.visualSimilarity.score +
      qualityScores.contentAnalysis.score +
      qualityScores.ruleBasedLayout.score
    ) / 3

    const compositeDifference = Math.abs(qualityScores.composite - dimensionalAverage)
    
    if (compositeDifference > 1.5) {
      failedChecks.push(
        `Composite score ${qualityScores.composite.toFixed(2)} differs significantly from dimensional average ${dimensionalAverage.toFixed(2)}`
      )
    }

    // Check for unrealistic score distributions
    const scores = [
      qualityScores.visualSimilarity.score,
      qualityScores.contentAnalysis.score,
      qualityScores.ruleBasedLayout.score,
      qualityScores.composite
    ]

    const minScore = Math.min(...scores)
    const maxScore = Math.max(...scores)
    const scoreRange = maxScore - minScore

    if (scoreRange > 3.0) {
      failedChecks.push(
        `Score range ${scoreRange.toFixed(2)} is unusually large - may indicate scoring inconsistencies`
      )
    }

    return failedChecks
  }

  private getBatchPassThreshold(): number {
    // Configurable batch pass threshold - could be made part of config
    return 0.8 // 80% of tests must pass
  }

  private generateBatchRecommendations(
    results: QualityGateResult[],
    passRate: number,
    averageScore: number
  ): string[] {
    const recommendations: string[] = []

    if (passRate < 0.5) {
      recommendations.push('🚨 Majority of tests failed - review thresholds and testing methodology')
    } else if (passRate < 0.8) {
      recommendations.push('⚠️ Low pass rate - consider adjusting quality processes')
    }

    if (averageScore < this.config.minimumComposite) {
      recommendations.push('📊 Average score below minimum - systemic quality issues detected')
    }

    // Analyze common failure patterns
    const failurePatterns = this.analyzeFailurePatterns(results)
    recommendations.push(...failurePatterns)

    if (recommendations.length === 0) {
      recommendations.push('✅ Batch quality meets all thresholds - good to proceed')
    }

    return recommendations
  }

  private analyzeFailurePatterns(results: QualityGateResult[]): string[] {
    const patterns: string[] = []
    const failedResults = results.filter(r => !r.passed)
    
    if (failedResults.length === 0) {
      return patterns
    }

    // Count dimensional failures
    const dimensionFailures = {
      composite: 0,
      visualSimilarity: 0,
      contentAnalysis: 0,
      ruleBasedLayout: 0
    }

    for (const result of failedResults) {
      for (const check of result.failedChecks) {
        if (check.includes('Composite score')) dimensionFailures.composite++
        if (check.includes('Visual similarity')) dimensionFailures.visualSimilarity++
        if (check.includes('Content analysis')) dimensionFailures.contentAnalysis++
        if (check.includes('Rule-based layout')) dimensionFailures.ruleBasedLayout++
      }
    }

    // Identify most common failure
    const maxFailures = Math.max(...Object.values(dimensionFailures))
    if (maxFailures > failedResults.length * 0.5) {
      const mostCommonFailure = Object.keys(dimensionFailures).find(
        key => dimensionFailures[key as keyof typeof dimensionFailures] === maxFailures
      )
      patterns.push(`🔍 Most common issue: ${mostCommonFailure} failures (${maxFailures}/${failedResults.length})`)
    }

    return patterns
  }

  private assessRegressionSeverity(scoreDifferences: ScoreDifferences): 'none' | 'minor' | 'moderate' | 'severe' {
    const maxRegression = Math.min(
      scoreDifferences.composite,
      scoreDifferences.visualSimilarity,
      scoreDifferences.contentAnalysis,
      scoreDifferences.ruleBasedLayout
    )

    if (maxRegression >= 0) return 'none'
    if (maxRegression >= -0.5) return 'minor'
    if (maxRegression >= -1.0) return 'moderate'
    return 'severe'
  }

  private generateBaselineRecommendation(
    failedChecks: string[],
    severity: 'none' | 'minor' | 'moderate' | 'severe',
    scoreDifferences: ScoreDifferences
  ): string {
    if (failedChecks.length === 0) {
      return '✅ All quality gates passed - no regression detected'
    }

    const recommendations = []

    switch (severity) {
      case 'severe':
        recommendations.push('🚨 SEVERE REGRESSION - DO NOT DEPLOY')
        recommendations.push('Immediate investigation required')
        break
      case 'moderate':
        recommendations.push('⚠️ Moderate regression detected')
        recommendations.push('Review changes before deployment')
        break
      case 'minor':
        recommendations.push('⚠️ Minor regression detected')
        recommendations.push('Monitor closely in production')
        break
    }

    // Add specific dimensional recommendations
    if (scoreDifferences.composite < -this.config.regressionThreshold) {
      recommendations.push(`Composite score dropped by ${Math.abs(scoreDifferences.composite).toFixed(2)} points`)
    }

    return recommendations.join('. ')
  }
}

// Supporting interfaces
export interface BatchQualityGateResult {
  totalTests: number
  passedTests: number
  failedTests: number
  passRate: number
  averageScore: number
  results: QualityGateResult[]
  batchPassed: boolean
  recommendations: string[]
}

export interface BaselineComparisonResult {
  passed: boolean
  failedChecks: string[]
  scoreDifferences: ScoreDifferences
  baselineScores: QualityScores
  currentScores: QualityScores
  regressionSeverity: 'none' | 'minor' | 'moderate' | 'severe'
  recommendation: string
}

export interface ScoreDifferences {
  composite: number
  visualSimilarity: number
  contentAnalysis: number
  ruleBasedLayout: number
}

export interface CustomThresholds {
  composite?: number
  visualSimilarity?: number
  contentAnalysis?: number
  ruleBasedLayout?: number
}

export interface CustomValidationResult {
  passed: boolean
  failedChecks: string[]
  checkedThresholds: Array<{
    name: string
    value: number
    threshold: number
    passed: boolean
  }>
  qualityScores: QualityScores
}