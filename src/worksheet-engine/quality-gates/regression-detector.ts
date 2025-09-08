/**
 * Regression Detector
 * Detects quality regressions by comparing current performance with historical baselines
 */

import fs from 'fs/promises'
import path from 'path'
import { QualityScores } from '../types/engine-types'

export class RegressionDetector {
  private historyDir: string
  private regressionThreshold: number
  private significanceLevel: number

  constructor(
    historyDir: string = './quality-history',
    regressionThreshold: number = 0.5,
    significanceLevel: number = 0.05
  ) {
    this.historyDir = historyDir
    this.regressionThreshold = regressionThreshold
    this.significanceLevel = significanceLevel
  }

  async detectRegression(
    currentScores: QualityScores,
    configId: string,
    variant: string = 'baseline'
  ): Promise<RegressionResult> {
    const historicalData = await this.loadHistoricalData(configId, variant)
    
    if (historicalData.length === 0) {
      // No historical data available - establish baseline
      await this.recordQualityScore(currentScores, configId, variant)
      
      return {
        regressionDetected: false,
        severity: 'none',
        currentScore: currentScores.composite,
        baselineScore: currentScores.composite,
        scoreDifference: 0,
        pValue: 1.0,
        confidence: 1.0,
        historicalDataPoints: 0,
        recommendation: 'First quality measurement recorded as baseline',
        regressionAnalysis: {
          trendDirection: 'stable',
          trendStrength: 0,
          volatility: 0,
          consistentlyDecreasing: false
        }
      }
    }

    const baselineStats = this.calculateBaselineStatistics(historicalData)
    const regressionAnalysis = this.analyzeRegressionTrend(historicalData, currentScores)
    
    const scoreDifference = currentScores.composite - baselineStats.mean
    const isSignificantRegression = this.isSignificantRegression(
      currentScores.composite,
      baselineStats,
      historicalData.length
    )

    const regressionDetected = isSignificantRegression && (scoreDifference < -this.regressionThreshold)
    const severity = this.assessRegressionSeverity(scoreDifference, regressionAnalysis, baselineStats)

    // Record current score for future comparisons
    await this.recordQualityScore(currentScores, configId, variant)

    return {
      regressionDetected,
      severity,
      currentScore: currentScores.composite,
      baselineScore: baselineStats.mean,
      scoreDifference,
      pValue: isSignificantRegression ? this.calculatePValue(currentScores.composite, baselineStats) : 1.0,
      confidence: isSignificantRegression ? 1 - this.significanceLevel : 0,
      historicalDataPoints: historicalData.length,
      recommendation: this.generateRegressionRecommendation(regressionDetected, severity, scoreDifference, regressionAnalysis),
      regressionAnalysis
    }
  }

  async detectBatchRegression(
    currentBatch: Array<{ scores: QualityScores; configId: string; variant?: string }>,
    comparisonWindow: number = 10
  ): Promise<BatchRegressionResult> {
    const individualResults: RegressionResult[] = []
    let detectedCount = 0
    let severeCount = 0
    let moderateCount = 0

    for (const item of currentBatch) {
      const result = await this.detectRegression(
        item.scores,
        item.configId,
        item.variant || 'baseline'
      )
      
      individualResults.push(result)
      
      if (result.regressionDetected) {
        detectedCount++
        if (result.severity === 'severe') severeCount++
        else if (result.severity === 'moderate') moderateCount++
      }
    }

    const regressionRate = currentBatch.length > 0 ? detectedCount / currentBatch.length : 0
    const overallSeverity = this.assessBatchSeverity(severeCount, moderateCount, currentBatch.length)

    return {
      totalConfigurations: currentBatch.length,
      regressionsDetected: detectedCount,
      regressionRate,
      severeRegressions: severeCount,
      moderateRegressions: moderateCount,
      overallSeverity,
      individualResults,
      batchRecommendation: this.generateBatchRecommendation(overallSeverity, regressionRate, detectedCount)
    }
  }

