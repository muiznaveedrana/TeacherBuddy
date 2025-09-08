/**
 * A/B Testing CLI Commands
 * Handles A/B test execution and management
 */

import { ABTestRunner } from '../../ab-testing/test-runner'
import { BatchTestProcessor } from '../../ab-testing/batch-processor'
import { ResultsComparator } from '../../ab-testing/results-comparator'
import { ABTestConfig, BatchTestConfig } from '../../types/engine-types'

const abTestRunner = new ABTestRunner()
const batchProcessor = new BatchTestProcessor()
const resultsComparator = new ResultsComparator()

export async function runABTest(
  configId: string,
  variants: string[],
  iterations: number = 5,
  parallel: boolean = false,
  outputDir?: string
): Promise<void> {
  try {
    console.log(`\n🧪 Running A/B Test`)
    console.log(`📋 Configuration: ${configId}`)
    console.log(`🔄 Variants: ${variants.join(', ')}`)
    console.log(`🔢 Iterations: ${iterations}`)
    console.log(`⚡ Parallel: ${parallel ? 'Yes' : 'No'}`)
    
    if (outputDir) {
      console.log(`📁 Output Directory: ${outputDir}`)
    }

    const testConfig: ABTestConfig = {
      testName: `cli-ab-test-${configId}-${Date.now()}`,
      configurations: [configId],
      promptVariants: variants.reduce((acc, variant) => {
        acc[variant] = `Prompt variant: ${variant}`
        return acc
      }, {} as Record<string, string>),
      testSettings: {
        iterations,
        parallelExecution: parallel,
        qualityThreshold: 7.5,
        statisticalSignificance: 0.05
      }
    }

    console.log(`\n🚀 Starting A/B test execution...`)
    const startTime = Date.now()

    const results = await abTestRunner.runABTest(testConfig)
    
    const endTime = Date.now()
    const duration = ((endTime - startTime) / 1000).toFixed(1)

    console.log(`\n✅ A/B Test completed in ${duration}s`)

    // Display results for the configuration
    if (results.length > 0) {
      const result = results[0] // Single configuration test
      
      console.log(`\n📊 Results for ${result.configuration}:`)
      console.log(`🏆 Winner: ${result.winner}`)
      console.log(`📈 Statistical Significance: ${result.statisticalAnalysis.significant ? 'Yes' : 'No'}`)
      console.log(`📉 P-Value: ${result.statisticalAnalysis.pValue.toFixed(4)}`)
      console.log(`📏 Effect Size: ${result.statisticalAnalysis.effectSize.toFixed(3)}`)

      console.log(`\n🎯 Variant Performance:`)
      for (const [variantName, variantResult] of Object.entries(result.variants)) {
        console.log(`   ${variantName}:`)
        console.log(`     Average Score: ${variantResult.averageScore.toFixed(2)}`)
        console.log(`     Std Deviation: ${variantResult.standardDeviation.toFixed(2)}`)
        console.log(`     Score Range: ${Math.min(...variantResult.scores).toFixed(2)} - ${Math.max(...variantResult.scores).toFixed(2)}`)
      }

      console.log(`\n💡 Recommendation: ${result.recommendation}`)

      if (outputDir) {
        console.log(`\n📁 Detailed results saved to: ${outputDir}`)
      }
    }

  } catch (error) {
    console.error(`❌ A/B test failed:`, error)
    throw error
  }
}

export async function runBatchTest(
  configFile: string,
  variants: string[],
  parallel: boolean = true,
  outputDir?: string
): Promise<void> {
  try {
    console.log(`\n🔄 Running Batch A/B Test`)
    console.log(`📋 Configuration File: ${configFile}`)
    console.log(`🔄 Variants: ${variants.join(', ')}`)
    console.log(`⚡ Parallel: ${parallel ? 'Yes' : 'No'}`)
    
    if (outputDir) {
      console.log(`📁 Output Directory: ${outputDir}`)
    }

    // Load configurations from file
    const configurations = await batchProcessor.loadPriorityConfigurations(configFile)
    console.log(`📊 Loaded ${configurations.length} configuration(s)`)

    const batchConfig: BatchTestConfig = {
      batchName: `cli-batch-test-${Date.now()}`,
      configurations,
      variants,
      parallelExecution: parallel,
      outputDir: outputDir || `./results/batch-tests/cli-batch-${Date.now()}`
    }

    console.log(`\n🚀 Starting batch test execution...`)
    const startTime = Date.now()

    const results = await batchProcessor.runBatchTest(batchConfig)
    
    const endTime = Date.now()
    const duration = ((endTime - startTime) / 1000 / 60).toFixed(1)

    console.log(`\n✅ Batch test completed in ${duration} minutes`)

    // Display batch results summary
    console.log(`\n📊 Batch Results Summary:`)
    console.log(`   Total Configurations: ${results.totalConfigurations}`)
    console.log(`   Successful: ${results.successfulConfigurations}`)
    console.log(`   Failed: ${results.failedConfigurations}`)
    console.log(`   Success Rate: ${((results.successfulConfigurations / results.totalConfigurations) * 100).toFixed(1)}%`)

    if (results.analysis.bestPerformingConfiguration) {
      console.log(`   Best Configuration: ${results.analysis.bestPerformingConfiguration}`)
    }

    if (results.analysis.consistentWinners.length > 0) {
      console.log(`   Consistent Winners: ${results.analysis.consistentWinners.join(', ')}`)
    }

    console.log(`\n💡 Batch Recommendations:`)
    for (const recommendation of results.batchRecommendations) {
      console.log(`   • ${recommendation}`)
    }

    console.log(`\n📁 Detailed results saved to: ${results.batchId}`)

  } catch (error) {
    console.error(`❌ Batch test failed:`, error)
    throw error
  }
}

