/**
 * Statistical Analysis for A/B Testing
 * Provides statistical significance testing and analysis
 */

import { ABTestVariantResult } from '../types/engine-types'

export class StatisticalAnalysis {
  private static readonly DEFAULT_ALPHA = 0.05 // 95% confidence level
  private static readonly MINIMUM_SAMPLE_SIZE = 3

  compareVariants(
    variants: Record<string, ABTestVariantResult>,
    alpha: number = StatisticalAnalysis.DEFAULT_ALPHA
  ): StatisticalAnalysisResult {
    const variantNames = Object.keys(variants)
    
    if (variantNames.length < 2) {
      throw new Error('At least two variants are required for comparison')
    }

    // For simplicity, compare the first two variants
    // In a more complex implementation, this could handle multiple comparisons
    const variant1Name = variantNames[0]
    const variant2Name = variantNames[1]
    const variant1 = variants[variant1Name]
    const variant2 = variants[variant2Name]

    // Validate sample sizes
    if (variant1.iterations < StatisticalAnalysis.MINIMUM_SAMPLE_SIZE || 
        variant2.iterations < StatisticalAnalysis.MINIMUM_SAMPLE_SIZE) {
      return {
        significant: false,
        pValue: 1.0,
        confidenceLevel: 1 - alpha,
        effectSize: 0,
        testType: 'insufficient-data',
        interpretation: 'Insufficient sample size for statistical analysis',
        recommendation: `Increase sample size to at least ${StatisticalAnalysis.MINIMUM_SAMPLE_SIZE} iterations per variant`
      }
    }

    // Perform two-sample t-test
    const tTestResult = this.performTwoSampleTTest(variant1, variant2, alpha)
    
    // Calculate effect size (Cohen's d)
    const effectSize = this.calculateCohensDelta(variant1, variant2)
    
    // Determine practical significance
    const practicallySignificant = Math.abs(effectSize) > 0.2 // Small effect size threshold
    
    return {
      significant: tTestResult.significant && practicallySignificant,
      pValue: tTestResult.pValue,
      confidenceLevel: 1 - alpha,
      effectSize,
      testType: 'two-sample-t-test',
      interpretation: this.generateInterpretation(tTestResult, effectSize, variant1Name, variant2Name),
      recommendation: this.generateStatisticalRecommendation(tTestResult, effectSize, variant1, variant2)
    }
  }

  performTwoSampleTTest(
    sample1: ABTestVariantResult,
    sample2: ABTestVariantResult,
    alpha: number = StatisticalAnalysis.DEFAULT_ALPHA
  ): TTestResult {
    const n1 = sample1.iterations
    const n2 = sample2.iterations
    const mean1 = sample1.averageScore
    const mean2 = sample2.averageScore
    const std1 = sample1.standardDeviation
    const std2 = sample2.standardDeviation

    // Calculate pooled standard error
    const pooledVariance = ((n1 - 1) * std1 * std1 + (n2 - 1) * std2 * std2) / (n1 + n2 - 2)
    const standardError = Math.sqrt(pooledVariance * (1/n1 + 1/n2))
    
    // Calculate t-statistic
    const tStatistic = (mean1 - mean2) / standardError
    
    // Degrees of freedom
    const degreesOfFreedom = n1 + n2 - 2
    
    // Calculate p-value (two-tailed test)
    const pValue = this.calculatePValue(Math.abs(tStatistic), degreesOfFreedom)
    
    // Determine significance
    const significant = pValue < alpha

    return {
      tStatistic,
      pValue,
      degreesOfFreedom,
      significant,
      criticalValue: this.getCriticalValue(alpha / 2, degreesOfFreedom)
    }
  }

  calculateCohensDelta(sample1: ABTestVariantResult, sample2: ABTestVariantResult): number {
    const n1 = sample1.iterations
    const n2 = sample2.iterations
    const mean1 = sample1.averageScore
    const mean2 = sample2.averageScore
    const std1 = sample1.standardDeviation
    const std2 = sample2.standardDeviation

    // Pooled standard deviation
    const pooledStd = Math.sqrt(((n1 - 1) * std1 * std1 + (n2 - 1) * std2 * std2) / (n1 + n2 - 2))
    
    // Cohen's d
    return (mean1 - mean2) / pooledStd
  }

  calculatePowerAnalysis(
    effectSize: number,
    sampleSize: number,
    alpha: number = StatisticalAnalysis.DEFAULT_ALPHA
  ): PowerAnalysisResult {
    // Simplified power calculation for two-sample t-test
    // This is an approximation - a full implementation would use more sophisticated methods
    
    const delta = effectSize * Math.sqrt(sampleSize / 2)
    const criticalValue = this.getCriticalValue(alpha / 2, sampleSize * 2 - 2)
    
    // Approximate power calculation
    const power = 1 - this.normalCDF(criticalValue - delta) + this.normalCDF(-criticalValue - delta)
    
    return {
      power: Math.max(0, Math.min(1, power)),
      sampleSizeRecommendation: this.recommendSampleSize(effectSize, 0.8, alpha), // 80% power
      minimumDetectableEffect: this.calculateMinimumDetectableEffect(sampleSize, 0.8, alpha)
    }
  }

  private calculatePValue(tStatistic: number, degreesOfFreedom: number): number {
    // Simplified p-value calculation using normal approximation
    // For small samples, this is less accurate than using the t-distribution
    if (degreesOfFreedom > 30) {
      return 2 * (1 - this.normalCDF(tStatistic))
    }

    // For smaller samples, use a more accurate t-distribution approximation
    return 2 * (1 - this.tCDF(tStatistic, degreesOfFreedom))
  }

