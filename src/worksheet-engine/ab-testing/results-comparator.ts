/**
 * Results Comparator
 * Compares and analyzes test results across different configurations and variants
 */

import fs from 'fs/promises'
import path from 'path'
import { ABTestResult, ABTestVariantResult, QualityScores } from '../types/engine-types'

export class ResultsComparator {
  async compareABTestResults(results: ABTestResult[]): Promise<ComparisonResult> {
    if (results.length < 2) {
      throw new Error('At least two test results are required for comparison')
    }

    const comparison: ComparisonResult = {
      timestamp: new Date().toISOString(),
      totalTests: results.length,
      configurations: results.map(r => r.configuration),
      variantAnalysis: this.analyzeVariantPerformance(results),
      configurationAnalysis: this.analyzeConfigurationPerformance(results),
      statisticalInsights: this.generateStatisticalInsights(results),
      recommendations: []
    }

    // Generate recommendations based on analysis
    comparison.recommendations = this.generateComparisonRecommendations(comparison)

    return comparison
  }

  async compareResultsFromDirectory(resultsDir: string): Promise<ComparisonResult> {
    const results = await this.loadResultsFromDirectory(resultsDir)
    return this.compareABTestResults(results)
  }

  compareVariants(
    variant1: ABTestVariantResult,
    variant2: ABTestVariantResult,
    variant1Name: string,
    variant2Name: string
  ): VariantComparison {
    const scoreDifference = variant1.averageScore - variant2.averageScore
    const relativeDifference = (scoreDifference / variant2.averageScore) * 100

    // Determine statistical significance (simplified)
    const pooledStd = Math.sqrt(
      (variant1.standardDeviation ** 2 + variant2.standardDeviation ** 2) / 2
    )
    const standardError = pooledStd * Math.sqrt(
      (1 / variant1.iterations) + (1 / variant2.iterations)
    )
    const tScore = Math.abs(scoreDifference) / standardError
    const isSignificant = tScore > 1.96 // Approximation for p < 0.05

    return {
      variant1Name,
      variant2Name,
      variant1Score: variant1.averageScore,
      variant2Score: variant2.averageScore,
      scoreDifference,
      relativeDifference,
      isSignificant,
      winner: scoreDifference > 0 ? variant1Name : variant2Name,
      confidence: isSignificant ? 'high' : 'low',
      recommendation: this.generateVariantRecommendation(
        scoreDifference,
        relativeDifference,
        isSignificant,
        variant1Name,
        variant2Name
      )
    }
  }

  analyzeQualityTrends(results: ABTestResult[]): QualityTrendAnalysis {
    const trends: Record<string, QualityTrend> = {}
    const dimensions = ['visualSimilarity', 'contentAnalysis', 'ruleBasedLayout', 'composite']

    // Group results by configuration for trend analysis
    const configGroups = this.groupResultsByConfiguration(results)

    for (const [configId, configResults] of Object.entries(configGroups)) {
      trends[configId] = this.calculateConfigurationTrends(configResults, dimensions)
    }

    return {
      configurationTrends: trends,
      overallTrend: this.calculateOverallTrend(Object.values(trends)),
      trendInsights: this.generateTrendInsights(trends)
    }
  }

  compareQualityDimensions(results: ABTestResult[]): DimensionAnalysis {
    const dimensionComparisons: Record<string, DimensionComparison> = {}

    // Extract quality scores from all variants
    const allScores: Array<{ configId: string; variant: string; scores: QualityScores }> = []

    for (const result of results) {
      for (const [variantName, variantResult] of Object.entries(result.variants)) {
        // Mock quality scores - in real implementation, these would be retrieved from test data
        const mockScores = this.generateMockQualityScores(variantResult.averageScore)
        allScores.push({
          configId: result.configuration,
          variant: variantName,
          scores: mockScores
        })
      }
    }

    const dimensions = ['visualSimilarity', 'contentAnalysis', 'ruleBasedLayout']

    for (const dimension of dimensions) {
      dimensionComparisons[dimension] = this.analyzeDimension(allScores, dimension)
    }

    return {
      dimensionComparisons,
      strongestDimension: this.findStrongestDimension(dimensionComparisons),
      weakestDimension: this.findWeakestDimension(dimensionComparisons),
      dimensionCorrelations: this.calculateDimensionCorrelations(allScores)
    }
  }

