/**
 * Reporting CLI Commands
 * Handles report generation and analysis
 */

import { ResultsAggregator } from '../../reporting/results-aggregator'
import { StatisticalReporter } from '../../reporting/statistical-reporter'
import { RecommendationEngine } from '../../reporting/recommendation-engine'

const resultsAggregator = new ResultsAggregator()
const statisticalReporter = new StatisticalReporter()
const recommendationEngine = new RecommendationEngine()

export async function generateReport(
  reportType: string,
  timeRange?: string,
  outputDir?: string
): Promise<void> {
  try {
    console.log(`\n📊 Generating Report`)
    console.log(`📋 Report Type: ${reportType}`)
    
    if (timeRange) {
      console.log(`📅 Time Range: ${timeRange}`)
    }
    
    if (outputDir) {
      console.log(`📁 Output Directory: ${outputDir}`)
    }

    let parsedTimeRange: { start: Date; end: Date } | undefined
    
    if (timeRange) {
      parsedTimeRange = parseTimeRange(timeRange)
      console.log(`📅 Parsed Range: ${parsedTimeRange.start.toISOString()} to ${parsedTimeRange.end.toISOString()}`)
    }

    console.log(`\n🚀 Generating report...`)
    const startTime = Date.now()

    switch (reportType.toLowerCase()) {
      case 'ab-test':
      case 'abtest':
        await generateABTestReport(parsedTimeRange)
        break
      
      case 'quality-gate':
      case 'quality-gates':
        await generateQualityGateReport(parsedTimeRange)
        break
      
      case 'regression':
        await generateRegressionReport(parsedTimeRange)
        break
      
      case 'comprehensive':
      case 'all':
        await generateComprehensiveReport(parsedTimeRange)
        break
      
      case 'statistical':
        await generateStatisticalReport(parsedTimeRange)
        break
      
      case 'recommendations':
        await generateRecommendationsReport()
        break
      
      case 'cross-analysis':
        await generateCrossAnalysisReport(parsedTimeRange)
        break
      
      case 'trend':
      case 'trends':
        await generateTrendReport()
        break
      
      default:
        console.error(`❌ Unknown report type: ${reportType}`)
        console.log(`💡 Available types: ab-test, quality-gate, regression, comprehensive, statistical, recommendations, cross-analysis, trend`)
        return
    }
    
    const endTime = Date.now()
    const duration = ((endTime - startTime) / 1000).toFixed(1)

    console.log(`\n✅ Report generated successfully in ${duration}s`)

  } catch (error) {
    console.error(`❌ Report generation failed:`, error)
    throw error
  }
}

export async function aggregateResults(
  resultsDir: string,
  timeRange?: string
): Promise<void> {
  try {
    console.log(`\n📊 Aggregating Results`)
    console.log(`📂 Results Directory: ${resultsDir}`)
    
    if (timeRange) {
      console.log(`📅 Time Range: ${timeRange}`)
    }

    let parsedTimeRange: { start: Date; end: Date } | undefined
    
    if (timeRange) {
      parsedTimeRange = parseTimeRange(timeRange)
    }

    console.log(`\n🔍 Loading and aggregating results...`)
    const startTime = Date.now()

    // Aggregate A/B test results
    const abTestResults = await resultsAggregator.aggregateABTestResults(
      `${resultsDir}/ab-tests`,
      parsedTimeRange
    )

    // Aggregate quality gate results
    const qualityGateResults = await resultsAggregator.aggregateQualityGateResults(
      `${resultsDir}/quality-gates`,
      parsedTimeRange
    )

    // Aggregate regression results
    const regressionResults = await resultsAggregator.aggregateRegressionResults(
      `${resultsDir}/regressions`,
      parsedTimeRange
    )
    
    const endTime = Date.now()
    const duration = ((endTime - startTime) / 1000).toFixed(1)

    console.log(`\n✅ Aggregation completed in ${duration}s`)

    // Display aggregation summary
    console.log(`\n📊 Aggregation Summary:`)
    
    console.log(`\n🧪 A/B Test Results:`)
    console.log(`   Total Tests: ${abTestResults.totalTests}`)
    console.log(`   Configurations: ${abTestResults.configurations.length}`)
    console.log(`   Variants: ${abTestResults.variants.length}`)
    console.log(`   Average Quality Score: ${abTestResults.overallStatistics.averageQualityScore.toFixed(2)}`)
    console.log(`   Significance Rate: ${(abTestResults.overallStatistics.significanceRate * 100).toFixed(1)}%`)

    console.log(`\n🔒 Quality Gate Results:`)
    console.log(`   Total Executions: ${qualityGateResults.totalExecutions}`)
    console.log(`   Passed: ${qualityGateResults.passedExecutions}`)
    console.log(`   Blocked: ${qualityGateResults.blockedExecutions}`)
    console.log(`   Pass Rate: ${(qualityGateResults.passRate * 100).toFixed(1)}%`)

    console.log(`\n📉 Regression Results:`)
    console.log(`   Total Analyses: ${regressionResults.totalAnalyses}`)
    console.log(`   Regressions Detected: ${regressionResults.regressionsDetected}`)
    console.log(`   Severe Regressions: ${regressionResults.severeRegressions}`)
    console.log(`   Regression Rate: ${(regressionResults.regressionRate * 100).toFixed(1)}%`)

  } catch (error) {
    console.error(`❌ Results aggregation failed:`, error)
    throw error
  }
}

