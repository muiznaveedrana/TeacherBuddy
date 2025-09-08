/**
 * Typography Checker - Validates font and text formatting quality
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

export interface TypographyAnalysisResult {
  fontFamilyConsistency: number
  sizeHierarchy: number
  weightUsage: number
  readability: number
  details: {
    fontFamilyCount: number
    sizeVariations: number
    weightVariations: number
    readabilityIssues: string[]
  }
}

export class TypographyChecker {
  private static readonly RECOMMENDED_FONTS = [
    'arial', 'helvetica', 'georgia', 'times', 'calibri', 'verdana', 
    'tahoma', 'trebuchet ms', 'comic sans ms', 'impact'
  ]

  private static readonly STANDARD_SIZES = [
    '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px'
  ]

  async checkTypography(htmlContent: string): Promise<TypographyAnalysisResult> {
    const fontFamilyScore = this.analyzeFontFamilies(htmlContent)
    const sizeHierarchyScore = this.analyzeSizeHierarchy(htmlContent)
    const weightUsageScore = this.analyzeWeightUsage(htmlContent)
    const readabilityScore = this.analyzeReadability(htmlContent)

    return {
      fontFamilyConsistency: fontFamilyScore.score,
      sizeHierarchy: sizeHierarchyScore.score,
      weightUsage: weightUsageScore.score,
      readability: readabilityScore.score,
      details: {
        fontFamilyCount: fontFamilyScore.count,
        sizeVariations: sizeHierarchyScore.variations,
        weightVariations: weightUsageScore.variations,
        readabilityIssues: readabilityScore.issues
      }
    }
  }

  private analyzeFontFamilies(htmlContent: string): { score: number; count: number } {
    try {
      // Extract all font-family declarations
      const fontFamilyRegex = /font-family\s*:\s*([^;]+)/gi
      const matches = htmlContent.match(fontFamilyRegex) || []
      
      const fontFamilies = new Set()
      
      matches.forEach(match => {
        const family = match.replace(/font-family\s*:\s*/i, '').trim().toLowerCase()
        // Clean up quotes and fallbacks
        const cleanFamily = family.split(',')[0].replace(/['"]/g, '').trim()
        if (cleanFamily) {
          fontFamilies.add(cleanFamily)
        }
      })

      // Also check for Tailwind font classes
      const tailwindFontClasses = htmlContent.match(/font-(?:sans|serif|mono|display)/g) || []
      tailwindFontClasses.forEach(cls => {
        fontFamilies.add(cls.replace('font-', ''))
      })

      const familyCount = fontFamilies.size
      let score = 10

      // Optimal: 1-2 font families
      if (familyCount === 0) {
        score = 5 // No explicit fonts found, using defaults
      } else if (familyCount <= 2) {
        score = 10 // Perfect
      } else if (familyCount <= 4) {
        score = 8 // Acceptable
      } else {
        score = Math.max(3, 10 - (familyCount - 4) * 1.5) // Too many fonts
      }

      // Bonus for using recommended web-safe fonts
      const usesRecommendedFonts = Array.from(fontFamilies).some(font => 
        TypographyChecker.RECOMMENDED_FONTS.includes(font as string)
      )
      if (usesRecommendedFonts && familyCount <= 2) {
        score += 0.5
      }

      return {
        score: Math.min(10, Number(score.toFixed(1))),
        count: familyCount
      }
    } catch (error) {
      console.warn('Font family analysis failed:', error)
      return { score: 5.0, count: 0 }
    }
  }

  private analyzeSizeHierarchy(htmlContent: string): { score: number; variations: number } {
    try {
      // Extract font-size declarations
      const fontSizeRegex = /font-size\s*:\s*([^;]+)/gi
      const matches = htmlContent.match(fontSizeRegex) || []
      
      const sizes = new Set()
      
      matches.forEach(match => {
        const size = match.replace(/font-size\s*:\s*/i, '').trim().toLowerCase()
        sizes.add(size)
      })

      // Check for Tailwind text size classes
      const tailwindSizeClasses = htmlContent.match(/text-(?:xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)/g) || []
      tailwindSizeClasses.forEach(cls => {
        sizes.add(cls)
      })

      const sizeCount = sizes.size
      let score = 8

      // Optimal: 3-6 different sizes for good hierarchy
      if (sizeCount === 0) {
        score = 6 // Using browser defaults
      } else if (sizeCount >= 3 && sizeCount <= 6) {
        score = 10 // Good hierarchy
      } else if (sizeCount >= 7 && sizeCount <= 10) {
        score = 7 // Too many variations but manageable
      } else if (sizeCount > 10) {
        score = Math.max(3, 10 - (sizeCount - 10) * 0.8) // Too many sizes
      } else if (sizeCount < 3) {
        score = 6 // Too few variations for good hierarchy
      }

      // Bonus for using standard sizes
      const usesStandardSizes = Array.from(sizes).some(size =>
        TypographyChecker.STANDARD_SIZES.includes(size as string)
      )
      if (usesStandardSizes) {
        score += 0.5
      }

      return {
        score: Math.min(10, Number(score.toFixed(1))),
        variations: sizeCount
      }
    } catch (error) {
      console.warn('Size hierarchy analysis failed:', error)
      return { score: 5.0, variations: 0 }
    }
  }

  private analyzeWeightUsage(htmlContent: string): { score: number; variations: number } {
    try {
      // Extract font-weight declarations
      const fontWeightRegex = /font-weight\s*:\s*([^;]+)/gi
      const matches = htmlContent.match(fontWeightRegex) || []
      
      const weights = new Set()
      
      matches.forEach(match => {
        const weight = match.replace(/font-weight\s*:\s*/i, '').trim().toLowerCase()
        weights.add(weight)
      })

      // Check for Tailwind font weight classes
      const tailwindWeightClasses = htmlContent.match(/font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/g) || []
      tailwindWeightClasses.forEach(cls => {
        weights.add(cls.replace('font-', ''))
      })

      // Check for <strong> and <b> tags
      const strongTags = (htmlContent.match(/<(?:strong|b)>/gi) || []).length
      if (strongTags > 0) {
        weights.add('bold')
      }

      const weightCount = weights.size
      let score = 8

      // Optimal: 2-4 different weights for good emphasis
      if (weightCount === 0) {
        score = 7 // Using browser defaults (normal)
      } else if (weightCount >= 2 && weightCount <= 4) {
        score = 10 // Good weight hierarchy
      } else if (weightCount === 1) {
        score = 8 // Limited but acceptable
      } else if (weightCount > 4) {
        score = Math.max(4, 10 - (weightCount - 4) * 1.2) // Too many weights
      }

      return {
        score: Math.min(10, Number(score.toFixed(1))),
        variations: weightCount
      }
    } catch (error) {
      console.warn('Weight usage analysis failed:', error)
      return { score: 5.0, variations: 0 }
    }
  }

  private analyzeReadability(htmlContent: string): { score: number; issues: string[] } {
    const issues: string[] = []
    let score = 9

    try {
      // Check for very small text (below 12px)
      const smallTextRegex = /font-size\s*:\s*(?:[0-9]|1[01])px/gi
      const smallTextMatches = htmlContent.match(smallTextRegex) || []
      if (smallTextMatches.length > 0) {
        issues.push(`Found ${smallTextMatches.length} instances of very small text (< 12px)`)
        score -= smallTextMatches.length * 0.5
      }

      // Check for very large text that might be excessive
      const largeTextRegex = /font-size\s*:\s*(?:[5-9][0-9]|[1-9][0-9][0-9])px/gi
      const largeTextMatches = htmlContent.match(largeTextRegex) || []
      if (largeTextMatches.length > 3) {
        issues.push('Excessive use of very large text sizes')
        score -= 1
      }

      // Check for low contrast combinations (basic check)
      if (htmlContent.includes('color: white') && htmlContent.includes('background: white')) {
        issues.push('Potential white-on-white text detected')
        score -= 2
      }

      if (htmlContent.includes('color: #fff') && htmlContent.includes('background: #fff')) {
        issues.push('Potential white-on-white text detected')
        score -= 2
      }

      // Check for excessive use of italic text
      const italicMatches = htmlContent.match(/<(?:em|i)>|font-style\s*:\s*italic/gi) || []
      if (italicMatches.length > 10) {
        issues.push('Excessive use of italic text may impact readability')
        score -= 0.8
      }

      // Check for all caps text (usually bad for readability)
      const allCapsRegex = /text-transform\s*:\s*uppercase/gi
      const allCapsMatches = htmlContent.match(allCapsRegex) || []
      if (allCapsMatches.length > 2) {
        issues.push('Excessive use of ALL CAPS text')
        score -= 1
      }

      // Check for adequate line spacing
      const lineHeightRegex = /line-height\s*:\s*([^;]+)/gi
      const lineHeightMatches = htmlContent.match(lineHeightRegex) || []
      const hasLineHeightSettings = lineHeightMatches.length > 0
      
      if (!hasLineHeightSettings) {
        issues.push('No explicit line-height settings found - may impact readability')
        score -= 0.5
      } else {
        // Check for very tight line spacing
        const tightLineSpacing = lineHeightMatches.some(match => {
          const value = match.replace(/line-height\s*:\s*/i, '').trim()
          return parseFloat(value) < 1.2
        })
        if (tightLineSpacing) {
          issues.push('Very tight line spacing detected')
          score -= 1
        }
      }

      return {
        score: Math.max(0, Math.min(10, Number(score.toFixed(1)))),
        issues
      }
    } catch (error) {
      console.warn('Readability analysis failed:', error)
      return {
        score: 5.0,
        issues: ['Readability analysis failed']
      }
    }
  }

  calculateOverallTypographyScore(result: TypographyAnalysisResult): number {
    return Number(((
      result.fontFamilyConsistency +
      result.sizeHierarchy +
      result.weightUsage +
      result.readability
    ) / 4).toFixed(1))
  }
}