export async function runRegressionTest(
  baselineDir: string,
  newVariant: string,
  configurations: string[],
  outputDir?: string
): Promise<void> {
  try {
    console.log(`\n🔍 Running Regression Test`)
    console.log(`📂 Baseline Directory: ${baselineDir}`)
    console.log(`🆕 New Variant: ${newVariant}`)
    console.log(`📋 Configurations: ${configurations.join(', ')}`)
    
    if (outputDir) {
      console.log(`📁 Output Directory: ${outputDir}`)
    }

    console.log(`\n🚀 Starting regression test execution...`)
    const startTime = Date.now()

    const results = await batchProcessor.runRegressionTest(
      baselineDir,
      newVariant,
      configurations,
      outputDir
    )
    
    const endTime = Date.now()
    const duration = ((endTime - startTime) / 1000).toFixed(1)

    console.log(`\n✅ Regression test completed in ${duration}s`)

    // Display regression results
    console.log(`\n📊 Regression Test Results:`)
    console.log(`   Configurations Tested: ${results.configurations.length}`)
    console.log(`   Regressions Detected: ${results.results.filter(r => r.regressionDetected).length}`)
    console.log(`   Overall Assessment: ${results.overallRegression.detected ? '⚠️ REGRESSION DETECTED' : '✅ No Regression'}`)

    if (results.overallRegression.detected) {
      console.log(`   Severity: ${results.overallRegression.severity.toUpperCase()}`)
      console.log(`   Affected Configurations: ${results.overallRegression.affectedConfigurations}`)
      console.log(`   Average Score Drop: ${results.overallRegression.averageScoreDrop.toFixed(2)}`)
    }

    console.log(`\n📋 Configuration Details:`)
    for (const result of results.results) {
      const status = result.regressionDetected ? '⚠️' : '✅'
      console.log(`   ${status} ${result.configId}:`)
      console.log(`       Baseline Score: ${result.baselineScore.toFixed(2)}`)
      console.log(`       New Score: ${result.newVariantScore.toFixed(2)}`)
      console.log(`       Difference: ${result.scoreDifference >= 0 ? '+' : ''}${result.scoreDifference.toFixed(2)}`)
    }

    console.log(`\n💡 Recommendation: ${results.recommendation}`)

    console.log(`\n📁 Detailed results saved to: ${results.testId}`)

  } catch (error) {
    console.error(`❌ Regression test failed:`, error)
    throw error
  }
}

