/**
 * Quality Gate Manager
 * Orchestrates quality gates and manages the overall quality assurance process
 */

import { QualityScores, QualityGateConfig, QualityGateResult } from '../types/engine-types'
import { ThresholdValidator, BatchQualityGateResult, BaselineComparisonResult } from './threshold-validator'
import { RegressionDetector, RegressionResult, BatchRegressionResult } from './regression-detector'
import { GoldenReferenceManager } from '../golden-references/manager'

export class QualityGateManager {
  private thresholdValidator: ThresholdValidator
  private regressionDetector: RegressionDetector
  private goldenRefManager: GoldenReferenceManager
  private config: QualityGateManagerConfig

  constructor(
    config: QualityGateManagerConfig = QualityGateManager.DEFAULT_CONFIG,
    goldenRefsPath?: string
  ) {
    this.config = config
    this.thresholdValidator = new ThresholdValidator(config.qualityGateConfig)
    this.regressionDetector = new RegressionDetector(
      config.historyDir,
      config.regressionThreshold,
      config.statisticalSignificance
    )
    this.goldenRefManager = new GoldenReferenceManager(goldenRefsPath)
  }

  private static readonly DEFAULT_CONFIG: QualityGateManagerConfig = {
    qualityGateConfig: {
      minimumComposite: 7.5,
      minimumPerDimension: {
        visualSimilarity: 7.0,
        contentAnalysis: 8.0,
        ruleBasedLayout: 7.0
      },
      regressionThreshold: 0.5,
      approvalRequired: true
    },
    enableRegressionDetection: true,
    enableGoldenReferenceValidation: true,
    historyDir: './quality-history',
    regressionThreshold: 0.5,
    statisticalSignificance: 0.05,
    failFast: false,
    generateDetailedReports: true
  }

  async runQualityGates(
    qualityScores: QualityScores,
    configId: string,
    variant: string = 'baseline',
    options: QualityGateOptions = {}
  ): Promise<QualityGateExecutionResult> {
    const startTime = Date.now()
    const results: QualityGateStepResult[] = []
    let overallPassed = true
    let blockingFailure = false

    console.log(`🔍 Running quality gates for ${configId} (${variant})`)

    try {
      // Step 1: Threshold Validation
      const thresholdResult = await this.runThresholdValidation(qualityScores, options)
      results.push(thresholdResult)
      
      if (!thresholdResult.passed) {
        overallPassed = false
        if (this.isBlockingFailure(thresholdResult.severity)) {
          blockingFailure = true
          if (this.config.failFast) {
            return this.createExecutionResult(results, false, blockingFailure, startTime, 'Threshold validation failed (fail-fast enabled)')
          }
        }
      }

      // Step 2: Regression Detection (if enabled)
      if (this.config.enableRegressionDetection && !options.skipRegressionDetection) {
        const regressionResult = await this.runRegressionDetection(qualityScores, configId, variant)
        results.push(regressionResult)
        
        if (!regressionResult.passed && regressionResult.severity === 'severe') {
          overallPassed = false
          blockingFailure = true
          
          if (this.config.failFast) {
            return this.createExecutionResult(results, false, blockingFailure, startTime, 'Severe regression detected (fail-fast enabled)')
          }
        } else if (!regressionResult.passed) {
          overallPassed = false
        }
      }

      // Step 3: Golden Reference Validation (if enabled and available)
      if (this.config.enableGoldenReferenceValidation && !options.skipGoldenReferenceValidation) {
        const goldenRefResult = await this.runGoldenReferenceValidation(qualityScores, configId)
        if (goldenRefResult) {
          results.push(goldenRefResult)
          
          if (!goldenRefResult.passed) {
            overallPassed = false
            if (this.isBlockingFailure(goldenRefResult.severity)) {
              blockingFailure = true
            }
          }
        }
      }

      // Step 4: Custom Validations (if provided)
      if (options.customValidations) {
        for (const customValidation of options.customValidations) {
          const customResult = await this.runCustomValidation(qualityScores, customValidation)
          results.push(customResult)
          
          if (!customResult.passed) {
            overallPassed = false
            if (customResult.severity === 'severe') {
              blockingFailure = true
            }
          }
        }
      }

      const executionResult = this.createExecutionResult(results, overallPassed, blockingFailure, startTime)
      
      // Generate detailed report if enabled
      if (this.config.generateDetailedReports) {
        await this.generateQualityGateReport(executionResult, configId, variant)
      }

      return executionResult

    } catch (error) {
      return this.createExecutionResult(
        results,
        false,
        true,
        startTime,
        `Quality gate execution failed: ${error}`
      )
    }
  }

