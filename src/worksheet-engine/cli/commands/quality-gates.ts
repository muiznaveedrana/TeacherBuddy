/**
 * Quality Gates CLI Commands
 * Handles quality gate execution and validation
 */

import { QualityGateManager } from '../../quality-gates/gate-manager'
import { QualityScores } from '../../types/engine-types'

const qualityGateManager = new QualityGateManager()

export async function runQualityGates(
  configId: string,
  variant: string = 'baseline',
  skipRegression: boolean = false,
  skipGolden: boolean = false,
  customThresholds?: string
): Promise<void> {
  try {
    console.log(`\n🔒 Running Quality Gates`)
    console.log(`📋 Configuration: ${configId}`)
    console.log(`🔄 Variant: ${variant}`)
    console.log(`🔍 Skip Regression: ${skipRegression ? 'Yes' : 'No'}`)
    console.log(`🏆 Skip Golden Reference: ${skipGolden ? 'Yes' : 'No'}`)
    
    if (customThresholds) {
      console.log(`⚙️ Custom Thresholds: ${customThresholds}`)
    }

    // Mock quality scores for CLI demonstration
    // In real implementation, this would come from the quality assessment system
    const mockQualityScores: QualityScores = {
      visualSimilarity: {
        score: 8.2,
        details: {
          structuralSimilarity: 8.1,
          layoutConsistency: 8.3,
          visualAlignment: 8.2
        }
      },
      contentAnalysis: {
        score: 8.7,
        details: {
          curriculumAlignment: 8.9,
          languageAppropriate: 8.5,
          mathematicalAccuracy: 8.7
        }
      },
      ruleBasedLayout: {
        score: 7.9,
        details: {
          fontConsistency: 7.8,
          spacingQuality: 8.0,
          elementPositioning: 7.9
        }
      },
      composite: 8.3
    }

    // Parse custom thresholds if provided
    let parsedThresholds
    if (customThresholds) {
      try {
        parsedThresholds = JSON.parse(customThresholds)
      } catch (error) {
        console.error(`❌ Invalid custom thresholds format. Expected JSON.`)
        throw error
      }
    }

    const options = {
      skipRegressionDetection: skipRegression,
      skipGoldenReferenceValidation: skipGolden,
      customThresholds: parsedThresholds
    }

    console.log(`\n🚀 Executing quality gates...`)
    const startTime = Date.now()

    const result = await qualityGateManager.runQualityGates(
      mockQualityScores,
      configId,
      variant,
      options
    )
    
    const endTime = Date.now()
    const duration = ((endTime - startTime) / 1000).toFixed(1)

    console.log(`\n✅ Quality gates completed in ${duration}s`)

    // Display results
    const overallStatus = result.overallPassed 
      ? (result.blockingFailure ? '🚨 BLOCKED' : '✅ PASSED') 
      : '⚠️ FAILED'
    
    console.log(`\n🎯 Overall Result: ${overallStatus}`)
    
    if (result.blockingFailure) {
      console.log(`🚨 DEPLOYMENT BLOCKED - Critical issues detected`)
    }

    console.log(`⏱️ Total Execution Time: ${result.executionTime}ms`)

    console.log(`\n📊 Quality Gate Steps:`)
    for (const step of result.steps) {
      const stepStatus = step.passed ? '✅' : '❌'
      const severityIcon = step.severity === 'severe' ? '🚨' : step.severity === 'moderate' ? '⚠️' : '💡'
      
      console.log(`   ${stepStatus} ${step.stepName} (${step.executionTime}ms)`)
      
      if (!step.passed) {
        console.log(`     ${severityIcon} Severity: ${step.severity}`)
        for (const detail of step.details) {
          console.log(`     • ${detail}`)
        }
      }

      if (step.recommendations.length > 0) {
        console.log(`     💡 Recommendations:`)
        for (const rec of step.recommendations) {
          console.log(`       - ${rec}`)
        }
      }
    }

    console.log(`\n📝 Summary: ${result.summary}`)

    if (result.recommendations.length > 0) {
      console.log(`\n💡 Overall Recommendations:`)
      for (const recommendation of result.recommendations) {
        console.log(`   • ${recommendation}`)
      }
    }

  } catch (error) {
    console.error(`❌ Quality gates failed:`, error)
    throw error
  }
}

