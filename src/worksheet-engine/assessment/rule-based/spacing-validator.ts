/**
 * Spacing Validator - Validates spacing consistency and quality
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

export interface SpacingValidationResult {
  marginConsistency: number
  paddingConsistency: number
  gapConsistency: number
  verticalRhythm: number
  details: {
    uniqueMarginValues: number
    uniquePaddingValues: number
    spacingViolations: string[]
    standardSpacingUsage: number
  }
}

export class SpacingValidator {
  private static readonly STANDARD_SPACING = [
    '4px', '8px', '12px', '16px', '20px', '24px', '28px', '32px', 
    '36px', '40px', '48px', '56px', '64px', '80px', '96px'
  ]

  private static readonly TAILWIND_SPACING = [
    'p-0', 'p-1', 'p-2', 'p-3', 'p-4', 'p-5', 'p-6', 'p-8', 'p-10', 'p-12',
    'm-0', 'm-1', 'm-2', 'm-3', 'm-4', 'm-5', 'm-6', 'm-8', 'm-10', 'm-12',
    'gap-0', 'gap-1', 'gap-2', 'gap-3', 'gap-4', 'gap-5', 'gap-6', 'gap-8'
  ]

  async validateSpacing(htmlContent: string): Promise<SpacingValidationResult> {
    const marginScore = this.analyzeMarginConsistency(htmlContent)
    const paddingScore = this.analyzePaddingConsistency(htmlContent)
    const gapScore = this.analyzeGapConsistency(htmlContent)
    const rhythmScore = this.analyzeVerticalRhythm(htmlContent)

    return {
      marginConsistency: marginScore.score,
      paddingConsistency: paddingScore.score,
      gapConsistency: gapScore.score,
      verticalRhythm: rhythmScore.score,
      details: {
        uniqueMarginValues: marginScore.uniqueValues,
        uniquePaddingValues: paddingScore.uniqueValues,
        spacingViolations: [
          ...marginScore.violations,
          ...paddingScore.violations,
          ...gapScore.violations,
          ...rhythmScore.violations
        ],
        standardSpacingUsage: this.calculateStandardSpacingUsage(htmlContent)
      }
    }
  }

  private analyzeMarginConsistency(htmlContent: string): {
    score: number
    uniqueValues: number
    violations: string[]
  } {
    const violations: string[] = []
    
    try {
      // Extract all margin declarations
      const marginRegex = /margin(?:-(?:top|right|bottom|left))?\s*:\s*([^;]+)/gi
      const matches = htmlContent.match(marginRegex) || []
      
      const marginValues = new Set<string>()
      const negativeMargins: string[] = []
      
      matches.forEach(match => {
        const value = match.replace(/margin(?:-(?:top|right|bottom|left))?\s*:\s*/i, '').trim()
        marginValues.add(value)
        
        // Check for negative margins
        if (value.includes('-') && !value.includes('calc')) {
          negativeMargins.push(value)
        }
      })

      // Extract Tailwind margin classes
      const tailwindMarginRegex = /\bm[trblxy]?-(?:(?:px)|(?:[0-9]+(?:\.5)?)|(?:auto))\b/g
      const tailwindMatches = htmlContent.match(tailwindMarginRegex) || []
      tailwindMatches.forEach(cls => marginValues.add(cls))

      const uniqueCount = marginValues.size
      let score = 8

      // Score based on consistency
      if (uniqueCount === 0) {
        score = 7 // Using defaults
      } else if (uniqueCount <= 6) {
        score = 10 // Good consistency
      } else if (uniqueCount <= 12) {
        score = 8 // Acceptable
      } else {
        score = Math.max(3, 10 - (uniqueCount - 12) * 0.5)
      }

      // Violations
      if (negativeMargins.length > 0) {
        violations.push(`${negativeMargins.length} negative margins detected`)
        score -= negativeMargins.length * 0.5
      }

      // Check for overly complex margin declarations
      const complexMargins = Array.from(marginValues).filter(value =>
        typeof value === 'string' && (value.includes('calc(') || value.split(' ').length > 2)
      )
      if (complexMargins.length > 2) {
        violations.push('Overly complex margin declarations')
        score -= 1
      }

      return {
        score: Math.max(0, Math.min(10, Number(score.toFixed(1)))),
        uniqueValues: uniqueCount,
        violations
      }
    } catch (error) {
      console.warn('Margin analysis failed:', error)
      return {
        score: 5.0,
        uniqueValues: 0,
        violations: ['Margin analysis failed']
      }
    }
  }

  private analyzePaddingConsistency(htmlContent: string): {
    score: number
    uniqueValues: number
    violations: string[]
  } {
    const violations: string[] = []
    
    try {
      // Extract all padding declarations
      const paddingRegex = /padding(?:-(?:top|right|bottom|left))?\s*:\s*([^;]+)/gi
      const matches = htmlContent.match(paddingRegex) || []
      
      const paddingValues = new Set<string>()
      
      matches.forEach(match => {
        const value = match.replace(/padding(?:-(?:top|right|bottom|left))?\s*:\s*/i, '').trim()
        paddingValues.add(value)
      })

      // Extract Tailwind padding classes
      const tailwindPaddingRegex = /\bp[trblxy]?-(?:(?:px)|(?:[0-9]+(?:\.5)?))\b/g
      const tailwindMatches = htmlContent.match(tailwindPaddingRegex) || []
      tailwindMatches.forEach(cls => paddingValues.add(cls))

      const uniqueCount = paddingValues.size
      let score = 8

      // Score based on consistency
      if (uniqueCount === 0) {
        score = 7 // Using defaults
      } else if (uniqueCount <= 8) {
        score = 10 // Good consistency
      } else if (uniqueCount <= 15) {
        score = 7 // Acceptable
      } else {
        score = Math.max(3, 10 - (uniqueCount - 15) * 0.4)
      }

      // Check for very large padding values (might indicate poor structure)
      const largePadding = Array.from(paddingValues).filter(value =>
        typeof value === 'string' && (
          value.includes('100px') || 
          value.includes('200px') || 
          /\b[2-9][0-9][0-9]px\b/.test(value)
        )
      )
      if (largePadding.length > 1) {
        violations.push('Excessive padding values detected')
        score -= 1.5
      }

      return {
        score: Math.max(0, Math.min(10, Number(score.toFixed(1)))),
        uniqueValues: uniqueCount,
        violations
      }
    } catch (error) {
      console.warn('Padding analysis failed:', error)
      return {
        score: 5.0,
        uniqueValues: 0,
        violations: ['Padding analysis failed']
      }
    }
  }

  private analyzeGapConsistency(htmlContent: string): {
    score: number
    violations: string[]
  } {
    const violations: string[] = []
    
    try {
      // Extract gap declarations (flexbox/grid)
      const gapRegex = /(?:gap|row-gap|column-gap)\s*:\s*([^;]+)/gi
      const matches = htmlContent.match(gapRegex) || []
      
      const gapValues = new Set<string>()
      
      matches.forEach(match => {
        const value = match.replace(/(?:gap|row-gap|column-gap)\s*:\s*/i, '').trim()
        gapValues.add(value)
      })

      // Extract Tailwind gap classes
      const tailwindGapRegex = /\bgap-(?:(?:px)|(?:[0-9]+(?:\.5)?))|gap-[xy]-(?:(?:px)|(?:[0-9]+(?:\.5)?))\b/g
      const tailwindMatches = htmlContent.match(tailwindGapRegex) || []
      tailwindMatches.forEach(cls => gapValues.add(cls))

      let score = 8

      if (gapValues.size === 0) {
        // No explicit gaps - might be using margins/padding for spacing
        score = 6
      } else if (gapValues.size <= 4) {
        score = 10 // Consistent gap usage
      } else if (gapValues.size <= 8) {
        score = 8 // Acceptable variety
      } else {
        score = Math.max(4, 10 - (gapValues.size - 8) * 0.6)
        violations.push('Too many different gap values')
      }

      return {
        score: Math.max(0, Math.min(10, Number(score.toFixed(1)))),
        violations
      }
    } catch (error) {
      console.warn('Gap analysis failed:', error)
      return {
        score: 5.0,
        violations: ['Gap analysis failed']
      }
    }
  }

  private analyzeVerticalRhythm(htmlContent: string): {
    score: number
    violations: string[]
  } {
    const violations: string[] = []
    
    try {
      // Extract line-height declarations
      const lineHeightRegex = /line-height\s*:\s*([^;]+)/gi
      const lineHeightMatches = htmlContent.match(lineHeightRegex) || []
      
      const lineHeights = new Set<string>()
      lineHeightMatches.forEach(match => {
        const value = match.replace(/line-height\s*:\s*/i, '').trim()
        lineHeights.add(value)
      })

      // Extract Tailwind line-height classes
      const tailwindLineHeightRegex = /\bleading-(?:none|tight|snug|normal|relaxed|loose|[0-9]+)\b/g
      const tailwindMatches = htmlContent.match(tailwindLineHeightRegex) || []
      tailwindMatches.forEach(cls => lineHeights.add(cls))

      let score = 7

      if (lineHeights.size === 0) {
        score = 6 // Using browser defaults
        violations.push('No explicit line-height settings')
      } else if (lineHeights.size <= 4) {
        score = 10 // Good rhythm consistency
      } else if (lineHeights.size <= 8) {
        score = 8 // Acceptable variety
      } else {
        score = Math.max(4, 10 - (lineHeights.size - 8) * 0.5)
        violations.push('Too many line-height variations disrupts vertical rhythm')
      }

      // Check for very tight or very loose line heights
      const problematicLineHeights = Array.from(lineHeights).filter(value => {
        const numValue = parseFloat(value as string)
        return !isNaN(numValue) && (numValue < 1.1 || numValue > 2.0)
      })

      if (problematicLineHeights.length > 0) {
        violations.push('Problematic line-height values detected (too tight or too loose)')
        score -= problematicLineHeights.length * 0.5
      }

      return {
        score: Math.max(0, Math.min(10, Number(score.toFixed(1)))),
        violations
      }
    } catch (error) {
      console.warn('Vertical rhythm analysis failed:', error)
      return {
        score: 5.0,
        violations: ['Vertical rhythm analysis failed']
      }
    }
  }

  private calculateStandardSpacingUsage(htmlContent: string): number {
    try {
      // Count standard CSS spacing values
      const standardCssCount = SpacingValidator.STANDARD_SPACING.reduce((count, spacing) => {
        const regex = new RegExp(`\\b${spacing.replace('px', 'px')}\\b`, 'g')
        const matches = htmlContent.match(regex) || []
        return count + matches.length
      }, 0)

      // Count Tailwind spacing classes
      const tailwindSpacingCount = SpacingValidator.TAILWIND_SPACING.reduce((count, cls) => {
        const regex = new RegExp(`\\b${cls}\\b`, 'g')
        const matches = htmlContent.match(regex) || []
        return count + matches.length
      }, 0)

      // Total spacing declarations
      const totalSpacingRegex = /(?:margin|padding|gap)(?:-(?:top|right|bottom|left|x|y))?\s*:\s*[^;]+/gi
      const totalSpacing = htmlContent.match(totalSpacingRegex) || []
      
      const tailwindSpacingRegex = /\b[mp][trblxy]?-[^\s]+|\bgap-[^\s]+/g
      const totalTailwindSpacing = htmlContent.match(tailwindSpacingRegex) || []

      const totalDeclarations = totalSpacing.length + totalTailwindSpacing.length
      const standardUsage = standardCssCount + tailwindSpacingCount

      return totalDeclarations > 0 ? Number((standardUsage / totalDeclarations).toFixed(2)) : 0
    } catch (error) {
      console.warn('Standard spacing calculation failed:', error)
      return 0
    }
  }

  calculateOverallSpacingScore(result: SpacingValidationResult): number {
    return Number(((
      result.marginConsistency +
      result.paddingConsistency +
      result.gapConsistency +
      result.verticalRhythm
    ) / 4).toFixed(1))
  }
}