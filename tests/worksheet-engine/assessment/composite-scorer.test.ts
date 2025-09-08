/**
 * Composite Scorer Tests
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

import { CompositeScorer } from '@/worksheet-engine/assessment/composite-scorer'
import { VisualSimilarityScore, ContentAnalysisScore, RuleBasedLayoutScore } from '@/worksheet-engine/types/engine-types'

describe('CompositeScorer', () => {
  describe('calculateCompositeScore', () => {
    it('should calculate composite score with all assessment types', () => {
      const visualSimilarity: VisualSimilarityScore = {
        score: 8.0,
        details: {
          structuralSimilarity: 8.5,
          layoutConsistency: 7.8,
          visualAlignment: 8.3
        }
      }

      const contentAnalysis: ContentAnalysisScore = {
        score: 9.1,
        details: {
          curriculumAlignment: 9.0,
          languageAppropriate: 9.5,
          mathematicalAccuracy: 8.8
        }
      }

      const ruleBasedLayout: RuleBasedLayoutScore = {
        score: 7.8,
        details: {
          fontConsistency: 8.0,
          spacingQuality: 7.5,
          elementPositioning: 8.0
        }
      }

      const result = CompositeScorer.calculateCompositeScore({
        visualSimilarity,
        contentAnalysis,
        ruleBasedLayout
      })

      expect(result.composite).toBeCloseTo(8.4, 1)
      expect(result.visualSimilarity).toBe(visualSimilarity)
      expect(result.contentAnalysis).toBe(contentAnalysis)
      expect(result.ruleBasedLayout).toBe(ruleBasedLayout)
    })

    it('should handle missing visual similarity assessment', () => {
      const contentAnalysis: ContentAnalysisScore = {
        score: 9.0,
        details: {
          curriculumAlignment: 9.0,
          languageAppropriate: 9.0,
          mathematicalAccuracy: 9.0
        }
      }

      const ruleBasedLayout: RuleBasedLayoutScore = {
        score: 8.0,
        details: {
          fontConsistency: 8.0,
          spacingQuality: 8.0,
          elementPositioning: 8.0
        }
      }

      const result = CompositeScorer.calculateCompositeScore({
        contentAnalysis,
        ruleBasedLayout
      })

      expect(result.composite).toBeGreaterThan(0)
      expect(result.visualSimilarity.score).toBe(0)
      expect(result.contentAnalysis).toBe(contentAnalysis)
      expect(result.ruleBasedLayout).toBe(ruleBasedLayout)
    })

    it('should return zero composite score when no valid assessments provided', () => {
      const result = CompositeScorer.calculateCompositeScore({})

      expect(result.composite).toBe(0)
      expect(result.visualSimilarity.score).toBe(0)
      expect(result.contentAnalysis.score).toBe(0)
      expect(result.ruleBasedLayout.score).toBe(0)
    })
  })

  describe('determineQualityGate', () => {
    it('should return PASSED for scores at or above threshold', () => {
      expect(CompositeScorer.determineQualityGate(7.0)).toBe('PASSED')
      expect(CompositeScorer.determineQualityGate(8.5)).toBe('PASSED')
      expect(CompositeScorer.determineQualityGate(10.0)).toBe('PASSED')
    })

    it('should return FAILED for scores below threshold', () => {
      expect(CompositeScorer.determineQualityGate(6.9)).toBe('FAILED')
      expect(CompositeScorer.determineQualityGate(5.0)).toBe('FAILED')
      expect(CompositeScorer.determineQualityGate(0)).toBe('FAILED')
    })

    it('should use custom threshold', () => {
      expect(CompositeScorer.determineQualityGate(8.0, 8.5)).toBe('FAILED')
      expect(CompositeScorer.determineQualityGate(9.0, 8.5)).toBe('PASSED')
    })
  })

  describe('generateRecommendations', () => {
    it('should generate recommendations for low visual similarity', () => {
      const scores = {
        visualSimilarity: {
          score: 6.0,
          details: {
            structuralSimilarity: 5.0,
            layoutConsistency: 6.0,
            visualAlignment: 7.0
          }
        },
        contentAnalysis: {
          score: 8.0,
          details: {
            curriculumAlignment: 8.0,
            languageAppropriate: 8.0,
            mathematicalAccuracy: 8.0
          }
        },
        ruleBasedLayout: {
          score: 8.0,
          details: {
            fontConsistency: 8.0,
            spacingQuality: 8.0,
            elementPositioning: 8.0
          }
        },
        composite: 7.3
      }

      const recommendations = CompositeScorer.generateRecommendations(scores)

      expect(recommendations).toContain('Review structural similarity against reference standards')
      expect(recommendations.length).toBeGreaterThan(0)
    })

    it('should generate recommendations for low content analysis', () => {
      const scores = {
        visualSimilarity: {
          score: 8.0,
          details: {
            structuralSimilarity: 8.0,
            layoutConsistency: 8.0,
            visualAlignment: 8.0
          }
        },
        contentAnalysis: {
          score: 6.0,
          details: {
            curriculumAlignment: 5.0,
            languageAppropriate: 6.0,
            mathematicalAccuracy: 7.0
          }
        },
        ruleBasedLayout: {
          score: 8.0,
          details: {
            fontConsistency: 8.0,
            spacingQuality: 8.0,
            elementPositioning: 8.0
          }
        },
        composite: 7.2
      }

      const recommendations = CompositeScorer.generateRecommendations(scores)

      expect(recommendations).toContain('Improve alignment with curriculum standards')
      expect(recommendations.length).toBeGreaterThan(0)
    })

    it('should generate recommendations for low rule-based layout', () => {
      const scores = {
        visualSimilarity: {
          score: 8.0,
          details: {
            structuralSimilarity: 8.0,
            layoutConsistency: 8.0,
            visualAlignment: 8.0
          }
        },
        contentAnalysis: {
          score: 8.0,
          details: {
            curriculumAlignment: 8.0,
            languageAppropriate: 8.0,
            mathematicalAccuracy: 8.0
          }
        },
        ruleBasedLayout: {
          score: 6.0,
          details: {
            fontConsistency: 5.0,
            spacingQuality: 6.0,
            elementPositioning: 7.0
          }
        },
        composite: 7.3
      }

      const recommendations = CompositeScorer.generateRecommendations(scores)

      expect(recommendations).toContain('Standardize font families, sizes, and weights throughout worksheet')
      expect(recommendations).toContain('Optimize spacing consistency between elements and sections')
      expect(recommendations.length).toBeGreaterThan(0)
    })

    it('should generate overall recommendations for very low composite scores', () => {
      const scores = {
        visualSimilarity: {
          score: 5.0,
          details: {
            structuralSimilarity: 5.0,
            layoutConsistency: 5.0,
            visualAlignment: 5.0
          }
        },
        contentAnalysis: {
          score: 5.0,
          details: {
            curriculumAlignment: 5.0,
            languageAppropriate: 5.0,
            mathematicalAccuracy: 5.0
          }
        },
        ruleBasedLayout: {
          score: 5.0,
          details: {
            fontConsistency: 5.0,
            spacingQuality: 5.0,
            elementPositioning: 5.0
          }
        },
        composite: 5.0
      }

      const recommendations = CompositeScorer.generateRecommendations(scores)

      expect(recommendations).toContain('Consider comprehensive review across all quality dimensions')
      expect(recommendations.length).toBeGreaterThan(3)
    })

    it('should return minimal recommendations for high scores', () => {
      const scores = {
        visualSimilarity: {
          score: 9.0,
          details: {
            structuralSimilarity: 9.0,
            layoutConsistency: 9.0,
            visualAlignment: 9.0
          }
        },
        contentAnalysis: {
          score: 9.0,
          details: {
            curriculumAlignment: 9.0,
            languageAppropriate: 9.0,
            mathematicalAccuracy: 9.0
          }
        },
        ruleBasedLayout: {
          score: 9.0,
          details: {
            fontConsistency: 9.0,
            spacingQuality: 9.0,
            elementPositioning: 9.0
          }
        },
        composite: 9.0
      }

      const recommendations = CompositeScorer.generateRecommendations(scores)

      expect(recommendations.length).toBe(0)
    })
  })
})