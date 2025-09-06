/**
 * A/B Testing Infrastructure for USP.1 - LLM Prompt Engineering Foundation
 * 
 * Implements systematic optimization through Template A, B, C variations:
 * - Template A: Structured Educational Approach
 * - Template B: Creative Storytelling Approach  
 * - Template C: Gamified Challenge Approach
 * 
 * Supports iterative optimization with version control and performance tracking
 */

import { WorksheetConfig, GeneratedWorksheet } from '@/lib/types/worksheet'
import { PromptTemplate, QualityMetrics } from '@/lib/services/promptEngineering'
import { generateWorksheet } from '@/lib/services/gemini'
import { QualityAssuranceService, DetailedQualityAssessment } from '@/lib/services/qualityAssurance'

export interface ABTestResult {
  testId: string
  config: WorksheetConfig
  templateResults: Record<PromptTemplate, TemplateResult>
  analysis: ABTestAnalysis
  recommendation: TemplateRecommendation
  timestamp: string
  phase1Combination: boolean
}

export interface TemplateResult {
  worksheet: GeneratedWorksheet
  qualityAssessment: DetailedQualityAssessment
  performance: PerformanceMetrics
  errors?: string[]
}

export interface PerformanceMetrics {
  generationTime: number
  promptLength: number
  responseLength: number
  success: boolean
}

export interface ABTestAnalysis {
  winningTemplate: PromptTemplate
  qualityScores: Record<PromptTemplate, number>
  significantDifferences: string[]
  insights: TestInsight[]
  statisticalConfidence: number
}

export interface TestInsight {
  category: 'visual' | 'educational' | 'svg' | 'curriculum' | 'accessibility' | 'performance'
  finding: string
  impact: 'high' | 'medium' | 'low'
  actionable: boolean
}

export interface TemplateRecommendation {
  primary: PromptTemplate
  reasoning: string[]
  hybridOpportunities: string[]
  nextIterationSuggestions: string[]
}

export interface ABTestConfig {
  runAllTemplates: boolean
  templates: PromptTemplate[]
  includePerformanceAnalysis: boolean
  generateRecommendations: boolean
  minimumQualityThreshold: number
}

/**
 * A/B Testing Service for systematic prompt optimization
 * Implements USP.1 systematic optimization methodology
 */
export class ABTestingService {

  private static readonly DEFAULT_CONFIG: ABTestConfig = {
    runAllTemplates: true,
    templates: ['structured', 'creative', 'gamified'],
    includePerformanceAnalysis: true,
    generateRecommendations: true,
    minimumQualityThreshold: 4.0
  }

  /**
   * Execute comprehensive A/B test across template variations
   * Generates worksheets using all templates and provides comparative analysis
   */
  public static async runABTest(
    worksheetConfig: WorksheetConfig,
    testConfig: Partial<ABTestConfig> = {}
  ): Promise<ABTestResult> {
    
    const config = { ...this.DEFAULT_CONFIG, ...testConfig }
    const testId = this.generateTestId()
    const templateResults: Record<string, TemplateResult> = {}

    console.log(`Starting A/B Test ${testId} for ${worksheetConfig.yearGroup} ${worksheetConfig.topic}`)

    // Generate worksheets for each template
    for (const template of config.templates) {
      try {
        console.log(`Testing template: ${template}`)
        
        const startTime = Date.now()
        const worksheet = await generateWorksheet(worksheetConfig, template)
        const endTime = Date.now()

        // Comprehensive quality assessment
        const qualityAssessment = QualityAssuranceService.evaluateWorksheet(
          worksheet.html, 
          worksheetConfig
        )

        const performanceMetrics: PerformanceMetrics = {
          generationTime: endTime - startTime,
          promptLength: 0, // Would be filled from actual generation metrics
          responseLength: worksheet.html.length,
          success: true
        }

        templateResults[template] = {
          worksheet,
          qualityAssessment,
          performance: performanceMetrics,
          errors: []
        }

        console.log(`Template ${template} completed - Quality Score: ${qualityAssessment.weightedScore.toFixed(2)}`)

      } catch (error) {
        console.error(`Template ${template} failed:`, error)
        
        templateResults[template] = {
          worksheet: this.createErrorWorksheet(worksheetConfig),
          qualityAssessment: this.createFailedAssessment(),
          performance: {
            generationTime: 0,
            promptLength: 0,
            responseLength: 0,
            success: false
          },
          errors: [error instanceof Error ? error.message : 'Unknown error']
        }
      }
    }

    // Analyze results and generate insights
    const analysis = this.analyzeResults(templateResults as Record<PromptTemplate, TemplateResult>)
    const recommendation = this.generateRecommendation(templateResults as Record<PromptTemplate, TemplateResult>, analysis)

    const result: ABTestResult = {
      testId,
      config: worksheetConfig,
      templateResults: templateResults as Record<PromptTemplate, TemplateResult>,
      analysis,
      recommendation,
      timestamp: new Date().toISOString(),
      phase1Combination: this.isPhase1Combination(worksheetConfig)
    }

    // Log summary
    this.logTestSummary(result)

    return result
  }

