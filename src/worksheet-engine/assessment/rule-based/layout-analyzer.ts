/**
 * Layout Analyzer - Analyzes worksheet layout consistency and quality
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

import { RuleBasedLayoutScore } from '../../types/engine-types'

export interface LayoutAnalysisResult {
  fontConsistency: number
  spacingQuality: number
  elementPositioning: number
  analysisDetails: {
    fontVariations: number
    spacingInconsistencies: number
    misalignedElements: number
    marginViolations: number
  }
}

export class LayoutAnalyzer {
  async analyzeLayout(htmlContent: string): Promise<LayoutAnalysisResult> {
    const fontScore = await this.analyzeFontConsistency(htmlContent)
    const spacingScore = await this.analyzeSpacingQuality(htmlContent)
    const positioningScore = await this.analyzeElementPositioning(htmlContent)

    return {
      fontConsistency: fontScore.score,
      spacingQuality: spacingScore.score,
      elementPositioning: positioningScore.score,
      analysisDetails: {
        fontVariations: fontScore.variations,
        spacingInconsistencies: spacingScore.inconsistencies,
        misalignedElements: positioningScore.misaligned,
        marginViolations: spacingScore.marginViolations
      }
    }
  }

  private async analyzeFontConsistency(htmlContent: string): Promise<{ score: number; variations: number }> {
    try {
      // Extract font-related CSS properties and inline styles
      const fontFamilyMatches = htmlContent.match(/font-family\s*:\s*[^;]+/gi) || []
      const fontSizeMatches = htmlContent.match(/font-size\s*:\s*[^;]+/gi) || []
      const fontWeightMatches = htmlContent.match(/font-weight\s*:\s*[^;]+/gi) || []

      // Count unique font families
      const uniqueFonts = new Set(
        fontFamilyMatches.map(match => 
          match.replace(/font-family\s*:\s*/i, '').trim().toLowerCase()
        )
      )

      // Count unique font sizes
      const uniqueSizes = new Set(
        fontSizeMatches.map(match =>
          match.replace(/font-size\s*:\s*/i, '').trim().toLowerCase()
        )
      )

      // Count unique font weights
      const uniqueWeights = new Set(
        fontWeightMatches.map(match =>
          match.replace(/font-weight\s*:\s*/i, '').trim().toLowerCase()
        )
      )

      // Calculate variations score (fewer variations = higher score)
      const totalVariations = uniqueFonts.size + uniqueSizes.size + uniqueWeights.size
      const maxExpectedVariations = 8 // Reasonable number for a worksheet
      
      let score = 10
      if (totalVariations > maxExpectedVariations) {
        score = Math.max(0, 10 - ((totalVariations - maxExpectedVariations) * 0.5))
      }

      // Penalty for too many different fonts (should be 1-2 font families max)
      if (uniqueFonts.size > 2) {
        score -= (uniqueFonts.size - 2) * 1.5
      }

      return {
        score: Math.max(0, Math.min(10, Number(score.toFixed(1)))),
        variations: totalVariations
      }
    } catch (error) {
      console.warn('Font consistency analysis failed:', error)
      return { score: 5.0, variations: 0 }
    }
  }

  private async analyzeSpacingQuality(htmlContent: string): Promise<{ 
    score: number; 
    inconsistencies: number; 
    marginViolations: number 
  }> {
    try {
      // Extract margin and padding values
      const marginMatches = htmlContent.match(/margin[^:]*:\s*[^;]+/gi) || []
      const paddingMatches = htmlContent.match(/padding[^:]*:\s*[^;]+/gi) || []
      const gapMatches = htmlContent.match(/gap\s*:\s*[^;]+/gi) || []

      // Analyze margin consistency
      const margins = marginMatches.map(match => 
        match.replace(/margin[^:]*:\s*/i, '').trim().toLowerCase()
      )
      const uniqueMargins = new Set(margins)

      // Analyze padding consistency
      const paddings = paddingMatches.map(match =>
        match.replace(/padding[^:]*:\s*/i, '').trim().toLowerCase()
      )
      const uniquePaddings = new Set(paddings)

      // Check for common spacing values (good practice)
      const commonSpacingPattern = /\b(8|12|16|20|24|32|48|64)px\b/g
      const spacingValues = htmlContent.match(commonSpacingPattern) || []
      const standardSpacingRatio = spacingValues.length / Math.max(1, margins.length + paddings.length)

      // Calculate spacing quality score
      let score = 8.0

      // Reward consistent spacing patterns
      if (standardSpacingRatio > 0.7) {
        score += 1.0
      } else if (standardSpacingRatio < 0.3) {
        score -= 2.0
      }

      // Penalty for too many unique spacing values
      const totalUniqueSpacing = uniqueMargins.size + uniquePaddings.size
      if (totalUniqueSpacing > 10) {
        score -= (totalUniqueSpacing - 10) * 0.3
      }

      // Check for margin violations (negative margins are usually bad)
      const negativeMarginMatches = htmlContent.match(/margin[^:]*:\s*[^;]*-[0-9]/gi) || []
      const marginViolations = negativeMarginMatches.length

      if (marginViolations > 0) {
        score -= marginViolations * 0.5
      }

      return {
        score: Math.max(0, Math.min(10, Number(score.toFixed(1)))),
        inconsistencies: totalUniqueSpacing,
        marginViolations
      }
    } catch (error) {
      console.warn('Spacing quality analysis failed:', error)
      return { score: 5.0, inconsistencies: 0, marginViolations: 0 }
    }
  }

  private async analyzeElementPositioning(htmlContent: string): Promise<{ 
    score: number; 
    misaligned: number 
  }> {
    try {
      // Analyze CSS positioning and alignment
      const positionMatches = htmlContent.match(/position\s*:\s*[^;]+/gi) || []
      const textAlignMatches = htmlContent.match(/text-align\s*:\s*[^;]+/gi) || []
      const displayMatches = htmlContent.match(/display\s*:\s*[^;]+/gi) || []
      const flexMatches = htmlContent.match(/justify-content|align-items|align-self/gi) || []

      // Count absolute/fixed positioning (can be problematic)
      const problematicPositioning = positionMatches.filter(match =>
        /position\s*:\s*(absolute|fixed)/i.test(match)
      ).length

      // Analyze text alignment consistency
      const alignments = textAlignMatches.map(match =>
        match.replace(/text-align\s*:\s*/i, '').trim().toLowerCase()
      )
      const uniqueAlignments = new Set(alignments)

      // Check for modern layout techniques (flexbox, grid)
      const modernLayoutCount = displayMatches.filter(match =>
        /display\s*:\s*(flex|grid)/i.test(match)
      ).length + flexMatches.length

      let score = 7.0

      // Reward modern layout techniques
      if (modernLayoutCount > 2) {
        score += 1.5
      }

      // Penalty for excessive absolute positioning
      if (problematicPositioning > 3) {
        score -= problematicPositioning * 0.8
      }

      // Reward consistent text alignment
      if (uniqueAlignments.size <= 3) {
        score += 1.0
      } else {
        score -= (uniqueAlignments.size - 3) * 0.5
      }

      // Check for alignment classes (Tailwind CSS patterns)
      const alignmentClasses = htmlContent.match(/class="[^"]*(?:text-(?:left|center|right|justify)|justify-(?:start|center|end|between|around|evenly)|items-(?:start|center|end|stretch)|self-(?:start|center|end|stretch))[^"]*"/g) || []
      
      if (alignmentClasses.length > 5) {
        score += 0.5
      }

      const misalignedCount = Math.max(0, problematicPositioning + Math.max(0, uniqueAlignments.size - 3))

      return {
        score: Math.max(0, Math.min(10, Number(score.toFixed(1)))),
        misaligned: misalignedCount
      }
    } catch (error) {
      console.warn('Element positioning analysis failed:', error)
      return { score: 5.0, misaligned: 0 }
    }
  }

  generateLayoutScore(analysisResult: LayoutAnalysisResult): RuleBasedLayoutScore {
    const averageScore = (
      analysisResult.fontConsistency + 
      analysisResult.spacingQuality + 
      analysisResult.elementPositioning
    ) / 3

    return {
      score: Number(averageScore.toFixed(1)),
      details: {
        fontConsistency: analysisResult.fontConsistency,
        spacingQuality: analysisResult.spacingQuality,
        elementPositioning: analysisResult.elementPositioning
      }
    }
  }
}