export async function compareReports(
  baselineReportId: string,
  currentReportId: string
): Promise<void> {
  try {
    console.log(`\n⚖️  Comparing Reports`)
    console.log(`📋 Baseline Report: ${baselineReportId}`)
    console.log(`📋 Current Report: ${currentReportId}`)

    console.log(`\n🔍 Loading reports for comparison...`)
    
    // This would load actual reports in real implementation
    console.log(`⚠️  Report comparison feature requires stored report data`)
    console.log(`💡 Use 'aggregate-results' to generate comparable data first`)

  } catch (error) {
    console.error(`❌ Report comparison failed:`, error)
    throw error
  }
}

async function generateABTestReport(timeRange?: { start: Date; end: Date }): Promise<void> {
  console.log(`📊 Generating A/B Test Report...`)
  
  const abTestResults = await resultsAggregator.aggregateABTestResults('./results/ab-tests', timeRange)
  const statisticalReport = await statisticalReporter.generateABTestStatisticalReport(abTestResults)
  
  console.log(`\n📈 A/B Test Report Generated:`)
  console.log(`   Report ID: ${statisticalReport.reportId}`)
  console.log(`   Total Tests: ${abTestResults.totalTests}`)
  console.log(`   Configurations: ${abTestResults.configurations.length}`)
  console.log(`   Best Variant: ${abTestResults.variantAnalysis.bestVariant || 'None'}`)
  console.log(`   Overall Trend: ${abTestResults.temporalTrends.overallTrend}`)
  
  if (statisticalReport.recommendations.length > 0) {
    console.log(`\n💡 Statistical Recommendations:`)
    for (const rec of statisticalReport.recommendations) {
      console.log(`   • [${rec.priority.toUpperCase()}] ${rec.recommendation}`)
    }
  }
}

async function generateQualityGateReport(timeRange?: { start: Date; end: Date }): Promise<void> {
  console.log(`🔒 Generating Quality Gate Report...`)
  
  const qualityGateResults = await resultsAggregator.aggregateQualityGateResults('./results/quality-gates', timeRange)
  const statisticalReport = await statisticalReporter.generateQualityGateStatisticalReport(qualityGateResults)
  
  console.log(`\n📊 Quality Gate Report Generated:`)
  console.log(`   Report ID: ${statisticalReport.reportId}`)
  console.log(`   Total Executions: ${qualityGateResults.totalExecutions}`)
  console.log(`   Pass Rate: ${(qualityGateResults.passRate * 100).toFixed(1)}%`)
  console.log(`   Blocked Executions: ${qualityGateResults.blockedExecutions}`)
  
  if (qualityGateResults.commonFailures.length > 0) {
    console.log(`\n⚠️  Most Common Failures:`)
    for (const failure of qualityGateResults.commonFailures.slice(0, 3)) {
      console.log(`   • ${failure.reason}: ${failure.frequency} occurrences`)
    }
  }
}

async function generateRegressionReport(timeRange?: { start: Date; end: Date }): Promise<void> {
  console.log(`📉 Generating Regression Report...`)
  
  const regressionResults = await resultsAggregator.aggregateRegressionResults('./results/regressions', timeRange)
  const statisticalReport = await statisticalReporter.generateRegressionStatisticalReport(regressionResults)
  
  console.log(`\n📊 Regression Report Generated:`)
  console.log(`   Report ID: ${statisticalReport.reportId}`)
  console.log(`   Total Analyses: ${regressionResults.totalAnalyses}`)
  console.log(`   Regression Rate: ${(regressionResults.regressionRate * 100).toFixed(1)}%`)
  console.log(`   Severe Regressions: ${regressionResults.severeRegressions}`)
}

