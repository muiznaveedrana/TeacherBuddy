/**
 * Batch Test Processor
 * Handles batch testing of multiple configurations with multiple variants
 */

import fs from 'fs/promises'
import path from 'path'
import { ABTestConfig, ABTestResult, BatchTestConfig } from '../types/engine-types'
import { ABTestRunner } from './test-runner'

export class BatchTestProcessor {
  private outputDir: string
  private abTestRunner: ABTestRunner

  constructor(outputDir: string = './results/batch-tests') {
    this.outputDir = outputDir
    this.abTestRunner = new ABTestRunner()
  }

  async runBatchTest(batchConfig: BatchTestConfig): Promise<BatchTestResult> {
    await this.ensureOutputDirectory()

    const batchId = `batch-${Date.now()}`
    const batchDir = path.join(this.outputDir, batchId)
    await fs.mkdir(batchDir, { recursive: true })

    // Save batch configuration
    await fs.writeFile(
      path.join(batchDir, 'batch-config.json'),
      JSON.stringify(batchConfig, null, 2)
    )

    console.log(`Starting batch test: ${batchConfig.batchName}`)
    console.log(`Configurations: ${batchConfig.configurations.length}`)
    console.log(`Variants: ${batchConfig.variants.join(', ')}`)

    const startTime = Date.now()
    const configurationResults: ConfigurationTestResult[] = []

    if (batchConfig.parallelExecution) {
      // Run all configurations in parallel
      const promises = batchConfig.configurations.map(configId =>
        this.runConfigurationBatch(configId, batchConfig, batchDir)
      )

      const results = await Promise.allSettled(promises)
      
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          configurationResults.push(result.value)
        } else {
          console.error(`Failed to test configuration ${batchConfig.configurations[index]}:`, result.reason)
          configurationResults.push({
            configId: batchConfig.configurations[index],
            status: 'failed',
            error: String(result.reason),
            results: [],
            processingTime: 0
          })
        }
      })
    } else {
      // Run configurations sequentially
      for (const configId of batchConfig.configurations) {
        try {
          const result = await this.runConfigurationBatch(configId, batchConfig, batchDir)
          configurationResults.push(result)
        } catch (error) {
          console.error(`Failed to test configuration ${configId}:`, error)
          configurationResults.push({
            configId,
            status: 'failed',
            error: String(error),
            results: [],
            processingTime: 0
          })
        }
      }
    }

    const endTime = Date.now()
    const totalTime = endTime - startTime

    // Analyze batch results
    const analysis = this.analyzeBatchResults(configurationResults)

    const batchResult: BatchTestResult = {
      batchId,
      batchName: batchConfig.batchName,
      timestamp: new Date().toISOString(),
      totalConfigurations: batchConfig.configurations.length,
      successfulConfigurations: configurationResults.filter(r => r.status === 'completed').length,
      failedConfigurations: configurationResults.filter(r => r.status === 'failed').length,
      totalProcessingTime: totalTime,
      configurationResults,
      analysis
    }

    // Save batch results
    await fs.writeFile(
      path.join(batchDir, 'batch-results.json'),
      JSON.stringify(batchResult, null, 2)
    )

    // Generate summary report
    await this.generateBatchReport(batchResult, batchDir)

    return batchResult
  }

  async loadPriorityConfigurations(configFile: string): Promise<string[]> {
    try {
      const configContent = await fs.readFile(configFile, 'utf-8')
      const configs = JSON.parse(configContent)
      
      if (!Array.isArray(configs)) {
        throw new Error('Configuration file must contain an array of configuration IDs')
      }

      return configs.filter(config => typeof config === 'string')
    } catch (error) {
      throw new Error(`Failed to load priority configurations: ${error}`)
    }
  }

  async runRegressionTest(
    baselineDir: string,
    newVariant: string,
    configurations: string[],
    outputDir?: string
  ): Promise<RegressionTestResult> {
    const regressionDir = outputDir || path.join(this.outputDir, `regression-${Date.now()}`)
    await fs.mkdir(regressionDir, { recursive: true })

    console.log(`Running regression test against baseline: ${baselineDir}`)
    console.log(`New variant: ${newVariant}`)

    const regressionResults: ConfigurationRegressionResult[] = []

    for (const configId of configurations) {
      try {
        const result = await this.runConfigurationRegression(
          configId,
          baselineDir,
          newVariant,
          regressionDir
        )
        regressionResults.push(result)
      } catch (error) {
        console.error(`Regression test failed for configuration ${configId}:`, error)
        regressionResults.push({
          configId,
          status: 'failed',
          error: String(error),
          baselineScore: 0,
          newVariantScore: 0,
          scoreDifference: 0,
          regressionDetected: false
        })
      }
    }

    const overallRegression = this.analyzeRegressionResults(regressionResults)

    const regressionResult: RegressionTestResult = {
      testId: `regression-${Date.now()}`,
      timestamp: new Date().toISOString(),
      baselineDir,
      newVariant,
      configurations,
      results: regressionResults,
      overallRegression,
      recommendation: this.generateRegressionRecommendation(regressionResults, overallRegression)
    }

    // Save regression results
    await fs.writeFile(
      path.join(regressionDir, 'regression-results.json'),
      JSON.stringify(regressionResult, null, 2)
    )

    return regressionResult
  }

  private async runConfigurationBatch(
    configId: string,
    batchConfig: BatchTestConfig,
    batchDir: string
  ): Promise<ConfigurationTestResult> {
    const configStartTime = Date.now()
    
    console.log(`  Processing configuration: ${configId}`)

    // Create A/B test configuration for this batch
    const abTestConfig: ABTestConfig = {
      testName: `${batchConfig.batchName}-${configId}`,
      configurations: [configId],
      promptVariants: batchConfig.variants.reduce((acc, variant) => {
        acc[variant] = `Prompt variant: ${variant}` // This would be resolved from actual prompt variants
        return acc
      }, {} as Record<string, string>),
      testSettings: {
        iterations: 3, // Default for batch testing
        parallelExecution: batchConfig.parallelExecution,
        qualityThreshold: 7.5,
        statisticalSignificance: 0.05
      }
    }

    try {
      // Run A/B test for this configuration
      const results = await this.abTestRunner.runABTest(abTestConfig)
      
      const configEndTime = Date.now()
      const processingTime = configEndTime - configStartTime

      return {
        configId,
        status: 'completed',
        results,
        processingTime
      }
    } catch (error) {
      const configEndTime = Date.now()
      const processingTime = configEndTime - configStartTime

      return {
        configId,
        status: 'failed',
        error: String(error),
        results: [],
        processingTime
      }
    }
  }

  private async runConfigurationRegression(
    configId: string,
    baselineDir: string,
    newVariant: string,
    regressionDir: string
  ): Promise<ConfigurationRegressionResult> {
    // Load baseline results
    const baselineScore = await this.loadBaselineScore(baselineDir, configId)
    
    // Run new variant test
    const newVariantScore = await this.runNewVariantTest(configId, newVariant, regressionDir)
    
    const scoreDifference = newVariantScore - baselineScore
    const regressionThreshold = -0.5 // 0.5 point drop is considered regression
    const regressionDetected = scoreDifference < regressionThreshold

    return {
      configId,
      status: 'completed',
      baselineScore,
      newVariantScore,
      scoreDifference,
      regressionDetected
    }
  }

  private async loadBaselineScore(baselineDir: string, configId: string): Promise<number> {
    try {
      const baselinePath = path.join(baselineDir, configId, 'baseline-score.json')
      const baselineContent = await fs.readFile(baselinePath, 'utf-8')
      const baseline = JSON.parse(baselineContent)
      return baseline.compositeScore || baseline.score || 0
    } catch (error) {
      // If no baseline found, assume a neutral baseline
      console.warn(`No baseline found for ${configId}, using default baseline score`)
      return 7.5
    }
  }

  private async runNewVariantTest(configId: string, variant: string, outputDir: string): Promise<number> {
    // This would integrate with the actual test runner
    // For now, return a mock score
    return 7.0 + Math.random() * 2
  }

  private analyzeBatchResults(configurationResults: ConfigurationTestResult[]): BatchAnalysis {
    const successful = configurationResults.filter(r => r.status === 'completed')
    const failed = configurationResults.filter(r => r.status === 'failed')

    if (successful.length === 0) {
      return {
        overallSuccess: false,
        averageQualityScore: 0,
        bestPerformingConfiguration: null,
        worstPerformingConfiguration: null,
        consistentWinners: [],
        qualityTrends: {}
      }
    }

    // Calculate average scores
    let totalScore = 0
    let scoreCount = 0
    const configScores: Record<string, number> = {}
    const variantPerformance: Record<string, number[]> = {}

    for (const result of successful) {
      for (const abResult of result.results) {
        for (const [variantName, variantResult] of Object.entries(abResult.variants)) {
          totalScore += variantResult.averageScore
          scoreCount++

          configScores[result.configId] = (configScores[result.configId] || 0) + variantResult.averageScore

          if (!variantPerformance[variantName]) {
            variantPerformance[variantName] = []
          }
          variantPerformance[variantName].push(variantResult.averageScore)
        }
      }
    }

    const averageQualityScore = scoreCount > 0 ? totalScore / scoreCount : 0

    // Find best and worst performing configurations
    const configIds = Object.keys(configScores)
    const bestConfig = configIds.reduce((best, current) => 
      configScores[current] > configScores[best] ? current : best, configIds[0])
    const worstConfig = configIds.reduce((worst, current) => 
      configScores[current] < configScores[worst] ? current : worst, configIds[0])

    // Identify consistent winners across configurations
    const variantAverages = Object.entries(variantPerformance).map(([variant, scores]) => ({
      variant,
      averageScore: scores.reduce((sum, score) => sum + score, 0) / scores.length,
      consistency: this.calculateConsistency(scores)
    }))

    const consistentWinners = variantAverages
      .filter(v => v.consistency > 0.8) // High consistency threshold
      .sort((a, b) => b.averageScore - a.averageScore)
      .slice(0, 3)
      .map(v => v.variant)

    return {
      overallSuccess: failed.length / configurationResults.length < 0.1, // 90% success rate
      averageQualityScore,
      bestPerformingConfiguration: bestConfig,
      worstPerformingConfiguration: worstConfig,
      consistentWinners,
      qualityTrends: variantPerformance
    }
  }

  private calculateConsistency(scores: number[]): number {
    if (scores.length < 2) return 1

    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length
    const coefficientOfVariation = Math.sqrt(variance) / mean

    // Convert coefficient of variation to consistency score (0-1)
    return Math.max(0, 1 - coefficientOfVariation)
  }

  private analyzeRegressionResults(results: ConfigurationRegressionResult[]): OverallRegression {
    const successful = results.filter(r => r.status === 'completed')
    
    if (successful.length === 0) {
      return {
        detected: false,
        severity: 'none',
        affectedConfigurations: 0,
        averageScoreDrop: 0
      }
    }

    const regressionResults = successful.filter(r => r.regressionDetected)
    const totalScoreDrop = successful.reduce((sum, r) => sum + Math.min(0, r.scoreDifference), 0)
    const averageScoreDrop = totalScoreDrop / successful.length

    let severity: 'none' | 'minor' | 'moderate' | 'severe' = 'none'
    
    if (regressionResults.length > 0) {
      const regressionPercentage = regressionResults.length / successful.length
      
      if (regressionPercentage > 0.5 || averageScoreDrop < -1.0) {
        severity = 'severe'
      } else if (regressionPercentage > 0.25 || averageScoreDrop < -0.5) {
        severity = 'moderate'
      } else {
        severity = 'minor'
      }
    }

    return {
      detected: regressionResults.length > 0,
      severity,
      affectedConfigurations: regressionResults.length,
      averageScoreDrop: Math.abs(averageScoreDrop)
    }
  }

  private generateRegressionRecommendation(
    results: ConfigurationRegressionResult[],
    overallRegression: OverallRegression
  ): string {
    if (!overallRegression.detected) {
      return 'No significant regression detected. New variant performs similarly to or better than baseline.'
    }

    const recommendations = []

    if (overallRegression.severity === 'severe') {
      recommendations.push('⚠️  SEVERE REGRESSION DETECTED - DO NOT DEPLOY')
      recommendations.push(`${overallRegression.affectedConfigurations} configurations show significant quality drops`)
      recommendations.push('Recommend reverting changes and investigating root cause')
    } else if (overallRegression.severity === 'moderate') {
      recommendations.push('⚠️  Moderate regression detected')
      recommendations.push('Review affected configurations before deployment')
      recommendations.push('Consider targeted fixes for regressed areas')
    } else {
      recommendations.push('Minor regression detected in some configurations')
      recommendations.push('Monitor closely in production')
      recommendations.push('Consider gradual rollout')
    }

    return recommendations.join('. ')
  }

  private async generateBatchReport(batchResult: BatchTestResult, batchDir: string): Promise<void> {
    const reportLines = [
      `# Batch Test Report: ${batchResult.batchName}`,
      ``,
      `**Batch ID:** ${batchResult.batchId}`,
      `**Timestamp:** ${batchResult.timestamp}`,
      `**Total Processing Time:** ${(batchResult.totalProcessingTime / 1000 / 60).toFixed(2)} minutes`,
      ``,
      `## Summary`,
      `- Total Configurations: ${batchResult.totalConfigurations}`,
      `- Successful: ${batchResult.successfulConfigurations}`,
      `- Failed: ${batchResult.failedConfigurations}`,
      `- Success Rate: ${((batchResult.successfulConfigurations / batchResult.totalConfigurations) * 100).toFixed(1)}%`,
      ``,
      `## Analysis`,
      `- Overall Success: ${batchResult.analysis.overallSuccess ? '✅' : '❌'}`,
      `- Average Quality Score: ${batchResult.analysis.averageQualityScore.toFixed(2)}`,
      `- Best Configuration: ${batchResult.analysis.bestPerformingConfiguration || 'N/A'}`,
      `- Worst Configuration: ${batchResult.analysis.worstPerformingConfiguration || 'N/A'}`,
      `- Consistent Winners: ${batchResult.analysis.consistentWinners.join(', ') || 'None'}`,
      ``,
      `## Configuration Results`,
      ``
    ]

    for (const configResult of batchResult.configurationResults) {
      reportLines.push(`### ${configResult.configId}`)
      reportLines.push(`- Status: ${configResult.status}`)
      reportLines.push(`- Processing Time: ${(configResult.processingTime / 1000).toFixed(2)}s`)
      
      if (configResult.status === 'failed') {
        reportLines.push(`- Error: ${configResult.error}`)
      } else {
        reportLines.push(`- Tests Completed: ${configResult.results.length}`)
      }
      
      reportLines.push(``)
    }

    await fs.writeFile(
      path.join(batchDir, 'batch-report.md'),
      reportLines.join('\n')
    )
  }

  private async ensureOutputDirectory(): Promise<void> {
    await fs.mkdir(this.outputDir, { recursive: true })
  }
}