  async analyzeQualityTrends(
    configId: string,
    variant: string = 'baseline',
    windowSize: number = 20
  ): Promise<QualityTrendAnalysis> {
    const historicalData = await this.loadHistoricalData(configId, variant, windowSize)
    
    if (historicalData.length < 3) {
      return {
        configId,
        variant,
        dataPoints: historicalData.length,
        trend: 'insufficient-data',
        trendStrength: 0,
        volatility: 0,
        prediction: null,
        insights: ['Insufficient historical data for trend analysis (minimum 3 points required)']
      }
    }

    const trend = this.calculateTrend(historicalData)
    const volatility = this.calculateVolatility(historicalData)
    const prediction = this.predictNextScore(historicalData)
    const insights = this.generateTrendInsights(historicalData, trend, volatility)

    return {
      configId,
      variant,
      dataPoints: historicalData.length,
      trend: trend.direction,
      trendStrength: Math.abs(trend.slope),
      volatility,
      prediction,
      insights
    }
  }

  async compareMultipleVariants(
    configId: string,
    variants: string[],
    windowSize: number = 10
  ): Promise<VariantComparisonResult> {
    const variantAnalyses: Record<string, VariantAnalysis> = {}

    for (const variant of variants) {
      const historicalData = await this.loadHistoricalData(configId, variant, windowSize)
      
      if (historicalData.length > 0) {
        const stats = this.calculateBaselineStatistics(historicalData)
        const trend = this.calculateTrend(historicalData)
        
        variantAnalyses[variant] = {
          averageScore: stats.mean,
          standardDeviation: stats.standardDeviation,
          dataPoints: historicalData.length,
          trend: trend.direction,
          trendStrength: Math.abs(trend.slope),
          lastScore: historicalData[historicalData.length - 1].composite,
          stability: this.calculateStability(historicalData)
        }
      }
    }

    const bestVariant = this.findBestVariant(variantAnalyses)
    const mostStableVariant = this.findMostStableVariant(variantAnalyses)
    const recommendations = this.generateVariantRecommendations(variantAnalyses, bestVariant, mostStableVariant)

    return {
      configId,
      variants: variantAnalyses,
      bestVariant,
      mostStableVariant,
      recommendations
    }
  }

  async cleanupOldHistory(retainDays: number = 90): Promise<number> {
    let cleanedCount = 0
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - retainDays)

