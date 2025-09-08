/**
 * A/B Test Runner
 * Executes A/B tests with multiple prompt variants
 */

import fs from 'fs/promises'
import path from 'path'
import { ABTestConfig, ABTestResult, ABTestVariantResult, EngineConfig, QualityScores } from '../types/engine-types'
import { StatisticalAnalysis } from './statistical-analysis'

export class ABTestRunner {
  private outputDir: string
  private statisticalAnalysis: StatisticalAnalysis
  private worksheetGenerator: any // Will be injected
  private qualityAssessment: any // Will be injected

  constructor(
    outputDir: string = './results/ab-tests',
    worksheetGenerator?: any,
    qualityAssessment?: any
  ) {
    this.outputDir = outputDir
    this.statisticalAnalysis = new StatisticalAnalysis()
    this.worksheetGenerator = worksheetGenerator
    this.qualityAssessment = qualityAssessment
  }

  async runABTest(testConfig: ABTestConfig): Promise<ABTestResult[]> {
    await this.ensureOutputDirectory()
    
    const testId = `ab-test-${Date.now()}`
    const testDir = path.join(this.outputDir, testId)
    await fs.mkdir(testDir, { recursive: true })

    // Save test configuration
    await fs.writeFile(
      path.join(testDir, 'test-config.json'),
      JSON.stringify(testConfig, null, 2)
    )

    const results: ABTestResult[] = []

    // Run tests for each configuration
    for (const configId of testConfig.configurations) {
      console.log(`Running A/B test for configuration: ${configId}`)
      
      const configResult = await this.runConfigurationTest(
        testId,
        configId,
        testConfig,
        testDir
      )
      
      results.push(configResult)
    }

    // Save overall results
    await fs.writeFile(
      path.join(testDir, 'results.json'),
      JSON.stringify(results, null, 2)
    )

    return results
  }

  async runSingleVariantComparison(
    configId: string,
    variant1: string,
    variant2: string,
    iterations: number = 5
  ): Promise<ABTestResult> {
    const testConfig: ABTestConfig = {
      testName: `single-comparison-${configId}-${Date.now()}`,
      configurations: [configId],
      promptVariants: {
        [variant1]: `Prompt variant: ${variant1}`,
        [variant2]: `Prompt variant: ${variant2}`
      },
      testSettings: {
        iterations,
        parallelExecution: false,
        qualityThreshold: 7.5,
        statisticalSignificance: 0.05
      }
    }

    const results = await this.runABTest(testConfig)
    return results[0]
  }

  private async runConfigurationTest(
    testId: string,
    configId: string,
    testConfig: ABTestConfig,
    testDir: string
  ): Promise<ABTestResult> {
    const configDir = path.join(testDir, configId)
    await fs.mkdir(configDir, { recursive: true })

    const variantResults: Record<string, ABTestVariantResult> = {}

    // Test each variant
    for (const [variantName, variantPrompt] of Object.entries(testConfig.promptVariants)) {
      console.log(`  Testing variant: ${variantName}`)
      
      const variantResult = await this.runVariantTest(
        configId,
        variantName,
        variantPrompt,
        testConfig.testSettings.iterations,
        configDir,
        testConfig.testSettings.parallelExecution
      )
      
      variantResults[variantName] = variantResult
    }

    // Perform statistical analysis
    const statisticalAnalysis = this.statisticalAnalysis.compareVariants(variantResults)
    const winner = this.determineWinner(variantResults, statisticalAnalysis)

    const result: ABTestResult = {
      testId: `${testId}-${configId}`,
      timestamp: new Date().toISOString(),
      configuration: configId,
      variants: variantResults,
      statisticalAnalysis,
      recommendation: this.generateRecommendation(variantResults, statisticalAnalysis, winner),
      winner
    }

    // Save configuration-specific results
    await fs.writeFile(
      path.join(configDir, 'result.json'),
      JSON.stringify(result, null, 2)
    )

    return result
  }