  /**
   * Run focused A/B test for specific metric optimization
   * Useful for iterative improvement on particular quality aspects
   */
  public static async runFocusedTest(
    worksheetConfig: WorksheetConfig,
    focusMetric: keyof QualityMetrics,
    templates: PromptTemplate[] = ['structured', 'creative']
  ): Promise<ABTestResult> {
    
    const result = await this.runABTest(worksheetConfig, {
      templates,
      runAllTemplates: false,
      minimumQualityThreshold: 4.0
    })

    // Add focused analysis
    result.analysis.insights.unshift({
      category: this.mapMetricToCategory(focusMetric),
      finding: `Focused test on ${focusMetric} metric optimization`,
      impact: 'high',
      actionable: true
    })

    return result
  }

  /**
   * Batch testing for multiple worksheet configurations
   * Useful for comprehensive Phase 1 combination validation
   */
  public static async runBatchTest(
    configs: WorksheetConfig[],
    testConfig: Partial<ABTestConfig> = {}
  ): Promise<ABTestResult[]> {
    
    const results: ABTestResult[] = []
    
    for (const config of configs) {
      console.log(`Running batch test ${results.length + 1}/${configs.length}`)
      try {
        const result = await this.runABTest(config, testConfig)
        results.push(result)
        
        // Brief delay to avoid overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 1000))
        
      } catch (error) {
        console.error(`Batch test failed for config:`, config, error)
      }
    }

    // Generate batch insights
    this.analyzeBatchResults(results)

    return results
  }

  /**
   * Analyze A/B test results and generate insights
   */
  private static analyzeResults(templateResults: Record<PromptTemplate, TemplateResult>): ABTestAnalysis {
    const qualityScores: Record<PromptTemplate, number> = {} as Record<PromptTemplate, number>
    const insights: TestInsight[] = []
    const significantDifferences: string[] = []

    // Calculate quality scores
    Object.entries(templateResults).forEach(([template, result]) => {
      qualityScores[template as PromptTemplate] = result.qualityAssessment.weightedScore
    })

    // Identify winning template
    const winningTemplate = Object.entries(qualityScores).reduce((a, b) => 
      qualityScores[a[0] as PromptTemplate] > qualityScores[b[0] as PromptTemplate] ? a : b
    )[0] as PromptTemplate

    // Generate insights
    insights.push(...this.generateQualityInsights(templateResults))
    insights.push(...this.generatePerformanceInsights(templateResults))

    // Identify significant differences
    const scores = Object.values(qualityScores)
    const maxScore = Math.max(...scores)
    const minScore = Math.min(...scores)
    
    if (maxScore - minScore > 0.5) {
      significantDifferences.push(`Significant quality difference: ${(maxScore - minScore).toFixed(2)} points`)
    }

    return {
      winningTemplate,
      qualityScores,
      significantDifferences,
      insights,
      statisticalConfidence: this.calculateStatisticalConfidence(qualityScores)
    }
  }

  /**
   * Generate actionable recommendations based on test results
   */
  private static generateRecommendation(
    templateResults: Record<PromptTemplate, TemplateResult>,
    analysis: ABTestAnalysis
  ): TemplateRecommendation {
    
    const reasoning: string[] = []
    const hybridOpportunities: string[] = []
    const nextIterationSuggestions: string[] = []

    // Primary recommendation reasoning
    const winnerScore = analysis.qualityScores[analysis.winningTemplate]
    reasoning.push(`${analysis.winningTemplate} template achieved highest quality score: ${winnerScore.toFixed(2)}`)

    // Identify hybrid opportunities
    Object.entries(templateResults).forEach(([template, result]) => {
      if (template !== analysis.winningTemplate) {
        const strengths = this.identifyTemplateStrengths(result)
        if (strengths.length > 0) {
          hybridOpportunities.push(`Incorporate ${template} strengths: ${strengths.join(', ')}`)
        }
      }
    })

    // Next iteration suggestions
    if (winnerScore < 4.0) {
      nextIterationSuggestions.push('Focus on improving overall quality to meet 4.0 target')
    }

    const lowestMetric = this.findLowestScoringMetric(templateResults[analysis.winningTemplate])
    if (lowestMetric) {
      nextIterationSuggestions.push(`Prioritize improvement in ${lowestMetric}`)
    }

    return {
      primary: analysis.winningTemplate,
      reasoning,
      hybridOpportunities,
      nextIterationSuggestions
    }
  }