async function generateComprehensiveReport(timeRange?: { start: Date; end: Date }): Promise<void> {
  console.log(`📊 Generating Comprehensive Report...`)
  
  const abTestResults = await resultsAggregator.aggregateABTestResults('./results/ab-tests', timeRange)
  const qualityGateResults = await resultsAggregator.aggregateQualityGateResults('./results/quality-gates', timeRange)
  const regressionResults = await resultsAggregator.aggregateRegressionResults('./results/regressions', timeRange)
  
  const comprehensiveRecommendations = await recommendationEngine.generateComprehensiveRecommendations(
    abTestResults,
    qualityGateResults,
    regressionResults
  )
  
  console.log(`\n📊 Comprehensive Report Generated:`)
  console.log(`   Report ID: ${comprehensiveRecommendations.reportId}`)
  console.log(`   Total Recommendations: ${comprehensiveRecommendations.recommendations.length}`)
  console.log(`   Strategic Initiatives: ${comprehensiveRecommendations.strategicInitiatives.length}`)
  console.log(`   Implementation Phases: ${comprehensiveRecommendations.implementationRoadmap.phases.length}`)
  console.log(`   Risk Level: ${comprehensiveRecommendations.riskAssessment.overallRisk.toUpperCase()}`)
  
  const criticalRecs = comprehensiveRecommendations.recommendations.filter(r => r.priority === 'critical')
  if (criticalRecs.length > 0) {
    console.log(`\n🚨 Critical Recommendations:`)
    for (const rec of criticalRecs) {
      console.log(`   • ${rec.title}`)
    }
  }
  
  console.log(`\n💡 Executive Summary:`)
  console.log(`   ${comprehensiveRecommendations.executiveSummary}`)
}

async function generateStatisticalReport(timeRange?: { start: Date; end: Date }): Promise<void> {
  console.log(`📈 Generating Statistical Report...`)
  
  const abTestResults = await resultsAggregator.aggregateABTestResults('./results/ab-tests', timeRange)
  const statisticalReport = await statisticalReporter.generateABTestStatisticalReport(abTestResults)
  
  console.log(`\n📊 Statistical Report Generated:`)
  console.log(`   Report ID: ${statisticalReport.reportId}`)
  console.log(`   Mean Quality Score: ${statisticalReport.descriptiveStatistics.mean.toFixed(2)}`)
  console.log(`   Standard Deviation: ${statisticalReport.descriptiveStatistics.standardDeviation.toFixed(2)}`)
  console.log(`   Statistical Power: ${statisticalReport.powerAnalysis.currentPower.toFixed(2)}`)
  console.log(`   Average Effect Size: ${statisticalReport.effectSizeAnalysis.averageEffectSize.toFixed(3)}`)
  
  if (statisticalReport.powerAnalysis.currentPower < 0.8) {
    console.log(`\n⚠️  Statistical Power Warning:`)
    console.log(`   Current power: ${(statisticalReport.powerAnalysis.currentPower * 100).toFixed(1)}%`)
    console.log(`   Recommended sample size: ${statisticalReport.powerAnalysis.recommendedSampleSize}`)
  }
}

async function generateRecommendationsReport(): Promise<void> {
  console.log(`💡 Generating Recommendations Report...`)
  
  const abTestResults = await resultsAggregator.aggregateABTestResults('./results/ab-tests')
  const qualityGateResults = await resultsAggregator.aggregateQualityGateResults('./results/quality-gates')
  const regressionResults = await resultsAggregator.aggregateRegressionResults('./results/regressions')
  
  const recommendations = await recommendationEngine.generateComprehensiveRecommendations(
    abTestResults,
    qualityGateResults,
    regressionResults
  )
  
  console.log(`\n💡 Recommendations Report Generated:`)
  console.log(`   Report ID: ${recommendations.reportId}`)
  console.log(`   Total Recommendations: ${recommendations.recommendations.length}`)
  
  const priorityGroups = {
    critical: recommendations.recommendations.filter(r => r.priority === 'critical'),
    high: recommendations.recommendations.filter(r => r.priority === 'high'),
    medium: recommendations.recommendations.filter(r => r.priority === 'medium'),
    low: recommendations.recommendations.filter(r => r.priority === 'low')
  }
  
  for (const [priority, recs] of Object.entries(priorityGroups)) {
    if (recs.length > 0) {
      const priorityIcon = priority === 'critical' ? '🚨' : priority === 'high' ? '⚠️' : priority === 'medium' ? '💡' : 'ℹ️'
      console.log(`\n${priorityIcon} ${priority.toUpperCase()} Priority (${recs.length}):`)
      for (const rec of recs.slice(0, 5)) { // Show top 5 per priority
        console.log(`   • ${rec.title}`)
        console.log(`     ${rec.description}`)
      }
    }
  }
  
  console.log(`\n🎯 Implementation Roadmap:`)
  console.log(`   Total Duration: ${recommendations.implementationRoadmap.totalDuration}`)
  for (const phase of recommendations.implementationRoadmap.phases) {
    console.log(`   Phase ${phase.phase}: ${phase.name} (${phase.duration})`)
  }
}

