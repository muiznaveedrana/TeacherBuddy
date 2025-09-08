/**
 * Composite Scorer - Weighted scoring calculation for quality assessment
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

import { QualityScores, VisualSimilarityScore, ContentAnalysisScore, RuleBasedLayoutScore } from '../types/engine-types'

export class CompositeScorer {
  private static readonly VISUAL_SIMILARITY_WEIGHT = 0.30
  private static readonly CONTENT_ANALYSIS_WEIGHT = 0.40
  private static readonly RULE_BASED_LAYOUT_WEIGHT = 0.30

  static calculateCompositeScore(scores: {
    visualSimilarity?: VisualSimilarityScore
    contentAnalysis?: ContentAnalysisScore
    ruleBasedLayout?: RuleBasedLayoutScore
  }): QualityScores {
    let totalWeight = 0
    let weightedSum = 0

    // Default scores for missing assessments
    const defaultVisualScore: VisualSimilarityScore = {
      score: 0,
      details: {
        structuralSimilarity: 0,
        layoutConsistency: 0,
        visualAlignment: 0
      }
    }

    const defaultContentScore: ContentAnalysisScore = {
      score: 0,
      details: {
        curriculumAlignment: 0,
        languageAppropriate: 0,
        mathematicalAccuracy: 0
      }
    }

    const defaultLayoutScore: RuleBasedLayoutScore = {
      score: 0,
      details: {
        fontConsistency: 0,
        spacingQuality: 0,
        elementPositioning: 0
      }
    }

    const finalScores: QualityScores = {
      visualSimilarity: scores.visualSimilarity || defaultVisualScore,
      contentAnalysis: scores.contentAnalysis || defaultContentScore,
      ruleBasedLayout: scores.ruleBasedLayout || defaultLayoutScore,
      composite: 0
    }

    // Calculate weighted average of available scores
    if (scores.visualSimilarity && scores.visualSimilarity.score > 0) {
      weightedSum += scores.visualSimilarity.score * this.VISUAL_SIMILARITY_WEIGHT
      totalWeight += this.VISUAL_SIMILARITY_WEIGHT
      finalScores.visualSimilarity = scores.visualSimilarity
    }

    if (scores.contentAnalysis && scores.contentAnalysis.score > 0) {
      weightedSum += scores.contentAnalysis.score * this.CONTENT_ANALYSIS_WEIGHT
      totalWeight += this.CONTENT_ANALYSIS_WEIGHT
      finalScores.contentAnalysis = scores.contentAnalysis
    }

    if (scores.ruleBasedLayout && scores.ruleBasedLayout.score > 0) {
      weightedSum += scores.ruleBasedLayout.score * this.RULE_BASED_LAYOUT_WEIGHT
      totalWeight += this.RULE_BASED_LAYOUT_WEIGHT
      finalScores.ruleBasedLayout = scores.ruleBasedLayout
    }

    // Calculate composite score
    finalScores.composite = totalWeight > 0 ? Number((weightedSum / totalWeight).toFixed(1)) : 0

    return finalScores
  }

  static determineQualityGate(compositeScore: number, threshold: number = 7.0): 'PASSED' | 'FAILED' {
    return compositeScore >= threshold ? 'PASSED' : 'FAILED'
  }

  static generateRecommendations(scores: QualityScores): string[] {
    const recommendations: string[] = []

    // Visual similarity recommendations
    if (scores.visualSimilarity.score > 0 && scores.visualSimilarity.score < 7.0) {
      if (scores.visualSimilarity.details.layoutConsistency < 7.0) {
        recommendations.push('Improve layout consistency across worksheet sections')
      }
      if (scores.visualSimilarity.details.visualAlignment < 7.0) {
        recommendations.push('Enhance visual element alignment and positioning')
      }
      if (scores.visualSimilarity.details.structuralSimilarity < 7.0) {
        recommendations.push('Review structural similarity against reference standards')
      }
    }

    // Content analysis recommendations
    if (scores.contentAnalysis.score > 0 && scores.contentAnalysis.score < 7.0) {
      if (scores.contentAnalysis.details.curriculumAlignment < 7.0) {
        recommendations.push('Improve alignment with curriculum standards')
      }
      if (scores.contentAnalysis.details.languageAppropriate < 7.0) {
        recommendations.push('Review language appropriateness for target age group')
      }
      if (scores.contentAnalysis.details.mathematicalAccuracy < 7.0) {
        recommendations.push('Verify mathematical accuracy in questions and answers')
      }
    }

    // Rule-based layout recommendations
    if (scores.ruleBasedLayout.score > 0 && scores.ruleBasedLayout.score < 7.0) {
      if (scores.ruleBasedLayout.details.fontConsistency < 7.0) {
        recommendations.push('Standardize font families, sizes, and weights throughout worksheet')
      }
      if (scores.ruleBasedLayout.details.spacingQuality < 7.0) {
        recommendations.push('Optimize spacing consistency between elements and sections')
      }
      if (scores.ruleBasedLayout.details.elementPositioning < 7.0) {
        recommendations.push('Improve element positioning and distribution')
      }
    }

    // Overall score recommendations
    if (scores.composite < 6.0) {
      recommendations.push('Consider comprehensive review across all quality dimensions')
    } else if (scores.composite < 8.0) {
      recommendations.push('Focus improvements on lowest-scoring quality dimensions')
    }

    return recommendations
  }
}