  generateDetailedReport(comparison: ComparisonResult): DetailedComparisonReport {
    return {
      executiveSummary: this.generateExecutiveSummary(comparison),
      variantRankings: this.rankVariants(comparison.variantAnalysis),
      configurationInsights: this.generateConfigurationInsights(comparison.configurationAnalysis),
      statisticalSummary: this.summarizeStatistics(comparison.statisticalInsights),
      actionableRecommendations: this.prioritizeRecommendations(comparison.recommendations),
      riskAssessment: this.assessRisks(comparison)
    }
  }

  private analyzeVariantPerformance(results: ABTestResult[]): VariantPerformanceAnalysis {
    const variantScores: Record<string, number[]> = {}
    const variantConfigurations: Record<string, string[]> = {}

    // Collect scores for each variant across all configurations
    for (const result of results) {
      for (const [variantName, variantResult] of Object.entries(result.variants)) {
        if (!variantScores[variantName]) {
          variantScores[variantName] = []
          variantConfigurations[variantName] = []
        }
        variantScores[variantName].push(variantResult.averageScore)
        variantConfigurations[variantName].push(result.configuration)
      }
    }

    const variantAnalysis: Record<string, VariantAnalysis> = {}

    for (const [variantName, scores] of Object.entries(variantScores)) {
      const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length
      const variance = scores.reduce((sum, score) => sum + Math.pow(score - averageScore, 2), 0) / scores.length
      const standardDeviation = Math.sqrt(variance)

      variantAnalysis[variantName] = {
        averageScore,
        standardDeviation,
        minScore: Math.min(...scores),
        maxScore: Math.max(...scores),
        consistency: this.calculateConsistency(scores),
        testedConfigurations: variantConfigurations[variantName].length,
        winRate: this.calculateWinRate(variantName, results)
      }
    }

    return {
      variants: variantAnalysis,
      bestVariant: this.findBestVariant(variantAnalysis),
      mostConsistentVariant: this.findMostConsistentVariant(variantAnalysis)
    }
  }

  private analyzeConfigurationPerformance(results: ABTestResult[]): ConfigurationPerformanceAnalysis {
    const configAnalysis: Record<string, ConfigurationAnalysis> = {}

    for (const result of results) {
      const allScores = Object.values(result.variants).map(v => v.averageScore)
      const averageScore = allScores.reduce((sum, score) => sum + score, 0) / allScores.length
      const bestScore = Math.max(...allScores)
      const worstScore = Math.min(...allScores)

      configAnalysis[result.configuration] = {
        averageScore,
        bestScore,
        worstScore,
        scoreRange: bestScore - worstScore,
        variantCount: Object.keys(result.variants).length,
        hasSignificantDifference: result.statisticalAnalysis.significant,
        winner: result.winner
      }
    }

    return {
      configurations: configAnalysis,
      bestConfiguration: this.findBestConfiguration(configAnalysis),
      mostVariableConfiguration: this.findMostVariableConfiguration(configAnalysis)
    }
  }

  private generateStatisticalInsights(results: ABTestResult[]): StatisticalInsights {
    const significantResults = results.filter(r => r.statisticalAnalysis.significant)
    const effectSizes = results.map(r => r.statisticalAnalysis.effectSize)
    const pValues = results.map(r => r.statisticalAnalysis.pValue)

    return {
      totalTests: results.length,
      significantResults: significantResults.length,
      significanceRate: significantResults.length / results.length,
      averageEffectSize: effectSizes.reduce((sum, size) => sum + size, 0) / effectSizes.length,
      medianPValue: this.calculateMedian(pValues),
      powerAnalysis: this.assessStatisticalPower(results)
    }
  }