export async function runBatchQualityGates(
  configsFile: string,
  variant: string = 'baseline',
  maxFailureRate?: number
): Promise<void> {
  try {
    console.log(`\n🔒 Running Batch Quality Gates`)
    console.log(`📋 Configurations File: ${configsFile}`)
    console.log(`🔄 Variant: ${variant}`)
    
    if (maxFailureRate) {
      console.log(`📊 Max Failure Rate: ${(maxFailureRate * 100).toFixed(1)}%`)
    }

    // Load configurations from file
    const fs = await import('fs/promises')
    const configsContent = await fs.readFile(configsFile, 'utf-8')
    const configurations: string[] = JSON.parse(configsContent)

    console.log(`📊 Loaded ${configurations.length} configuration(s)`)

    // Create batch with mock quality scores
    const batch = configurations.map(configId => ({
      qualityScores: generateMockQualityScores(),
      configId,
      variant
    }))

    const batchOptions = {
      maxFailureRate,
      individualOptions: {}
    }

    console.log(`\n🚀 Executing batch quality gates...`)
    const startTime = Date.now()

    const results = await qualityGateManager.runBatchQualityGates(batch, batchOptions)
    
    const endTime = Date.now()
    const duration = ((endTime - startTime) / 1000 / 60).toFixed(1)

    console.log(`\n✅ Batch quality gates completed in ${duration} minutes`)

    // Display batch results
    console.log(`\n📊 Batch Results Summary:`)
    console.log(`   Total Configurations: ${results.totalConfigurations}`)
    console.log(`   Processed: ${results.processedConfigurations}`)
    console.log(`   Passed: ${results.passedConfigurations}`)
    console.log(`   Failed: ${results.failedConfigurations}`)
    console.log(`   Blocked: ${results.blockedConfigurations}`)
    console.log(`   Pass Rate: ${(results.passRate * 100).toFixed(1)}%`)
    console.log(`   Risk Level: ${results.riskAssessment.toUpperCase()}`)

    console.log(`\n📋 Configuration Results:`)
    for (const result of results.results) {
      const status = result.overallPassed 
        ? (result.blockingFailure ? '🚨' : '✅') 
        : '⚠️'
      
      console.log(`   ${status} ${result.configId}:`)
      console.log(`       Execution Time: ${result.executionTime}ms`)
      console.log(`       Steps Passed: ${result.steps.filter(s => s.passed).length}/${result.steps.length}`)
      
      if (!result.overallPassed) {
        const failedSteps = result.steps.filter(s => !s.passed)
        console.log(`       Failed Steps: ${failedSteps.map(s => s.stepName).join(', ')}`)
      }
    }

    if (results.batchRecommendations.length > 0) {
      console.log(`\n💡 Batch Recommendations:`)
      for (const recommendation of results.batchRecommendations) {
        console.log(`   • ${recommendation}`)
      }
    }

  } catch (error) {
    console.error(`❌ Batch quality gates failed:`, error)
    throw error
  }
}

export async function validateDeploymentReadiness(
  configIds: string[],
  variant: string = 'baseline'
): Promise<void> {
  try {
    console.log(`\n🚀 Validating Deployment Readiness`)
    console.log(`📋 Configurations: ${configIds.join(', ')}`)
    console.log(`🔄 Variant: ${variant}`)

    console.log(`\n🔍 Analyzing deployment readiness...`)
    const startTime = Date.now()

    const result = await qualityGateManager.validateDeploymentReadiness(configIds, variant)
    
    const endTime = Date.now()
    const duration = ((endTime - startTime) / 1000).toFixed(1)

    console.log(`\n✅ Validation completed in ${duration}s`)

    // Display deployment readiness results
    const overallStatus = result.riskLevel === 'high' ? '🚨 HIGH RISK' :
                         result.riskLevel === 'medium' ? '⚠️ MEDIUM RISK' : '✅ LOW RISK'
    
    console.log(`\n🎯 Overall Deployment Risk: ${overallStatus}`)
    
    console.log(`\n📊 Deployment Summary:`)
    console.log(`   Total Configurations: ${result.totalConfigurations}`)
    console.log(`   Ready: ${result.readyConfigurations}`)
    console.log(`   Warning: ${result.warningConfigurations}`)
    console.log(`   Blocked: ${result.blockedConfigurations}`)

    console.log(`\n📋 Configuration Status:`)
    for (const configStatus of result.configurationStatus) {
      let statusIcon: string
      switch (configStatus.status) {
        case 'ready':
          statusIcon = '✅'
          break
        case 'warning':
          statusIcon = '⚠️'
          break
        case 'blocked':
          statusIcon = '🚨'
          break
      }

      console.log(`   ${statusIcon} ${configStatus.configId}:`)
      console.log(`       Status: ${configStatus.status.toUpperCase()}`)
      console.log(`       Golden Reference: ${configStatus.hasGoldenReference ? 'Available' : 'Missing'}`)

      if (configStatus.trendAnalysis) {
        console.log(`       Trend: ${configStatus.trendAnalysis.trend} (${configStatus.trendAnalysis.dataPoints} data points)`)
      }

      if (configStatus.issues.length > 0) {
        console.log(`       Issues:`)
        for (const issue of configStatus.issues) {
          console.log(`         • ${issue}`)
        }
      }

      if (configStatus.warnings.length > 0) {
        console.log(`       Warnings:`)
        for (const warning of configStatus.warnings) {
          console.log(`         • ${warning}`)
        }
      }

      console.log(`       Recommendation: ${configStatus.recommendation}`)
    }

    console.log(`\n💡 Overall Recommendation: ${result.overallRecommendation}`)

  } catch (error) {
    console.error(`❌ Deployment readiness validation failed:`, error)
    throw error
  }
}