  private getCriticalValue(alpha: number, degreesOfFreedom: number): number {
    // Simplified critical value calculation
    // This would typically use inverse t-distribution
    if (degreesOfFreedom > 30) {
      return this.normalInverseCDF(1 - alpha)
    }

    // Approximate t-critical values for common degrees of freedom
    const tTable: Record<number, number> = {
      1: 12.706, 2: 4.303, 3: 3.182, 4: 2.776, 5: 2.571,
      10: 2.228, 15: 2.131, 20: 2.086, 25: 2.060, 30: 2.042
    }

    // Find closest match or interpolate
    const closestDf = Object.keys(tTable)
      .map(Number)
      .reduce((prev, curr) => 
        Math.abs(curr - degreesOfFreedom) < Math.abs(prev - degreesOfFreedom) ? curr : prev
      )

    return tTable[closestDf] || 1.96 // Fallback to normal
  }

  private normalCDF(x: number): number {
    // Approximation of standard normal CDF
    const t = 1 / (1 + 0.2316419 * Math.abs(x))
    const d = 0.3989423 * Math.exp(-x * x / 2)
    let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
    
    if (x > 0) prob = 1 - prob
    
    return prob
  }

  private normalInverseCDF(p: number): number {
    // Approximation of inverse normal CDF (quantile function)
    if (p <= 0 || p >= 1) {
      throw new Error('Probability must be between 0 and 1')
    }

    const c0 = 2.515517
    const c1 = 0.802853
    const c2 = 0.010328
    const d1 = 1.432788
    const d2 = 0.189269
    const d3 = 0.001308

    let x: number
    if (p < 0.5) {
      const t = Math.sqrt(-2 * Math.log(p))
      x = -(t - (c0 + c1 * t + c2 * t * t) / (1 + d1 * t + d2 * t * t + d3 * t * t * t))
    } else {
      const t = Math.sqrt(-2 * Math.log(1 - p))
      x = t - (c0 + c1 * t + c2 * t * t) / (1 + d1 * t + d2 * t * t + d3 * t * t * t)
    }

    return x
  }

  private tCDF(t: number, df: number): number {
    // Simplified t-distribution CDF approximation
    // For small degrees of freedom, this provides better accuracy than normal approximation
    if (df > 30) {
      return this.normalCDF(t)
    }

    // Use Welch-Satterthwaite approximation or other methods for small samples
    // This is a simplified implementation
    return this.normalCDF(t * Math.sqrt(df / (df - 2)))
  }

  private generateInterpretation(
    tTestResult: TTestResult,
    effectSize: number,
    variant1Name: string,
    variant2Name: string
  ): string {
    if (!tTestResult.significant) {
      return `No statistically significant difference found between ${variant1Name} and ${variant2Name} (p=${tTestResult.pValue.toFixed(4)})`
    }

    const effectMagnitude = Math.abs(effectSize) < 0.2 ? 'small' :
                           Math.abs(effectSize) < 0.5 ? 'medium' : 'large'
    
    const direction = effectSize > 0 ? `${variant1Name} outperforms ${variant2Name}` :
                                      `${variant2Name} outperforms ${variant1Name}`

    return `Statistically significant difference detected (p=${tTestResult.pValue.toFixed(4)}). ` +
           `${direction} with a ${effectMagnitude} effect size (d=${effectSize.toFixed(3)}).`
  }

  private generateStatisticalRecommendation(
    tTestResult: TTestResult,
    effectSize: number,
    variant1: ABTestVariantResult,
    variant2: ABTestVariantResult
  ): string {
    if (!tTestResult.significant) {
      const recommendedSampleSize = this.recommendSampleSize(Math.abs(effectSize) || 0.3, 0.8, 0.05)
      return `Consider increasing sample size to ${recommendedSampleSize} per variant to detect meaningful differences.`
    }

    if (Math.abs(effectSize) < 0.2) {
      return 'While statistically significant, the practical impact may be minimal. Consider cost-benefit analysis.'
    }

    const betterVariant = variant1.averageScore > variant2.averageScore ? 'first' : 'second'
    return `Strong evidence for adopting the ${betterVariant} variant. Results are both statistically and practically significant.`
  }

  private recommendSampleSize(effectSize: number, power: number, alpha: number): number {
    // Simplified sample size calculation for two-sample t-test
    const zAlpha = this.normalInverseCDF(1 - alpha / 2)
    const zBeta = this.normalInverseCDF(power)
    
    const n = 2 * Math.pow((zAlpha + zBeta) / effectSize, 2)
    
    return Math.ceil(Math.max(n, StatisticalAnalysis.MINIMUM_SAMPLE_SIZE))
  }

  private calculateMinimumDetectableEffect(sampleSize: number, power: number, alpha: number): number {
    // Calculate the minimum effect size detectable with given parameters
    const zAlpha = this.normalInverseCDF(1 - alpha / 2)
    const zBeta = this.normalInverseCDF(power)
    
    return (zAlpha + zBeta) / Math.sqrt(sampleSize / 2)
  }
}

export interface TTestResult {
  tStatistic: number
  pValue: number
  degreesOfFreedom: number
  significant: boolean
  criticalValue: number
}

export interface StatisticalAnalysisResult {
  significant: boolean
  pValue: number
  confidenceLevel: number
  effectSize: number
  testType: string
  interpretation: string
  recommendation: string
}

export interface PowerAnalysisResult {
  power: number
  sampleSizeRecommendation: number
  minimumDetectableEffect: number
}