  async runBatchQualityGates(
    batch: Array<{ qualityScores: QualityScores; configId: string; variant?: string }>,
    options: BatchQualityGateOptions = {}
  ): Promise<BatchQualityGateResult> {
    const startTime = Date.now()
    const results: QualityGateExecutionResult[] = []
    let passedCount = 0
    let blockedCount = 0

    console.log(`🔍 Running batch quality gates for ${batch.length} configurations`)

    for (let i = 0; i < batch.length; i++) {
      const item = batch[i]
      console.log(`  Processing ${i + 1}/${batch.length}: ${item.configId}`)

      try {
        const result = await this.runQualityGates(
          item.qualityScores,
          item.configId,
          item.variant || 'baseline',
          options.individualOptions || {}
        )

        results.push(result)
        
        if (result.overallPassed) {
          passedCount++
        }
        
        if (result.blockingFailure) {
          blockedCount++
        }

        // Early termination for batch if too many failures
        if (options.maxFailureRate && (i - passedCount) / (i + 1) > options.maxFailureRate) {
          console.log(`⚠️ Batch failure rate exceeded ${options.maxFailureRate * 100}% - terminating early`)
          break
        }

      } catch (error) {
        console.error(`Error processing ${item.configId}:`, error)
        results.push({
          configId: item.configId,
          variant: item.variant || 'baseline',
          overallPassed: false,
          blockingFailure: true,
          steps: [],
          executionTime: 0,
          summary: `Execution error: ${error}`,
          recommendations: ['Fix execution errors before retrying']
        })
      }
    }

    const batchResult: BatchQualityGateResult = {
      totalConfigurations: batch.length,
      processedConfigurations: results.length,
      passedConfigurations: passedCount,
      failedConfigurations: results.length - passedCount,
      blockedConfigurations: blockedCount,
      passRate: results.length > 0 ? passedCount / results.length : 0,
      executionTime: Date.now() - startTime,
      results,
      batchRecommendations: this.generateBatchRecommendations(results, passedCount, blockedCount),
      riskAssessment: this.assessBatchRisk(results)
    }

    // Generate batch report
    if (this.config.generateDetailedReports) {
      await this.generateBatchQualityGateReport(batchResult)
    }

    return batchResult
  }

  async validateDeploymentReadiness(
    configIds: string[],
    variant: string = 'baseline'
  ): Promise<DeploymentReadinessResult> {
    console.log(`🚀 Validating deployment readiness for ${configIds.length} configurations`)

    const validationResults: ConfigurationDeploymentStatus[] = []
    let readyCount = 0
    let blockedCount = 0
    let warningCount = 0

    for (const configId of configIds) {
      try {
        // Get recent quality data for this configuration
        const trendAnalysis = await this.regressionDetector.analyzeQualityTrends(configId, variant, 10)
        const goldenRef = await this.goldenRefManager.getGoldenReference(configId)

        let status: DeploymentStatus = 'ready'
        const issues: string[] = []
        const warnings: string[] = []

        // Check trend analysis
        if (trendAnalysis.trend === 'declining' && trendAnalysis.trendStrength > 0.1) {
          status = 'warning'
          warnings.push('Declining quality trend detected')
        }

        if (trendAnalysis.dataPoints < 3) {
          warnings.push('Limited historical data available')
        }

        if (trendAnalysis.volatility > 1.5) {
          warnings.push('High quality volatility detected')
        }

        // Check golden reference availability
        if (this.config.enableGoldenReferenceValidation && !goldenRef) {
          status = 'warning'
          warnings.push('No golden reference available')
        }

        // Additional checks could include:
        // - Recent test failures
        // - Pending approval requirements
        // - Configuration-specific rules

        if (status === 'ready' && warnings.length === 0) {
          readyCount++
        } else if (status === 'blocked') {
          blockedCount++
        } else {
          warningCount++
        }

        validationResults.push({
          configId,
          status,
          issues,
          warnings,
          trendAnalysis,
          hasGoldenReference: !!goldenRef,
          recommendation: this.generateDeploymentRecommendation(status, issues, warnings, trendAnalysis)
        })

      } catch (error) {
        blockedCount++
        validationResults.push({
          configId,
          status: 'blocked',
          issues: [`Validation error: ${error}`],
          warnings: [],
          trendAnalysis: null,
          hasGoldenReference: false,
          recommendation: 'Fix validation errors before deployment'
        })
      }
    }

    return {
      totalConfigurations: configIds.length,
      readyConfigurations: readyCount,
      warningConfigurations: warningCount,
      blockedConfigurations: blockedCount,
      overallRecommendation: this.generateOverallDeploymentRecommendation(readyCount, warningCount, blockedCount, configIds.length),
      configurationStatus: validationResults,
      riskLevel: this.assessDeploymentRisk(readyCount, warningCount, blockedCount, configIds.length)
    }
  }