async function generateCrossAnalysisReport(timeRange?: { start: Date; end: Date }): Promise<void> {
  console.log(`🔗 Generating Cross-Analysis Report...`)
  
  const abTestResults = await resultsAggregator.aggregateABTestResults('./results/ab-tests', timeRange)
  const qualityGateResults = await resultsAggregator.aggregateQualityGateResults('./results/quality-gates', timeRange)
  const regressionResults = await resultsAggregator.aggregateRegressionResults('./results/regressions', timeRange)
  
  const crossAnalysis = await resultsAggregator.generateCrossAnalysisReport(
    abTestResults,
    qualityGateResults,
    regressionResults
  )
  
  console.log(`\n🔗 Cross-Analysis Report Generated:`)
  console.log(`   Report ID: ${crossAnalysis.reportId}`)
  console.log(`   Overall Health Score: ${crossAnalysis.healthMetrics.overallScore.toFixed(1)}`)
  console.log(`   System Stability: ${(crossAnalysis.healthMetrics.stability * 100).toFixed(1)}%`)
  console.log(`   Risk Level: ${crossAnalysis.riskAssessment.currentRiskLevel.toUpperCase()}`)
  
  console.log(`\n📊 Key Correlations:`)
  console.log(`   A/B Test ↔ Quality: ${crossAnalysis.correlations.abTestQualityCorrelation.toFixed(2)}`)
  console.log(`   Quality ↔ Regression: ${crossAnalysis.correlations.qualityRegressionCorrelation.toFixed(2)}`)
  console.log(`   Performance ↔ Stability: ${crossAnalysis.correlations.performanceStabilityCorrelation.toFixed(2)}`)
  
  if (crossAnalysis.strategicInsights.length > 0) {
    console.log(`\n🎯 Strategic Insights:`)
    for (const insight of crossAnalysis.strategicInsights) {
      console.log(`   • ${insight}`)
    }
  }
}

async function generateTrendReport(): Promise<void> {
  console.log(`📈 Generating Trend Report...`)
  
  const trendReport = await resultsAggregator.generateHistoricalTrendReport(30) // 30 days
  
  console.log(`\n📈 Trend Report Generated:`)
  console.log(`   Report ID: ${trendReport.reportId}`)
  console.log(`   Time Window: ${trendReport.timeWindow} days`)
  console.log(`   Quality Trend: ${trendReport.trendAnalysis.qualityTrend}`)
  console.log(`   Stability Trend: ${trendReport.trendAnalysis.stabilityTrend}`)
  console.log(`   Regression Trend: ${trendReport.trendAnalysis.regressionTrend}`)
  console.log(`   Overall Direction: ${trendReport.trendAnalysis.overallDirection}`)
  
  if (trendReport.seasonalPatterns.length > 0) {
    console.log(`\n📅 Seasonal Patterns:`)
    for (const pattern of trendReport.seasonalPatterns) {
      console.log(`   • ${pattern.pattern} (${pattern.period}, strength: ${pattern.strength.toFixed(2)})`)
    }
  }
  
  if (trendReport.predictionModels.length > 0) {
    console.log(`\n🔮 Predictions:`)
    for (const model of trendReport.predictionModels) {
      console.log(`   • ${model.metric}: ${model.nextPeriodPrediction.toFixed(2)} (${(model.accuracy * 100).toFixed(1)}% accuracy)`)
    }
  }
}

function parseTimeRange(timeRangeStr: string): { start: Date; end: Date } {
  // Parse time range strings like "7d", "30d", "2023-01-01:2023-12-31"
  
  if (timeRangeStr.includes(':')) {
    // Date range format: "start:end"
    const [startStr, endStr] = timeRangeStr.split(':')
    return {
      start: new Date(startStr),
      end: new Date(endStr)
    }
  } else if (timeRangeStr.endsWith('d')) {
    // Days ago format: "30d"
    const days = parseInt(timeRangeStr.replace('d', ''))
    const end = new Date()
    const start = new Date()
    start.setDate(end.getDate() - days)
    
    return { start, end }
  } else if (timeRangeStr.endsWith('w')) {
    // Weeks ago format: "4w"
    const weeks = parseInt(timeRangeStr.replace('w', ''))
    const end = new Date()
    const start = new Date()
    start.setDate(end.getDate() - (weeks * 7))
    
    return { start, end }
  } else {
    throw new Error(`Invalid time range format: ${timeRangeStr}. Use formats like "7d", "4w", or "2023-01-01:2023-12-31"`)
  }
}