  private async runVariantTest(
    configId: string,
    variantName: string,
    variantPrompt: string,
    iterations: number,
    configDir: string,
    parallelExecution: boolean
  ): Promise<ABTestVariantResult> {
    const variantDir = path.join(configDir, variantName)
    await fs.mkdir(variantDir, { recursive: true })

    const scores: number[] = []
    const promises: Promise<number>[] = []

    for (let i = 0; i < iterations; i++) {
      const iterationTask = this.runSingleIteration(
        configId,
        variantName,
        variantPrompt,
        i + 1,
        variantDir
      )

      if (parallelExecution) {
        promises.push(iterationTask)
      } else {
        const score = await iterationTask
        scores.push(score)
      }
    }

    if (parallelExecution && promises.length > 0) {
      const parallelScores = await Promise.all(promises)
      scores.push(...parallelScores)
    }

    // Calculate statistics
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - averageScore, 2), 0) / scores.length
    const standardDeviation = Math.sqrt(variance)

    return {
      averageScore,
      standardDeviation,
      iterations: scores.length,
      scores
    }
  }

  private async runSingleIteration(
    configId: string,
    variantName: string,
    variantPrompt: string,
    iteration: number,
    variantDir: string
  ): Promise<number> {
    const iterationDir = path.join(variantDir, `iteration-${iteration}`)
    await fs.mkdir(iterationDir, { recursive: true })

    try {
      // Generate worksheet with this variant
      // Note: This would integrate with the actual worksheet generation service
      const worksheetResult = await this.generateWorksheet(configId, variantPrompt, iterationDir)
      
      // Assess quality
      const qualityResult = await this.assessQuality(worksheetResult.pdfPath, worksheetResult.htmlPath, configId)
      
      // Save iteration results
      const iterationResult = {
        iteration,
        variantName,
        configId,
        qualityScores: qualityResult,
        compositeScore: qualityResult.composite,
        generatedAt: new Date().toISOString(),
        worksheetPath: worksheetResult.pdfPath
      }

      await fs.writeFile(
        path.join(iterationDir, 'iteration-result.json'),
        JSON.stringify(iterationResult, null, 2)
      )

      return qualityResult.composite
    } catch (error) {
      console.error(`Error in iteration ${iteration} for variant ${variantName}:`, error)
      
      // Return a low score for failed iterations
      return 0
    }
  }

  private async generateWorksheet(configId: string, variantPrompt: string, outputDir: string): Promise<{ pdfPath: string; htmlPath: string }> {
    // This is a placeholder for the actual worksheet generation
    // In the real implementation, this would integrate with the worksheet generation service
    
    if (this.worksheetGenerator) {
      return await this.worksheetGenerator.generate(configId, variantPrompt, outputDir)
    }

    // Mock implementation for testing
    const pdfPath = path.join(outputDir, 'worksheet.pdf')
    const htmlPath = path.join(outputDir, 'worksheet.html')
    
    await fs.writeFile(pdfPath, 'Mock PDF content')
    await fs.writeFile(htmlPath, '<html><body>Mock HTML content</body></html>')
    
    return { pdfPath, htmlPath }
  }

  private async assessQuality(pdfPath: string, htmlPath: string, configId: string): Promise<QualityScores> {
    // This is a placeholder for the actual quality assessment
    // In the real implementation, this would integrate with the quality assessment service
    
    if (this.qualityAssessment) {
      return await this.qualityAssessment.assess(pdfPath, htmlPath, configId)
    }

    // Mock implementation for testing
    const baseScore = 7 + Math.random() * 2 // Random score between 7-9
    
    return {
      visualSimilarity: {
        score: baseScore + (Math.random() - 0.5) * 0.4,
        details: {
          structuralSimilarity: baseScore,
          layoutConsistency: baseScore,
          visualAlignment: baseScore
        }
      },
      contentAnalysis: {
        score: baseScore + (Math.random() - 0.5) * 0.4,
        details: {
          curriculumAlignment: baseScore,
          languageAppropriate: baseScore,
          mathematicalAccuracy: baseScore
        }
      },
      ruleBasedLayout: {
        score: baseScore + (Math.random() - 0.5) * 0.4,
        details: {
          fontConsistency: baseScore,
          spacingQuality: baseScore,
          elementPositioning: baseScore
        }
      },
      composite: baseScore + (Math.random() - 0.5) * 0.3
    }
  }

  private determineWinner(
    variantResults: Record<string, ABTestVariantResult>,
    statisticalAnalysis: any
  ): string {
    let bestVariant = ''
    let bestScore = -1

    for (const [variantName, result] of Object.entries(variantResults)) {
      if (result.averageScore > bestScore) {
        bestScore = result.averageScore
        bestVariant = variantName
      }
    }

    // Only declare a winner if the result is statistically significant
    if (statisticalAnalysis.significant) {
      return bestVariant
    }

    return 'inconclusive'
  }

  private generateRecommendation(
    variantResults: Record<string, ABTestVariantResult>,
    statisticalAnalysis: any,
    winner: string
  ): string {
    if (winner === 'inconclusive') {
      return 'Results are not statistically significant. Consider running more iterations or adjusting test parameters.'
    }

    const winnerResult = variantResults[winner]
    const otherVariants = Object.entries(variantResults).filter(([name]) => name !== winner)

    if (otherVariants.length === 0) {
      return `${winner} is the only variant tested.`
    }

    const [otherName, otherResult] = otherVariants[0]
    const improvement = ((winnerResult.averageScore - otherResult.averageScore) / otherResult.averageScore * 100).toFixed(1)

    return `${winner} shows statistically significant improvement over ${otherName} (+${improvement}% quality score). ` +
           `Recommend deploying ${winner} with confidence level ${((1 - statisticalAnalysis.pValue) * 100).toFixed(1)}%.`
  }

  private async ensureOutputDirectory(): Promise<void> {
    await fs.mkdir(this.outputDir, { recursive: true })
  }

  // Public method to inject dependencies
  setWorksheetGenerator(generator: any): void {
    this.worksheetGenerator = generator
  }

  setQualityAssessment(assessment: any): void {
    this.qualityAssessment = assessment
  }
}