  /**
   * Helper methods for analysis and insights
   */
  private static generateQualityInsights(templateResults: Record<PromptTemplate, TemplateResult>): TestInsight[] {
    const insights: TestInsight[] = []

    // Compare visual appeal across templates
    const visualScores = Object.entries(templateResults).map(([template, result]) => ({
      template,
      score: result.qualityAssessment.metrics.visualAppeal
    }))

    const bestVisual = visualScores.reduce((a, b) => a.score > b.score ? a : b)
    if (bestVisual.score >= 4.0) {
      insights.push({
        category: 'visual',
        finding: `${bestVisual.template} template excels in visual appeal (${bestVisual.score.toFixed(1)})`,
        impact: 'high',
        actionable: true
      })
    }

    // Similar analysis for other metrics...
    return insights
  }

  private static generatePerformanceInsights(templateResults: Record<PromptTemplate, TemplateResult>): TestInsight[] {
    const insights: TestInsight[] = []

    const avgGenerationTime = Object.values(templateResults).reduce((sum, result) => 
      sum + result.performance.generationTime, 0) / Object.keys(templateResults).length

    if (avgGenerationTime > 5000) { // 5 seconds
      insights.push({
        category: 'performance',
        finding: `Average generation time is high: ${(avgGenerationTime / 1000).toFixed(1)}s`,
        impact: 'medium',
        actionable: true
      })
    }

    return insights
  }

  private static identifyTemplateStrengths(result: TemplateResult): string[] {
    const strengths: string[] = []
    const metrics = result.qualityAssessment.metrics

    if (metrics.visualAppeal >= 4.5) strengths.push('visual design')
    if (metrics.educationalAppropriateness >= 4.5) strengths.push('educational quality')
    if (metrics.svgIntegration >= 4.5) strengths.push('SVG integration')
    if (metrics.curriculumAlignment >= 4.5) strengths.push('curriculum alignment')
    if (metrics.accessibility >= 4.5) strengths.push('accessibility')

    return strengths
  }

  private static findLowestScoringMetric(result: TemplateResult): string | null {
    const metrics = result.qualityAssessment.metrics
    const entries = Object.entries(metrics)
    const lowest = entries.reduce((a, b) => a[1] < b[1] ? a : b)
    
    return lowest[1] < 4.0 ? lowest[0] : null
  }

  private static calculateStatisticalConfidence(scores: Record<PromptTemplate, number>): number {
    // Simplified confidence calculation
    const values = Object.values(scores)
    const mean = values.reduce((a, b) => a + b, 0) / values.length
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length
    
    // Return confidence percentage (simplified)
    return Math.min(95, 70 + (variance * 25))
  }

  private static mapMetricToCategory(metric: keyof QualityMetrics): TestInsight['category'] {
    const mapping: Record<keyof QualityMetrics, TestInsight['category']> = {
      visualAppeal: 'visual',
      educationalAppropriateness: 'educational',
      svgIntegration: 'svg',
      curriculumAlignment: 'curriculum',
      accessibility: 'accessibility'
    }
    return mapping[metric]
  }

  private static analyzeBatchResults(results: ABTestResult[]): void {
    console.log('\n=== BATCH TEST ANALYSIS ===')
    console.log(`Total tests: ${results.length}`)
    
    const phase1Results = results.filter(r => r.phase1Combination)
    console.log(`Phase 1 combinations: ${phase1Results.length}`)

    const avgScores = results.reduce((acc, result) => {
      Object.entries(result.analysis.qualityScores).forEach(([template, score]) => {
        acc[template] = (acc[template] || 0) + score
      })
      return acc
    }, {} as Record<string, number>)

    Object.keys(avgScores).forEach(template => {
      avgScores[template] /= results.length
      console.log(`Average ${template} score: ${avgScores[template].toFixed(2)}`)
    })
  }

  private static logTestSummary(result: ABTestResult): void {
    console.log(`\n=== A/B TEST SUMMARY (${result.testId}) ===`)
    console.log(`Configuration: ${result.config.yearGroup} ${result.config.topic}`)
    console.log(`Phase 1 Combination: ${result.phase1Combination}`)
    console.log(`Winning Template: ${result.analysis.winningTemplate}`)
    console.log(`Quality Scores:`)
    
    Object.entries(result.analysis.qualityScores).forEach(([template, score]) => {
      const status = score >= 4.0 ? '✅' : '⚠️'
      console.log(`  ${status} ${template}: ${score.toFixed(2)}`)
    })

    console.log(`Recommendations: ${result.recommendation.reasoning[0]}`)
  }

