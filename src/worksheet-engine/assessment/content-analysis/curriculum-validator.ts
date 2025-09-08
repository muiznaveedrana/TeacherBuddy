/**
 * Curriculum Validator - Validates content against curriculum standards
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

import { ExtractedContent } from './text-extraction'

export interface CurriculumStandard {
  yearGroup: string
  subject: string
  topic: string
  subtopic: string
  expectedConcepts: string[]
  vocabularyKeywords: string[]
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced'
  ageAppropriateWords: string[]
  prohibitedWords: string[]
}

export interface CurriculumValidationResult {
  alignmentScore: number
  languageAppropriatenessScore: number
  conceptCoverageScore: number
  details: {
    matchedConcepts: string[]
    missedConcepts: string[]
    appropriateLanguage: string[]
    inappropriateLanguage: string[]
    vocabularyMatches: number
    readabilityLevel: 'easy' | 'moderate' | 'difficult'
    estimatedAge: string
  }
  validationTime: number
}

export class CurriculumValidator {
  private static readonly CURRICULUM_STANDARDS: Record<string, CurriculumStandard> = {
    'year1-addition': {
      yearGroup: 'Year 1',
      subject: 'Mathematics',
      topic: 'Addition',
      subtopic: 'Basic Addition',
      expectedConcepts: ['counting', 'adding', 'sum', 'total', 'more', 'together', 'combine'],
      vocabularyKeywords: ['add', 'plus', 'equals', 'makes', 'altogether', 'count on'],
      difficultyLevel: 'beginner',
      ageAppropriateWords: ['simple', 'easy', 'fun', 'count', 'number', 'how many'],
      prohibitedWords: ['complex', 'difficult', 'challenging', 'advanced', 'sophisticated']
    },
    'year2-addition': {
      yearGroup: 'Year 2',
      subject: 'Mathematics',
      topic: 'Addition',
      subtopic: 'Two-digit Addition',
      expectedConcepts: ['tens', 'ones', 'place value', 'carry over', 'column addition', 'mental math'],
      vocabularyKeywords: ['tens', 'ones', 'place value', 'column', 'regroup', 'carry'],
      difficultyLevel: 'beginner',
      ageAppropriateWords: ['tens', 'ones', 'column', 'place', 'value', 'regroup'],
      prohibitedWords: ['algorithm', 'sophisticated', 'complex', 'advanced']
    },
    'year3-addition': {
      yearGroup: 'Year 3',
      subject: 'Mathematics',
      topic: 'Addition',
      subtopic: 'Multi-digit Addition',
      expectedConcepts: ['hundreds', 'thousands', 'place value', 'regrouping', 'estimation', 'mental strategies'],
      vocabularyKeywords: ['hundreds', 'thousands', 'estimate', 'regroup', 'strategy', 'mental math'],
      difficultyLevel: 'intermediate',
      ageAppropriateWords: ['estimate', 'strategy', 'hundreds', 'thousands', 'regroup'],
      prohibitedWords: ['sophisticated', 'complex']
    },
    'year4-multiplication': {
      yearGroup: 'Year 4',
      subject: 'Mathematics',
      topic: 'Multiplication',
      subtopic: 'Times Tables and Methods',
      expectedConcepts: ['times tables', 'multiplication', 'factors', 'product', 'arrays', 'repeated addition'],
      vocabularyKeywords: ['multiply', 'times', 'product', 'factor', 'array', 'groups of'],
      difficultyLevel: 'intermediate',
      ageAppropriateWords: ['multiply', 'times', 'groups', 'arrays', 'factors'],
      prohibitedWords: ['sophisticated', 'advanced']
    },
    'year5-fractions': {
      yearGroup: 'Year 5',
      subject: 'Mathematics',
      topic: 'Fractions',
      subtopic: 'Understanding Fractions',
      expectedConcepts: ['numerator', 'denominator', 'equivalent', 'mixed numbers', 'improper fractions'],
      vocabularyKeywords: ['fraction', 'numerator', 'denominator', 'equivalent', 'mixed', 'improper'],
      difficultyLevel: 'intermediate',
      ageAppropriateWords: ['fraction', 'part', 'whole', 'equal', 'pieces'],
      prohibitedWords: ['sophisticated', 'complex']
    }
  }

  async validateContent(
    content: ExtractedContent, 
    expectedStandard: Partial<CurriculumStandard>
  ): Promise<CurriculumValidationResult> {
    const startTime = Date.now()

    try {
      // Find matching curriculum standard or use provided standard
      const standard = this.findMatchingStandard(expectedStandard) || this.createDefaultStandard(expectedStandard)
      
      const alignmentScore = this.assessCurriculumAlignment(content, standard)
      const languageScore = this.assessLanguageAppropriateness(content, standard)
      const conceptScore = this.assessConceptCoverage(content, standard)

      const validationTime = Date.now() - startTime

      return {
        alignmentScore,
        languageAppropriatenessScore: languageScore.score,
        conceptCoverageScore: conceptScore.score,
        details: {
          matchedConcepts: conceptScore.matched,
          missedConcepts: conceptScore.missed,
          appropriateLanguage: languageScore.appropriate,
          inappropriateLanguage: languageScore.inappropriate,
          vocabularyMatches: alignmentScore,
          readabilityLevel: this.assessReadabilityLevel(content),
          estimatedAge: this.estimateAgeLevel(content, standard)
        },
        validationTime
      }
    } catch (error) {
      console.error('Curriculum validation failed:', error)
      
      return {
        alignmentScore: 5.0,
        languageAppropriatenessScore: 5.0,
        conceptCoverageScore: 5.0,
        details: {
          matchedConcepts: [],
          missedConcepts: [],
          appropriateLanguage: [],
          inappropriateLanguage: [],
          vocabularyMatches: 0,
          readabilityLevel: 'moderate',
          estimatedAge: 'unknown'
        },
        validationTime: Date.now() - startTime
      }
    }
  }

  private findMatchingStandard(expected: Partial<CurriculumStandard>): CurriculumStandard | null {
    const standardKey = `${expected.yearGroup?.toLowerCase().replace(' ', '')}-${expected.topic?.toLowerCase()}`
    return this.CURRICULUM_STANDARDS[standardKey] || null
  }

  private createDefaultStandard(expected: Partial<CurriculumStandard>): CurriculumStandard {
    return {
      yearGroup: expected.yearGroup || 'Unknown',
      subject: expected.subject || 'Mathematics',
      topic: expected.topic || 'General',
      subtopic: expected.subtopic || 'General',
      expectedConcepts: expected.expectedConcepts || [],
      vocabularyKeywords: expected.vocabularyKeywords || [],
      difficultyLevel: expected.difficultyLevel || 'intermediate',
      ageAppropriateWords: expected.ageAppropriateWords || [],
      prohibitedWords: expected.prohibitedWords || []
    }
  }

  private assessCurriculumAlignment(content: ExtractedContent, standard: CurriculumStandard): number {
    try {
      const allText = [
        ...content.structuredContent.questions,
        ...content.structuredContent.instructions,
        content.htmlText
      ].join(' ').toLowerCase()

      let matches = 0
      let totalKeywords = standard.vocabularyKeywords.length

      // Count vocabulary keyword matches
      standard.vocabularyKeywords.forEach(keyword => {
        if (allText.includes(keyword.toLowerCase())) {
          matches++
        }
      })

      // Bonus for concept matches
      standard.expectedConcepts.forEach(concept => {
        if (allText.includes(concept.toLowerCase())) {
          matches += 0.5 // Half weight for concepts vs vocabulary
          totalKeywords += 0.5
        }
      })

      // Calculate alignment score (0-10)
      const alignmentRatio = totalKeywords > 0 ? matches / totalKeywords : 0.5
      return Math.min(10, Number((alignmentRatio * 10).toFixed(1)))
    } catch (error) {
      console.warn('Curriculum alignment assessment failed:', error)
      return 5.0
    }
  }

  private assessLanguageAppropriateness(content: ExtractedContent, standard: CurriculumStandard): {
    score: number
    appropriate: string[]
    inappropriate: string[]
  } {
    try {
      const allText = [
        ...content.structuredContent.questions,
        ...content.structuredContent.instructions,
        content.htmlText
      ].join(' ').toLowerCase()

      const words = allText.split(/\s+/).filter(word => word.length > 3)
      const appropriate: string[] = []
      const inappropriate: string[] = []

      // Check for age-appropriate words
      standard.ageAppropriateWords.forEach(word => {
        if (allText.includes(word.toLowerCase())) {
          appropriate.push(word)
        }
      })

      // Check for prohibited words
      standard.prohibitedWords.forEach(word => {
        if (allText.includes(word.toLowerCase())) {
          inappropriate.push(word)
        }
      })

      // Check for overly complex words based on length and syllables
      const complexWords = words.filter(word => 
        word.length > 10 && !standard.ageAppropriateWords.includes(word)
      )
      
      if (complexWords.length > 0) {
        inappropriate.push(...complexWords.slice(0, 5)) // Limit to first 5
      }

      // Calculate language appropriateness score
      let score = 8.0

      // Bonus for appropriate language
      score += Math.min(2, appropriate.length * 0.2)

      // Penalty for inappropriate language
      score -= inappropriate.length * 0.5

      // Penalty for overly complex vocabulary
      if (standard.difficultyLevel === 'beginner' && complexWords.length > 3) {
        score -= 1.5
      }

      return {
        score: Math.max(0, Math.min(10, Number(score.toFixed(1)))),
        appropriate,
        inappropriate
      }
    } catch (error) {
      console.warn('Language appropriateness assessment failed:', error)
      return { score: 5.0, appropriate: [], inappropriate: [] }
    }
  }

  private assessConceptCoverage(content: ExtractedContent, standard: CurriculumStandard): {
    score: number
    matched: string[]
    missed: string[]
  } {
    try {
      const allText = [
        ...content.structuredContent.questions,
        ...content.structuredContent.instructions,
        content.htmlText
      ].join(' ').toLowerCase()

      const matched: string[] = []
      const missed: string[] = []

      standard.expectedConcepts.forEach(concept => {
        if (allText.includes(concept.toLowerCase())) {
          matched.push(concept)
        } else {
          missed.push(concept)
        }
      })

      // Calculate concept coverage score
      const totalConcepts = standard.expectedConcepts.length
      if (totalConcepts === 0) {
        return { score: 8.0, matched, missed } // Default score when no concepts defined
      }

      const coverageRatio = matched.length / totalConcepts
      const baseScore = coverageRatio * 10

      // Bonus for comprehensive coverage
      let score = baseScore
      if (coverageRatio >= 0.8) {
        score += 1
      } else if (coverageRatio >= 0.6) {
        score += 0.5
      }

      return {
        score: Math.max(0, Math.min(10, Number(score.toFixed(1)))),
        matched,
        missed
      }
    } catch (error) {
      console.warn('Concept coverage assessment failed:', error)
      return { score: 5.0, matched: [], missed: [] }
    }
  }

  private assessReadabilityLevel(content: ExtractedContent): 'easy' | 'moderate' | 'difficult' {
    try {
      const avgWordLength = content.structuredContent.metadata.wordCount > 0 
        ? content.htmlText.length / content.structuredContent.metadata.wordCount
        : 5

      const questionComplexity = content.structuredContent.questions.reduce((sum, q) => {
        return sum + q.split(' ').length
      }, 0) / Math.max(1, content.structuredContent.questions.length)

      if (avgWordLength < 4.5 && questionComplexity < 8) {
        return 'easy'
      } else if (avgWordLength > 6 || questionComplexity > 15) {
        return 'difficult'
      } else {
        return 'moderate'
      }
    } catch (error) {
      console.warn('Readability assessment failed:', error)
      return 'moderate'
    }
  }

  private estimateAgeLevel(content: ExtractedContent, standard: CurriculumStandard): string {
    try {
      const readabilityLevel = this.assessReadabilityLevel(content)
      const yearGroup = standard.yearGroup.toLowerCase()

      // Adjust based on readability vs expected level
      if (readabilityLevel === 'easy' && yearGroup.includes('year 4')) {
        return 'Year 2-3'
      } else if (readabilityLevel === 'difficult' && yearGroup.includes('year 2')) {
        return 'Year 3-4'
      } else {
        return standard.yearGroup
      }
    } catch (error) {
      console.warn('Age level estimation failed:', error)
      return standard.yearGroup
    }
  }
}