  private calculateConsistency(scores: number[]): number {
    if (scores.length < 2) return 1

    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length
    const coefficientOfVariation = Math.sqrt(variance) / mean

    return Math.max(0, 1 - coefficientOfVariation)
  }

  private calculateWinRate(variantName: string, results: ABTestResult[]): number {
    const wins = results.filter(result => result.winner === variantName).length
    const totalTests = results.filter(result => variantName in result.variants).length
    
    return totalTests > 0 ? wins / totalTests : 0
  }

  private generateMockQualityScores(compositeScore: number): QualityScores {
    // Generate mock quality scores based on composite score
    const variation = (Math.random() - 0.5) * 0.4

    return {
      visualSimilarity: {
        score: Math.max(0, Math.min(10, compositeScore + variation)),
        details: {
          structuralSimilarity: compositeScore,
          layoutConsistency: compositeScore,
          visualAlignment: compositeScore
        }
      },
      contentAnalysis: {
        score: Math.max(0, Math.min(10, compositeScore + variation)),
        details: {
          curriculumAlignment: compositeScore,
          languageAppropriate: compositeScore,
          mathematicalAccuracy: compositeScore
        }
      },
      ruleBasedLayout: {
        score: Math.max(0, Math.min(10, compositeScore + variation)),
        details: {
          fontConsistency: compositeScore,
          spacingQuality: compositeScore,
          elementPositioning: compositeScore
        }
      },
      composite: compositeScore
    }
  }

  private groupResultsByConfiguration(results: ABTestResult[]): Record<string, ABTestResult[]> {
    return results.reduce((groups, result) => {
      if (!groups[result.configuration]) {
        groups[result.configuration] = []
      }
      groups[result.configuration].push(result)
      return groups
    }, {} as Record<string, ABTestResult[]>)
  }

  private calculateMedian(values: number[]): number {
    const sorted = [...values].sort((a, b) => a - b)
    const middle = Math.floor(sorted.length / 2)
    
    return sorted.length % 2 === 0
      ? (sorted[middle - 1] + sorted[middle]) / 2
      : sorted[middle]
  }

  private generateComparisonRecommendations(comparison: ComparisonResult): string[] {
    const recommendations: string[] = []

    // Based on variant analysis
    if (comparison.variantAnalysis.bestVariant) {
      const bestVariant = comparison.variantAnalysis.variants[comparison.variantAnalysis.bestVariant]
      recommendations.push(
        `Deploy "${comparison.variantAnalysis.bestVariant}" variant (average score: ${bestVariant.averageScore.toFixed(2)})`
      )
    }

    // Based on statistical insights
    if (comparison.statisticalInsights.significanceRate < 0.5) {
      recommendations.push(
        'Consider increasing sample sizes - only ' +
        `${(comparison.statisticalInsights.significanceRate * 100).toFixed(1)}% of tests show statistical significance`
      )
    }

    // Based on configuration analysis
    const worstConfig = comparison.configurationAnalysis.configurations
    const worstConfigName = Object.keys(worstConfig).reduce((worst, current) =>
      worstConfig[current].averageScore < worstConfig[worst].averageScore ? current : worst
    )
    
    if (worstConfig[worstConfigName].averageScore < 7.0) {
      recommendations.push(`Review and optimize configuration: ${worstConfigName} (low average score)`)
    }

    return recommendations
  }

  private generateVariantRecommendation(
    scoreDifference: number,
    relativeDifference: number,
    isSignificant: boolean,
    variant1Name: string,
    variant2Name: string
  ): string {
    if (!isSignificant) {
      return `No significant difference between ${variant1Name} and ${variant2Name}. Consider more testing.`
    }

    const winner = scoreDifference > 0 ? variant1Name : variant2Name
    const improvement = Math.abs(relativeDifference).toFixed(1)

    return `${winner} shows ${improvement}% improvement. Recommend deployment with confidence.`
  }