export interface BatchTestResult {
  batchId: string
  batchName: string
  timestamp: string
  totalConfigurations: number
  successfulConfigurations: number
  failedConfigurations: number
  totalProcessingTime: number
  configurationResults: ConfigurationTestResult[]
  analysis: BatchAnalysis
}

export interface ConfigurationTestResult {
  configId: string
  status: 'completed' | 'failed'
  results: ABTestResult[]
  processingTime: number
  error?: string
}

export interface BatchAnalysis {
  overallSuccess: boolean
  averageQualityScore: number
  bestPerformingConfiguration: string | null
  worstPerformingConfiguration: string | null
  consistentWinners: string[]
  qualityTrends: Record<string, number[]>
}

export interface RegressionTestResult {
  testId: string
  timestamp: string
  baselineDir: string
  newVariant: string
  configurations: string[]
  results: ConfigurationRegressionResult[]
  overallRegression: OverallRegression
  recommendation: string
}

export interface ConfigurationRegressionResult {
  configId: string
  status: 'completed' | 'failed'
  baselineScore: number
  newVariantScore: number
  scoreDifference: number
  regressionDetected: boolean
  error?: string
}

export interface OverallRegression {
  detected: boolean
  severity: 'none' | 'minor' | 'moderate' | 'severe'
  affectedConfigurations: number
  averageScoreDrop: number
}