    try {
      const configDirs = await fs.readdir(this.historyDir, { withFileTypes: true })
      
      for (const configDir of configDirs) {
        if (configDir.isDirectory()) {
          const configPath = path.join(this.historyDir, configDir.name)
          const variantFiles = await fs.readdir(configPath)
          
          for (const variantFile of variantFiles) {
            if (variantFile.endsWith('.json')) {
              const filePath = path.join(configPath, variantFile)
              const fileContent = await fs.readFile(filePath, 'utf-8')
              const data: HistoricalQualityData = JSON.parse(fileContent)
              
              const originalLength = data.history.length
              data.history = data.history.filter(entry => 
                new Date(entry.timestamp) > cutoffDate
              )
              
              if (data.history.length !== originalLength) {
                await fs.writeFile(filePath, JSON.stringify(data, null, 2))
                cleanedCount += originalLength - data.history.length
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error cleaning up history:', error)
    }

    return cleanedCount
  }

  private async loadHistoricalData(
    configId: string,
    variant: string,
    maxEntries?: number
  ): Promise<QualityScores[]> {
    try {
      const filePath = path.join(this.historyDir, configId, `${variant}.json`)
      const fileContent = await fs.readFile(filePath, 'utf-8')
      const data: HistoricalQualityData = JSON.parse(fileContent)
      
      const history = data.history.sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )

      if (maxEntries && history.length > maxEntries) {
        return history.slice(-maxEntries).map(entry => entry.qualityScores)
      }

      return history.map(entry => entry.qualityScores)
    } catch (error) {
      return []
    }
  }

  private async recordQualityScore(
    qualityScores: QualityScores,
    configId: string,
    variant: string
  ): Promise<void> {
    const configDir = path.join(this.historyDir, configId)
    await fs.mkdir(configDir, { recursive: true })

    const filePath = path.join(configDir, `${variant}.json`)
    
    let data: HistoricalQualityData
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8')
      data = JSON.parse(fileContent)
    } catch (error) {
      data = {
        configId,
        variant,
        history: []
      }
    }

    data.history.push({
      timestamp: new Date().toISOString(),
      qualityScores
    })

    // Keep only last 100 entries to prevent unlimited growth
    if (data.history.length > 100) {
      data.history = data.history.slice(-100)
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
  }

  private calculateBaselineStatistics(historicalData: QualityScores[]): BaselineStatistics {
    const compositeScores = historicalData.map(data => data.composite)
    const mean = compositeScores.reduce((sum, score) => sum + score, 0) / compositeScores.length
    
    const variance = compositeScores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / compositeScores.length
    const standardDeviation = Math.sqrt(variance)

    return {
      mean,
      standardDeviation,
      min: Math.min(...compositeScores),
      max: Math.max(...compositeScores),
      count: compositeScores.length
    }
  }

  private isSignificantRegression(
    currentScore: number,
    baselineStats: BaselineStatistics,
    sampleSize: number
  ): boolean {
    if (sampleSize < 2) return false

    // Perform one-sample t-test
    const tStatistic = (currentScore - baselineStats.mean) / (baselineStats.standardDeviation / Math.sqrt(sampleSize))
    const degreesOfFreedom = sampleSize - 1
    
    // Critical value for one-tailed test at significance level
    const criticalValue = this.getTCriticalValue(degreesOfFreedom, this.significanceLevel)
    
    return tStatistic < -criticalValue // Negative because we're testing for regression
  }

  private calculatePValue(currentScore: number, baselineStats: BaselineStatistics): number {
    // Simplified p-value calculation
    const zScore = (currentScore - baselineStats.mean) / baselineStats.standardDeviation
    return this.normalCDF(zScore)
  }

  private normalCDF(z: number): number {
    // Approximation of standard normal CDF
    return 0.5 * (1 + this.erf(z / Math.sqrt(2)))
  }

  private erf(x: number): number {
    // Approximation of error function
    const a1 = 0.254829592
    const a2 = -0.284496736
    const a3 = 1.421413741
    const a4 = -1.453152027
    const a5 = 1.061405429
    const p = 0.3275911

    const sign = x >= 0 ? 1 : -1
    x = Math.abs(x)

    const t = 1 / (1 + p * x)
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)

    return sign * y
  }

  private getTCriticalValue(degreesOfFreedom: number, alpha: number): number {
    // Simplified t-distribution critical values
    // In a real implementation, this would use proper t-distribution tables
    if (degreesOfFreedom >= 30) return 1.645 // Approximate normal
    if (degreesOfFreedom >= 10) return 1.812
    if (degreesOfFreedom >= 5) return 2.015
    return 2.571
  }

  private analyzeRegressionTrend(
    historicalData: QualityScores[],
    currentScores: QualityScores
  ): RegressionTrendAnalysis {
    if (historicalData.length < 3) {
      return {
        trendDirection: 'stable',
        trendStrength: 0,
        volatility: 0,
        consistentlyDecreasing: false
      }
    }

    const scores = [...historicalData.map(d => d.composite), currentScores.composite]
    const trend = this.calculateTrend(historicalData)
    const volatility = this.calculateVolatility(historicalData)

    // Check for consistent decrease in last few data points
    const recentWindow = Math.min(5, scores.length)
    const recentScores = scores.slice(-recentWindow)
    const consistentlyDecreasing = this.isConsistentlyDecreasing(recentScores)

    return {
      trendDirection: trend.direction,
      trendStrength: Math.abs(trend.slope),
      volatility,
      consistentlyDecreasing
    }
  }

  private calculateTrend(data: QualityScores[]): { direction: TrendDirection; slope: number } {
    const scores = data.map(d => d.composite)
    const n = scores.length
    
    // Linear regression to find trend
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0
    
    for (let i = 0; i < n; i++) {
      sumX += i
      sumY += scores[i]
      sumXY += i * scores[i]
      sumX2 += i * i
    }

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    
    let direction: TrendDirection
    if (Math.abs(slope) < 0.01) {
      direction = 'stable'
    } else if (slope > 0) {
      direction = 'improving'
    } else {
      direction = 'declining'
    }

    return { direction, slope }
  }

  private calculateVolatility(data: QualityScores[]): number {
    const scores = data.map(d => d.composite)
    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length
    
    return Math.sqrt(variance)
  }

  private isConsistentlyDecreasing(scores: number[]): boolean {
    if (scores.length < 3) return false
    
    let decreaseCount = 0
    for (let i = 1; i < scores.length; i++) {
      if (scores[i] < scores[i - 1]) {
        decreaseCount++
      }
    }
    
    return decreaseCount >= scores.length - 2 // Allow for one non-decreasing step
  }

  private assessRegressionSeverity(
    scoreDifference: number,
    regressionAnalysis: RegressionTrendAnalysis,
    baselineStats: BaselineStatistics
  ): RegressionSeverity {
    if (scoreDifference >= 0) return 'none'

    const relativeDrop = Math.abs(scoreDifference) / baselineStats.mean
    const isConsistentTrend = regressionAnalysis.consistentlyDecreasing

    if (relativeDrop > 0.15 || (relativeDrop > 0.10 && isConsistentTrend)) {
      return 'severe'
    } else if (relativeDrop > 0.08 || (relativeDrop > 0.05 && isConsistentTrend)) {
      return 'moderate'
    } else if (Math.abs(scoreDifference) > this.regressionThreshold) {
      return 'minor'
    } else {
      return 'none'
    }
  }

  private assessBatchSeverity(
    severeCount: number,
    moderateCount: number,
    totalCount: number
  ): RegressionSeverity {
    const severeRate = severeCount / totalCount
    const moderateRate = moderateCount / totalCount

    if (severeRate > 0.2 || (severeRate > 0.1 && moderateRate > 0.3)) {
      return 'severe'
    } else if (severeRate > 0 || moderateRate > 0.25) {
      return 'moderate'
    } else if ((severeCount + moderateCount) / totalCount > 0.1) {
      return 'minor'
    } else {
      return 'none'
    }
  }

  private generateRegressionRecommendation(
    regressionDetected: boolean,
    severity: RegressionSeverity,
    scoreDifference: number,
    analysis: RegressionTrendAnalysis
  ): string {
    if (!regressionDetected) {
      return 'No significant regression detected. Quality remains within acceptable bounds.'
    }

    const recommendations = []

    switch (severity) {
      case 'severe':
        recommendations.push('🚨 SEVERE REGRESSION DETECTED')
        recommendations.push('Immediate rollback recommended')
        recommendations.push('Conduct thorough investigation before any deployment')
        break
      case 'moderate':
        recommendations.push('⚠️ Moderate regression detected')
        recommendations.push('Review changes and consider fixes before deployment')
        break
      case 'minor':
        recommendations.push('⚠️ Minor regression detected')
        recommendations.push('Monitor closely but may proceed with caution')
        break
    }

    if (analysis.consistentlyDecreasing) {
      recommendations.push('⬇️ Consistent downward trend observed - investigate underlying causes')
    }

    if (analysis.volatility > 1.0) {
      recommendations.push('📊 High quality volatility detected - review test consistency')
    }

    recommendations.push(`Score dropped by ${Math.abs(scoreDifference).toFixed(2)} points`)

    return recommendations.join('. ')
  }

  private generateBatchRecommendation(
    severity: RegressionSeverity,
    regressionRate: number,
    detectedCount: number
  ): string {
    if (severity === 'none') {
      return '✅ No significant regressions detected in batch. Safe to proceed.'
    }

    const recommendations = []

    switch (severity) {
      case 'severe':
        recommendations.push('🚨 BATCH DEPLOYMENT BLOCKED')
        recommendations.push('Multiple severe regressions detected')
        recommendations.push('Comprehensive review and fixes required')
        break
      case 'moderate':
        recommendations.push('⚠️ Batch shows concerning regression patterns')
        recommendations.push('Address identified issues before deployment')
        break
      case 'minor':
        recommendations.push('⚠️ Some minor regressions detected')
        recommendations.push('Monitor affected configurations closely')
        break
    }

    recommendations.push(
      `${detectedCount} configurations affected (${(regressionRate * 100).toFixed(1)}% regression rate)`
    )

    return recommendations.join('. ')
  }

  // Additional helper methods for trend analysis and variant comparison
  private predictNextScore(data: QualityScores[]): number | null {
    if (data.length < 3) return null

    const trend = this.calculateTrend(data)
    const lastScore = data[data.length - 1].composite
    
    return lastScore + trend.slope
  }

  private generateTrendInsights(
    data: QualityScores[],
    trend: { direction: TrendDirection; slope: number },
    volatility: number
  ): string[] {
    const insights = []

    if (trend.direction === 'improving') {
      insights.push(`📈 Quality trending upward (slope: +${trend.slope.toFixed(3)})`)
    } else if (trend.direction === 'declining') {
      insights.push(`📉 Quality trending downward (slope: ${trend.slope.toFixed(3)})`)
    } else {
      insights.push('📊 Quality remains stable over time')
    }

    if (volatility > 1.0) {
      insights.push('⚡ High volatility - consider reviewing test consistency')
    } else if (volatility < 0.3) {
      insights.push('🎯 Low volatility - consistent quality measurements')
    }

    const recentScores = data.slice(-5).map(d => d.composite)
    const recentAverage = recentScores.reduce((sum, score) => sum + score, 0) / recentScores.length
    const overallAverage = data.map(d => d.composite).reduce((sum, score) => sum + score, 0) / data.length

    if (recentAverage > overallAverage + 0.5) {
      insights.push('🚀 Recent performance significantly above historical average')
    } else if (recentAverage < overallAverage - 0.5) {
      insights.push('⚠️ Recent performance below historical average')
    }

    return insights
  }

  private calculateStability(data: QualityScores[]): number {
    const scores = data.map(d => d.composite)
    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length
    const coefficientOfVariation = Math.sqrt(variance) / mean
    
    return Math.max(0, 1 - coefficientOfVariation) // Higher values = more stable
  }

  private findBestVariant(variants: Record<string, VariantAnalysis>): string | null {
    const variantNames = Object.keys(variants)
    if (variantNames.length === 0) return null

    return variantNames.reduce((best, current) =>
      variants[current].averageScore > variants[best].averageScore ? current : best
    )
  }

  private findMostStableVariant(variants: Record<string, VariantAnalysis>): string | null {
    const variantNames = Object.keys(variants)
    if (variantNames.length === 0) return null

    return variantNames.reduce((mostStable, current) =>
      variants[current].stability > variants[mostStable].stability ? current : mostStable
    )
  }

  private generateVariantRecommendations(
    variants: Record<string, VariantAnalysis>,
    bestVariant: string | null,
    mostStableVariant: string | null
  ): string[] {
    const recommendations = []

    if (bestVariant) {
      const best = variants[bestVariant]
      recommendations.push(
        `🏆 Best performing variant: ${bestVariant} (avg: ${best.averageScore.toFixed(2)})`
      )
    }

    if (mostStableVariant && mostStableVariant !== bestVariant) {
      const stable = variants[mostStableVariant]
      recommendations.push(
        `🎯 Most stable variant: ${mostStableVariant} (stability: ${stable.stability.toFixed(2)})`
      )
    }

    // Look for concerning trends
    for (const [name, analysis] of Object.entries(variants)) {
      if (analysis.trend === 'declining' && analysis.trendStrength > 0.05) {
        recommendations.push(`⚠️ ${name} shows declining trend - investigate`)
      }
    }

    return recommendations
  }
}

// Type definitions
export type RegressionSeverity = 'none' | 'minor' | 'moderate' | 'severe'
export type TrendDirection = 'improving' | 'stable' | 'declining'

export interface RegressionResult {
  regressionDetected: boolean
  severity: RegressionSeverity
  currentScore: number
  baselineScore: number
  scoreDifference: number
  pValue: number
  confidence: number
  historicalDataPoints: number
  recommendation: string
  regressionAnalysis: RegressionTrendAnalysis
}

export interface RegressionTrendAnalysis {
  trendDirection: TrendDirection
  trendStrength: number
  volatility: number
  consistentlyDecreasing: boolean
}

export interface BatchRegressionResult {
  totalConfigurations: number
  regressionsDetected: number
  regressionRate: number
  severeRegressions: number
  moderateRegressions: number
  overallSeverity: RegressionSeverity
  individualResults: RegressionResult[]
  batchRecommendation: string
}

export interface QualityTrendAnalysis {
  configId: string
  variant: string
  dataPoints: number
  trend: TrendDirection | 'insufficient-data'
  trendStrength: number
  volatility: number
  prediction: number | null
  insights: string[]
}

export interface VariantComparisonResult {
  configId: string
  variants: Record<string, VariantAnalysis>
  bestVariant: string | null
  mostStableVariant: string | null
  recommendations: string[]
}

export interface VariantAnalysis {
  averageScore: number
  standardDeviation: number
  dataPoints: number
  trend: TrendDirection
  trendStrength: number
  lastScore: number
  stability: number
}

export interface BaselineStatistics {
  mean: number
  standardDeviation: number
  min: number
  max: number
  count: number
}

export interface HistoricalQualityData {
  configId: string
  variant: string
  history: Array<{
    timestamp: string
    qualityScores: QualityScores
  }>
}