  updateConfiguration(newConfig: Partial<QualityGateManagerConfig>): void {
    this.config = { ...this.config, ...newConfig }
    
    if (newConfig.qualityGateConfig) {
      this.thresholdValidator.updateThresholds(newConfig.qualityGateConfig)
    }
  }

  getConfiguration(): QualityGateManagerConfig {
    return { ...this.config }
  }

  private async runThresholdValidation(
    qualityScores: QualityScores,
    options: QualityGateOptions
  ): Promise<QualityGateStepResult> {
    try {
      const result = options.customThresholds
        ? this.thresholdValidator.validateCustomThresholds(qualityScores, options.customThresholds)
        : this.thresholdValidator.validateQualityScores(qualityScores)

      return {
        stepName: 'threshold-validation',
        passed: result.passed,
        severity: result.passed ? 'none' : this.determineSeverity(result.failedChecks),
        details: result.failedChecks,
        recommendations: result.passed ? ['All thresholds met'] : this.generateThresholdRecommendations(result.failedChecks),
        executionTime: 0 // Threshold validation is typically fast
      }
    } catch (error) {
      return {
        stepName: 'threshold-validation',
        passed: false,
        severity: 'severe',
        details: [`Threshold validation error: ${error}`],
        recommendations: ['Fix threshold validation system'],
        executionTime: 0
      }
    }
  }

  private async runRegressionDetection(
    qualityScores: QualityScores,
    configId: string,
    variant: string
  ): Promise<QualityGateStepResult> {
    try {
      const result = await this.regressionDetector.detectRegression(qualityScores, configId, variant)

      return {
        stepName: 'regression-detection',
        passed: !result.regressionDetected,
        severity: result.regressionDetected ? result.severity : 'none',
        details: result.regressionDetected ? [result.recommendation] : ['No regression detected'],
        recommendations: [result.recommendation],
        executionTime: 50, // Approximate time for regression analysis
        metadata: {
          scoreDifference: result.scoreDifference,
          historicalDataPoints: result.historicalDataPoints,
          pValue: result.pValue
        }
      }
    } catch (error) {
      return {
        stepName: 'regression-detection',
        passed: false,
        severity: 'moderate',
        details: [`Regression detection error: ${error}`],
        recommendations: ['Review regression detection system'],
        executionTime: 0
      }
    }
  }

  private async runGoldenReferenceValidation(
    qualityScores: QualityScores,
    configId: string
  ): Promise<QualityGateStepResult | null> {
    try {
      const goldenRef = await this.goldenRefManager.getGoldenReference(configId)
      
      if (!goldenRef) {
        return {
          stepName: 'golden-reference-validation',
          passed: true, // Not having a golden reference is not a failure
          severity: 'none',
          details: ['No golden reference available for comparison'],
          recommendations: ['Consider creating a golden reference for this configuration'],
          executionTime: 10
        }
      }

      const result = this.thresholdValidator.validateAgainstBaseline(
        qualityScores,
        goldenRef.metadata.qualityScores
      )

      return {
        stepName: 'golden-reference-validation',
        passed: result.passed,
        severity: result.regressionSeverity,
        details: result.failedChecks.length > 0 ? result.failedChecks : ['Comparison with golden reference passed'],
        recommendations: [result.recommendation],
        executionTime: 20,
        metadata: {
          goldenReferenceVersion: goldenRef.metadata.version,
          scoreDifferences: result.scoreDifferences
        }
      }
    } catch (error) {
      return {
        stepName: 'golden-reference-validation',
        passed: false,
        severity: 'moderate',
        details: [`Golden reference validation error: ${error}`],
        recommendations: ['Review golden reference system'],
        executionTime: 0
      }
    }
  }