export async function compareResults(resultsDir: string): Promise<void> {
  try {
    console.log(`\n🔍 Comparing A/B Test Results`)
    console.log(`📂 Results Directory: ${resultsDir}`)

    console.log(`\n📊 Loading and analyzing results...`)
    
    const comparison = await resultsComparator.compareResultsFromDirectory(resultsDir)

    console.log(`\n✅ Analysis completed`)

    // Display comparison results
    console.log(`\n📊 Comparison Summary:`)
    console.log(`   Total Tests Analyzed: ${comparison.totalTests}`)
    console.log(`   Configurations: ${comparison.configurations.length}`)
    console.log(`   Variants Tested: ${Object.keys(comparison.variantAnalysis.variants).length}`)

    if (comparison.variantAnalysis.bestVariant) {
      const bestVariant = comparison.variantAnalysis.variants[comparison.variantAnalysis.bestVariant]
      console.log(`\n🏆 Best Performing Variant: ${comparison.variantAnalysis.bestVariant}`)
      console.log(`   Average Score: ${bestVariant.averageScore.toFixed(2)}`)
      console.log(`   Win Rate: ${(bestVariant.winRate * 100).toFixed(1)}%`)
      console.log(`   Consistency: ${(bestVariant.consistency * 100).toFixed(1)}%`)
    }

    if (comparison.variantAnalysis.mostConsistentVariant && 
        comparison.variantAnalysis.mostConsistentVariant !== comparison.variantAnalysis.bestVariant) {
      const consistentVariant = comparison.variantAnalysis.variants[comparison.variantAnalysis.mostConsistentVariant]
      console.log(`\n🎯 Most Consistent Variant: ${comparison.variantAnalysis.mostConsistentVariant}`)
      console.log(`   Consistency: ${(consistentVariant.consistency * 100).toFixed(1)}%`)
      console.log(`   Average Score: ${consistentVariant.averageScore.toFixed(2)}`)
    }

    if (comparison.configurationAnalysis.bestConfiguration) {
      console.log(`\n📋 Best Configuration: ${comparison.configurationAnalysis.bestConfiguration}`)
      const bestConfig = comparison.configurationAnalysis.configurations[comparison.configurationAnalysis.bestConfiguration]
      console.log(`   Average Score: ${bestConfig.averageScore.toFixed(2)}`)
      console.log(`   Significant Tests: ${(bestConfig.significantTestRate * 100).toFixed(1)}%`)
    }

    console.log(`\n📈 Statistical Insights:`)
    console.log(`   Significance Rate: ${(comparison.statisticalInsights.significanceRate * 100).toFixed(1)}%`)
    console.log(`   Average Effect Size: ${comparison.statisticalInsights.averageEffectSize.toFixed(3)}`)
    console.log(`   Statistical Power: ${comparison.statisticalInsights.powerAnalysis}`)

    if (comparison.recommendations.length > 0) {
      console.log(`\n💡 Recommendations:`)
      for (const recommendation of comparison.recommendations) {
        console.log(`   • ${recommendation}`)
      }
    }

  } catch (error) {
    console.error(`❌ Results comparison failed:`, error)
    throw error
  }
}

export async function singleVariantComparison(
  configId: string,
  variant1: string,
  variant2: string,
  iterations: number = 5
): Promise<void> {
  try {
    console.log(`\n⚖️  Single Variant Comparison`)
    console.log(`📋 Configuration: ${configId}`)
    console.log(`🆚 ${variant1} vs ${variant2}`)
    console.log(`🔢 Iterations: ${iterations}`)

    console.log(`\n🚀 Running comparison...`)
    const startTime = Date.now()

    const result = await abTestRunner.runSingleVariantComparison(
      configId,
      variant1,
      variant2,
      iterations
    )
    
    const endTime = Date.now()
    const duration = ((endTime - startTime) / 1000).toFixed(1)

    console.log(`\n✅ Comparison completed in ${duration}s`)

    // Display comparison results
    console.log(`\n📊 Comparison Results:`)
    console.log(`🏆 Winner: ${result.winner}`)
    console.log(`📈 Statistical Significance: ${result.statisticalAnalysis.significant ? 'Yes' : 'No'}`)
    console.log(`📉 P-Value: ${result.statisticalAnalysis.pValue.toFixed(4)}`)
    console.log(`📏 Effect Size: ${result.statisticalAnalysis.effectSize.toFixed(3)}`)

    console.log(`\n🎯 Variant Performance:`)
    const variant1Result = result.variants[variant1]
    const variant2Result = result.variants[variant2]

    console.log(`   ${variant1}:`)
    console.log(`     Average Score: ${variant1Result.averageScore.toFixed(2)}`)
    console.log(`     Std Deviation: ${variant1Result.standardDeviation.toFixed(2)}`)
    console.log(`     Scores: [${variant1Result.scores.map(s => s.toFixed(2)).join(', ')}]`)

    console.log(`   ${variant2}:`)
    console.log(`     Average Score: ${variant2Result.averageScore.toFixed(2)}`)
    console.log(`     Std Deviation: ${variant2Result.standardDeviation.toFixed(2)}`)
    console.log(`     Scores: [${variant2Result.scores.map(s => s.toFixed(2)).join(', ')}]`)

    const scoreDifference = variant1Result.averageScore - variant2Result.averageScore
    const improvementPercent = ((Math.abs(scoreDifference) / Math.min(variant1Result.averageScore, variant2Result.averageScore)) * 100).toFixed(1)

    console.log(`\n📏 Performance Difference:`)
    console.log(`   Score Difference: ${scoreDifference >= 0 ? '+' : ''}${scoreDifference.toFixed(2)}`)
    console.log(`   Relative Improvement: ${improvementPercent}%`)

    console.log(`\n💡 Recommendation: ${result.recommendation}`)

  } catch (error) {
    console.error(`❌ Variant comparison failed:`, error)
    throw error
  }
}