  // Utility methods
  private static generateTestId(): string {
    return `usp1_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private static isPhase1Combination(config: WorksheetConfig): boolean {
    const { yearGroup, topic } = config

    return (
      ((yearGroup === 'Reception' || yearGroup === 'Year 1') && topic.toLowerCase().includes('addition')) ||
      (yearGroup === 'Year 3' && (topic.toLowerCase().includes('multiplication') || topic.toLowerCase().includes('division'))) ||
      (yearGroup === 'Year 5' && topic.toLowerCase().includes('fraction'))
    )
  }

  private static createErrorWorksheet(config: WorksheetConfig): GeneratedWorksheet {
    return {
      title: 'Error - Worksheet Generation Failed',
      html: '<html><body><h1>Generation Error</h1><p>This template failed to generate</p></body></html>',
      metadata: {
        topic: config.topic,
        subtopic: config.subtopic,
        difficulty: config.difficulty,
        questionCount: 0,
        curriculum: 'UK National Curriculum',
        generatedAt: new Date().toISOString(),
        promptTemplate: 'error',
        qualityScore: 0,
        isPhase1Combination: false
      }
    }
  }

  private static createFailedAssessment(): DetailedQualityAssessment {
    const failedMetrics: QualityMetrics = {
      visualAppeal: 0,
      educationalAppropriateness: 0,
      svgIntegration: 0,
      curriculumAlignment: 0,
      accessibility: 0
    }

    return {
      metrics: failedMetrics,
      weightedScore: 0,
      meetsTarget: false,
      recommendations: [{
        category: 'visualAppeal',
        issue: 'Template failed to generate',
        suggestion: 'Review template configuration and try again',
        priority: 'high'
      }],
      breakdown: {
        visualAppeal: { score: 0, weight: 0.25, contributionToTotal: 0, strengths: [], weaknesses: ['Generation failed'] },
        educationalAppropriateness: { score: 0, weight: 0.25, contributionToTotal: 0, strengths: [], weaknesses: ['Generation failed'] },
        svgIntegration: { score: 0, weight: 0.20, contributionToTotal: 0, strengths: [], weaknesses: ['Generation failed'] },
        curriculumAlignment: { score: 0, weight: 0.15, contributionToTotal: 0, strengths: [], weaknesses: ['Generation failed'] },
        accessibility: { score: 0, weight: 0.15, contributionToTotal: 0, strengths: [], weaknesses: ['Generation failed'] }
      }
    }
  }

  /**
   * Performance benchmarking for USP.1 targets
   * Validates ≥95% generation success rate and ≥4.0 average quality scores
   */
  public static async benchmarkPerformance(
    testConfigs: WorksheetConfig[],
    iterations: number = 3
  ): Promise<{
    successRate: number
    averageQualityScore: number
    meetsUSP1Targets: boolean
    detailedResults: ABTestResult[]
  }> {
    
    const allResults: ABTestResult[] = []
    let successCount = 0
    let totalAttempts = 0
    let qualityScores: number[] = []

    for (let i = 0; i < iterations; i++) {
      for (const config of testConfigs) {
        try {
          const result = await this.runABTest(config)
          allResults.push(result)
          
          // Count successful generations
          Object.values(result.templateResults).forEach(templateResult => {
            totalAttempts++
            if (templateResult.performance.success) {
              successCount++
              qualityScores.push(templateResult.qualityAssessment.weightedScore)
            }
          })
          
        } catch (error) {
          totalAttempts++
          console.error('Benchmark test failed:', error)
        }
      }
    }

    const successRate = (successCount / totalAttempts) * 100
    const averageQualityScore = qualityScores.length > 0 
      ? qualityScores.reduce((a, b) => a + b, 0) / qualityScores.length 
      : 0

    const meetsUSP1Targets = successRate >= 95 && averageQualityScore >= 4.0

    console.log('\n=== USP.1 PERFORMANCE BENCHMARK ===')
    console.log(`Success Rate: ${successRate.toFixed(1)}% (Target: ≥95%)`)
    console.log(`Average Quality Score: ${averageQualityScore.toFixed(2)} (Target: ≥4.0)`)
    console.log(`Meets USP.1 Targets: ${meetsUSP1Targets ? '✅' : '❌'}`)

    return {
      successRate,
      averageQualityScore,
      meetsUSP1Targets,
      detailedResults: allResults
    }
  }
}