  private async runCustomValidation(
    qualityScores: QualityScores,
    validation: CustomValidation
  ): Promise<QualityGateStepResult> {
    try {
      const result = await validation.validate(qualityScores)
      
      return {
        stepName: validation.name,
        passed: result.passed,
        severity: result.severity || (result.passed ? 'none' : 'moderate'),
        details: result.details || [],
        recommendations: result.recommendations || [],
        executionTime: result.executionTime || 0
      }
    } catch (error) {
      return {
        stepName: validation.name,
        passed: false,
        severity: 'severe',
        details: [`Custom validation error: ${error}`],
        recommendations: [`Fix custom validation: ${validation.name}`],
        executionTime: 0
      }
    }
  }

  private createExecutionResult(
    steps: QualityGateStepResult[],
    overallPassed: boolean,
    blockingFailure: boolean,
    startTime: number,
    errorMessage?: string
  ): QualityGateExecutionResult {
    const executionTime = Date.now() - startTime
    
    return {
      configId: '', // Will be set by caller
      variant: '', // Will be set by caller
      overallPassed,
      blockingFailure,
      steps,
      executionTime,
      summary: errorMessage || this.generateExecutionSummary(steps, overallPassed, blockingFailure),
      recommendations: this.generateExecutionRecommendations(steps, overallPassed, blockingFailure)
    }
  }

  private isBlockingFailure(severity: StepSeverity): boolean {
    return severity === 'severe'
  }

  private determineSeverity(failedChecks: string[]): StepSeverity {
    if (failedChecks.some(check => check.includes('Composite score') && check.includes('below minimum'))) {
      return 'severe'
    }
    if (failedChecks.length > 2) {
      return 'moderate'
    }
    return 'minor'
  }

  private generateExecutionSummary(
    steps: QualityGateStepResult[],
    overallPassed: boolean,
    blockingFailure: boolean
  ): string {
    const totalSteps = steps.length
    const passedSteps = steps.filter(s => s.passed).length
    
    if (blockingFailure) {
      return `🚨 QUALITY GATES FAILED - Blocking issues detected (${passedSteps}/${totalSteps} steps passed)`
    } else if (overallPassed) {
      return `✅ All quality gates passed (${totalSteps}/${totalSteps} steps passed)`
    } else {
      return `⚠️ Quality gates passed with warnings (${passedSteps}/${totalSteps} steps passed)`
    }
  }

  private generateExecutionRecommendations(
    steps: QualityGateStepResult[],
    overallPassed: boolean,
    blockingFailure: boolean
  ): string[] {
    if (blockingFailure) {
      return ['🚨 DO NOT DEPLOY - Fix blocking issues first', ...steps.filter(s => !s.passed && s.severity === 'severe').flatMap(s => s.recommendations)]
    } else if (overallPassed) {
      return ['✅ Safe to deploy', 'Continue with deployment process']
    } else {
      return ['⚠️ Deploy with caution', 'Monitor closely in production', ...steps.filter(s => !s.passed).flatMap(s => s.recommendations)]
    }
  }

  private generateThresholdRecommendations(failedChecks: string[]): string[] {
    const recommendations = ['Review quality thresholds and testing process']
    
    if (failedChecks.some(check => check.includes('Composite score'))) {
      recommendations.push('Overall quality below acceptable standards')
    }
    
    if (failedChecks.some(check => check.includes('Content analysis'))) {
      recommendations.push('Review curriculum alignment and content quality')
    }
    
    return recommendations
  }

  private generateBatchRecommendations(
    results: QualityGateExecutionResult[],
    passedCount: number,
    blockedCount: number
  ): string[] {
    const recommendations = []
    const totalCount = results.length
    const passRate = passedCount / totalCount

    if (blockedCount > 0) {
      recommendations.push(`🚨 ${blockedCount} configurations have blocking issues`)
    }

    if (passRate < 0.8) {
      recommendations.push('⚠️ Low batch pass rate - review quality processes')
    } else if (passRate === 1.0) {
      recommendations.push('✅ All configurations passed quality gates')
    }

    return recommendations
  }

  private assessBatchRisk(results: QualityGateExecutionResult[]): BatchRiskLevel {
    const totalCount = results.length
    const blockedCount = results.filter(r => r.blockingFailure).length
    const failedCount = results.filter(r => !r.overallPassed).length

    if (blockedCount > totalCount * 0.1) {
      return 'high'
    } else if (failedCount > totalCount * 0.3) {
      return 'medium'
    } else {
      return 'low'
    }
  }