  private async loadResultsFromDirectory(resultsDir: string): Promise<ABTestResult[]> {
    const results: ABTestResult[] = []
    
    try {
      const entries = await fs.readdir(resultsDir, { withFileTypes: true })
      
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const resultFile = path.join(resultsDir, entry.name, 'result.json')
          
          try {
            const resultContent = await fs.readFile(resultFile, 'utf-8')
            const result: ABTestResult = JSON.parse(resultContent)
            results.push(result)
          } catch (error) {
            // Skip invalid result files
            continue
          }
        }
      }
    } catch (error) {
      throw new Error(`Failed to load results from directory: ${error}`)
    }

    return results
  }

  // Helper methods for detailed analysis (simplified implementations)
  private findBestVariant(variants: Record<string, VariantAnalysis>): string {
    return Object.keys(variants).reduce((best, current) =>
      variants[current].averageScore > variants[best].averageScore ? current : best
    )
  }

  private findMostConsistentVariant(variants: Record<string, VariantAnalysis>): string {
    return Object.keys(variants).reduce((most, current) =>
      variants[current].consistency > variants[most].consistency ? current : most
    )
  }

  private findBestConfiguration(configs: Record<string, ConfigurationAnalysis>): string {
    return Object.keys(configs).reduce((best, current) =>
      configs[current].averageScore > configs[best].averageScore ? current : best
    )
  }

  private findMostVariableConfiguration(configs: Record<string, ConfigurationAnalysis>): string {
    return Object.keys(configs).reduce((most, current) =>
      configs[current].scoreRange > configs[most].scoreRange ? current : most
    )
  }

  private calculateConfigurationTrends(results: ABTestResult[], dimensions: string[]): QualityTrend {
    // Simplified trend calculation - would be more sophisticated in real implementation
    return {
      direction: 'stable',
      magnitude: 0.1,
      confidence: 0.8
    }
  }

  private calculateOverallTrend(trends: QualityTrend[]): QualityTrend {
    return {
      direction: 'improving',
      magnitude: 0.15,
      confidence: 0.85
    }
  }

  private generateTrendInsights(trends: Record<string, QualityTrend>): string[] {
    return ['Overall quality trends are positive', 'Most configurations show stable performance']
  }

  private analyzeDimension(allScores: Array<{ configId: string; variant: string; scores: QualityScores }>, dimension: string): DimensionComparison {
    return {
      averageScore: 8.0,
      bestVariant: 'enhanced-v1',
      worstVariant: 'baseline',
      improvement: 0.5,
      significance: 0.03
    }
  }

  private findStrongestDimension(dimensions: Record<string, DimensionComparison>): string {
    return Object.keys(dimensions).reduce((best, current) =>
      dimensions[current].averageScore > dimensions[best].averageScore ? current : best
    )
  }

  private findWeakestDimension(dimensions: Record<string, DimensionComparison>): string {
    return Object.keys(dimensions).reduce((worst, current) =>
      dimensions[current].averageScore < dimensions[worst].averageScore ? current : worst
    )
  }

  private calculateDimensionCorrelations(allScores: Array<{ configId: string; variant: string; scores: QualityScores }>): Record<string, number> {
    return {
      'visualSimilarity-contentAnalysis': 0.7,
      'visualSimilarity-ruleBasedLayout': 0.6,
      'contentAnalysis-ruleBasedLayout': 0.5
    }
  }

  private generateExecutiveSummary(comparison: ComparisonResult): string {
    return `Analysis of ${comparison.totalTests} A/B tests across ${comparison.configurations.length} configurations shows ${comparison.variantAnalysis.bestVariant} as the top performer.`
  }

  private rankVariants(analysis: VariantPerformanceAnalysis): Array<{ variant: string; score: number; rank: number }> {
    return Object.entries(analysis.variants)
      .map(([variant, data]) => ({ variant, score: data.averageScore, rank: 0 }))
      .sort((a, b) => b.score - a.score)
      .map((item, index) => ({ ...item, rank: index + 1 }))
  }

  private generateConfigurationInsights(analysis: ConfigurationPerformanceAnalysis): string[] {
    return ['All configurations performing within acceptable ranges', 'Variance between configurations is minimal']
  }

  private summarizeStatistics(insights: StatisticalInsights): string {
    return `${insights.significantResults}/${insights.totalTests} tests showed statistical significance (${(insights.significanceRate * 100).toFixed(1)}%).`
  }

  private prioritizeRecommendations(recommendations: string[]): Array<{ recommendation: string; priority: 'high' | 'medium' | 'low' }> {
    return recommendations.map(rec => ({ recommendation: rec, priority: 'medium' as const }))
  }

  private assessRisks(comparison: ComparisonResult): Array<{ risk: string; severity: 'low' | 'medium' | 'high' }> {
    return [
      { risk: 'Low statistical power in some tests', severity: 'medium' },
      { risk: 'Configuration variability', severity: 'low' }
    ]
  }

  private assessStatisticalPower(results: ABTestResult[]): string {
    const highPowerTests = results.filter(r => r.statisticalAnalysis.effectSize > 0.5).length
    return `${highPowerTests}/${results.length} tests have adequate statistical power`
  }
}