export async function getQualityGateConfiguration(): Promise<void> {
  try {
    console.log(`\n⚙️ Quality Gate Configuration:`)

    const config = qualityGateManager.getConfiguration()

    console.log(`\n🔒 Quality Thresholds:`)
    console.log(`   Minimum Composite Score: ${config.qualityGateConfig.minimumComposite}`)
    console.log(`   Minimum Dimensional Scores:`)
    console.log(`     Visual Similarity: ${config.qualityGateConfig.minimumPerDimension.visualSimilarity}`)
    console.log(`     Content Analysis: ${config.qualityGateConfig.minimumPerDimension.contentAnalysis}`)
    console.log(`     Rule-based Layout: ${config.qualityGateConfig.minimumPerDimension.ruleBasedLayout}`)
    console.log(`   Regression Threshold: ${config.qualityGateConfig.regressionThreshold}`)
    console.log(`   Approval Required: ${config.qualityGateConfig.approvalRequired ? 'Yes' : 'No'}`)

    console.log(`\n🔍 Detection Settings:`)
    console.log(`   Regression Detection: ${config.enableRegressionDetection ? 'Enabled' : 'Disabled'}`)
    console.log(`   Golden Reference Validation: ${config.enableGoldenReferenceValidation ? 'Enabled' : 'Disabled'}`)
    console.log(`   Statistical Significance: ${config.statisticalSignificance}`)
    console.log(`   Fail Fast: ${config.failFast ? 'Enabled' : 'Disabled'}`)

    console.log(`\n📁 Directories:`)
    console.log(`   History Directory: ${config.historyDir}`)

    console.log(`\n📊 Reporting:`)
    console.log(`   Detailed Reports: ${config.generateDetailedReports ? 'Enabled' : 'Disabled'}`)

  } catch (error) {
    console.error(`❌ Failed to get configuration:`, error)
    throw error
  }
}

export async function updateQualityGateConfiguration(
  configUpdates: string
): Promise<void> {
  try {
    console.log(`\n⚙️ Updating Quality Gate Configuration`)
    console.log(`📝 Updates: ${configUpdates}`)

    // Parse configuration updates
    let updates
    try {
      updates = JSON.parse(configUpdates)
    } catch (error) {
      console.error(`❌ Invalid configuration format. Expected JSON.`)
      throw error
    }

    qualityGateManager.updateConfiguration(updates)

    console.log(`✅ Quality gate configuration updated successfully`)

    // Show updated configuration
    await getQualityGateConfiguration()

  } catch (error) {
    console.error(`❌ Failed to update configuration:`, error)
    throw error
  }
}

// Helper function to generate mock quality scores for demonstration
function generateMockQualityScores(): QualityScores {
  const baseScore = 7 + Math.random() * 2.5 // Random score between 7-9.5
  const variation = () => (Math.random() - 0.5) * 0.8 // ±0.4 variation
  
  return {
    visualSimilarity: {
      score: Math.max(0, Math.min(10, baseScore + variation())),
      details: {
        structuralSimilarity: baseScore,
        layoutConsistency: baseScore,
        visualAlignment: baseScore
      }
    },
    contentAnalysis: {
      score: Math.max(0, Math.min(10, baseScore + variation())),
      details: {
        curriculumAlignment: baseScore,
        languageAppropriate: baseScore,
        mathematicalAccuracy: baseScore
      }
    },
    ruleBasedLayout: {
      score: Math.max(0, Math.min(10, baseScore + variation())),
      details: {
        fontConsistency: baseScore,
        spacingQuality: baseScore,
        elementPositioning: baseScore
      }
    },
    composite: baseScore + (Math.random() - 0.5) * 0.4
  }
}