  private generateDeploymentRecommendation(
    status: DeploymentStatus,
    issues: string[],
    warnings: string[],
    trendAnalysis: any
  ): string {
    switch (status) {
      case 'ready':
        return warnings.length > 0 
          ? `✅ Ready for deployment (monitor: ${warnings.join(', ')})` 
          : '✅ Ready for deployment'
      case 'warning':
        return `⚠️ Deploy with caution: ${warnings.join(', ')}`
      case 'blocked':
        return `🚨 Deployment blocked: ${issues.join(', ')}`
    }
  }

  private generateOverallDeploymentRecommendation(
    ready: number,
    warning: number,
    blocked: number,
    total: number
  ): string {
    if (blocked > 0) {
      return `🚨 Deployment NOT RECOMMENDED - ${blocked}/${total} configurations blocked`
    } else if (warning > total * 0.5) {
      return `⚠️ Deployment with HIGH CAUTION - ${warning}/${total} configurations have warnings`
    } else if (warning > 0) {
      return `⚠️ Deployment with caution - ${warning}/${total} configurations have warnings`
    } else {
      return `✅ All configurations ready for deployment (${ready}/${total})`
    }
  }

  private assessDeploymentRisk(ready: number, warning: number, blocked: number, total: number): DeploymentRiskLevel {
    if (blocked > 0) {
      return 'high'
    } else if (warning > total * 0.5) {
      return 'high'
    } else if (warning > total * 0.25) {
      return 'medium'
    } else {
      return 'low'
    }
  }

  // Report generation methods (simplified implementations)
  private async generateQualityGateReport(
    result: QualityGateExecutionResult,
    configId: string,
    variant: string
  ): Promise<void> {
    // Implementation would generate detailed HTML/Markdown reports
    console.log(`📊 Quality gate report generated for ${configId} (${variant})`)
  }

  private async generateBatchQualityGateReport(result: BatchQualityGateResult): Promise<void> {
    // Implementation would generate batch analysis reports
    console.log(`📊 Batch quality gate report generated for ${result.totalConfigurations} configurations`)
  }
}

// Type definitions
export interface QualityGateManagerConfig {
  qualityGateConfig: QualityGateConfig
  enableRegressionDetection: boolean
  enableGoldenReferenceValidation: boolean
  historyDir: string
  regressionThreshold: number
  statisticalSignificance: number
  failFast: boolean
  generateDetailedReports: boolean
}

export interface QualityGateOptions {
  skipRegressionDetection?: boolean
  skipGoldenReferenceValidation?: boolean
  customThresholds?: {
    composite?: number
    visualSimilarity?: number
    contentAnalysis?: number
    ruleBasedLayout?: number
  }
  customValidations?: CustomValidation[]
}

export interface BatchQualityGateOptions {
  maxFailureRate?: number
  individualOptions?: QualityGateOptions
}

export interface QualityGateExecutionResult {
  configId: string
  variant: string
  overallPassed: boolean
  blockingFailure: boolean
  steps: QualityGateStepResult[]
  executionTime: number
  summary: string
  recommendations: string[]
}

export interface QualityGateStepResult {
  stepName: string
  passed: boolean
  severity: StepSeverity
  details: string[]
  recommendations: string[]
  executionTime: number
  metadata?: Record<string, any>
}

export interface BatchQualityGateResult {
  totalConfigurations: number
  processedConfigurations: number
  passedConfigurations: number
  failedConfigurations: number
  blockedConfigurations: number
  passRate: number
  executionTime: number
  results: QualityGateExecutionResult[]
  batchRecommendations: string[]
  riskAssessment: BatchRiskLevel
}

export interface DeploymentReadinessResult {
  totalConfigurations: number
  readyConfigurations: number
  warningConfigurations: number
  blockedConfigurations: number
  overallRecommendation: string
  configurationStatus: ConfigurationDeploymentStatus[]
  riskLevel: DeploymentRiskLevel
}

export interface ConfigurationDeploymentStatus {
  configId: string
  status: DeploymentStatus
  issues: string[]
  warnings: string[]
  trendAnalysis: any
  hasGoldenReference: boolean
  recommendation: string
}

export interface CustomValidation {
  name: string
  validate: (scores: QualityScores) => Promise<CustomValidationResult>
}

export interface CustomValidationResult {
  passed: boolean
  severity?: StepSeverity
  details?: string[]
  recommendations?: string[]
  executionTime?: number
}

export type StepSeverity = 'none' | 'minor' | 'moderate' | 'severe'
export type BatchRiskLevel = 'low' | 'medium' | 'high'
export type DeploymentStatus = 'ready' | 'warning' | 'blocked'
export type DeploymentRiskLevel = 'low' | 'medium' | 'high'