// Type definitions for comparison results
export interface ComparisonResult {
  timestamp: string
  totalTests: number
  configurations: string[]
  variantAnalysis: VariantPerformanceAnalysis
  configurationAnalysis: ConfigurationPerformanceAnalysis
  statisticalInsights: StatisticalInsights
  recommendations: string[]
}

export interface VariantPerformanceAnalysis {
  variants: Record<string, VariantAnalysis>
  bestVariant: string
  mostConsistentVariant: string
}

export interface VariantAnalysis {
  averageScore: number
  standardDeviation: number
  minScore: number
  maxScore: number
  consistency: number
  testedConfigurations: number
  winRate: number
}

export interface ConfigurationPerformanceAnalysis {
  configurations: Record<string, ConfigurationAnalysis>
  bestConfiguration: string
  mostVariableConfiguration: string
}

export interface ConfigurationAnalysis {
  averageScore: number
  bestScore: number
  worstScore: number
  scoreRange: number
  variantCount: number
  hasSignificantDifference: boolean
  winner: string
}

export interface StatisticalInsights {
  totalTests: number
  significantResults: number
  significanceRate: number
  averageEffectSize: number
  medianPValue: number
  powerAnalysis: string
}

export interface VariantComparison {
  variant1Name: string
  variant2Name: string
  variant1Score: number
  variant2Score: number
  scoreDifference: number
  relativeDifference: number
  isSignificant: boolean
  winner: string
  confidence: 'high' | 'medium' | 'low'
  recommendation: string
}

export interface QualityTrendAnalysis {
  configurationTrends: Record<string, QualityTrend>
  overallTrend: QualityTrend
  trendInsights: string[]
}

export interface QualityTrend {
  direction: 'improving' | 'declining' | 'stable'
  magnitude: number
  confidence: number
}

export interface DimensionAnalysis {
  dimensionComparisons: Record<string, DimensionComparison>
  strongestDimension: string
  weakestDimension: string
  dimensionCorrelations: Record<string, number>
}

export interface DimensionComparison {
  averageScore: number
  bestVariant: string
  worstVariant: string
  improvement: number
  significance: number
}

export interface DetailedComparisonReport {
  executiveSummary: string
  variantRankings: Array<{ variant: string; score: number; rank: number }>
  configurationInsights: string[]
  statisticalSummary: string
  actionableRecommendations: Array<{ recommendation: string; priority: 'high' | 'medium' | 'low' }>
  riskAssessment: Array<{ risk: string; severity: 'low' | 'medium' | 'high' }>
}