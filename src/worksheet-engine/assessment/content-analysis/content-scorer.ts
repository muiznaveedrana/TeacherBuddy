/**
 * Content Scorer - Calculates overall content quality scores
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

import { ContentAnalysisScore, EngineConfig } from '../../types/engine-types'
import { ExtractedContent } from './text-extraction'
import { CurriculumValidationResult, CurriculumStandard } from './curriculum-validator'

export interface ContentScoringResult {
  overallScore: ContentAnalysisScore
  mathematicalAccuracy: number
  contentQuality: number
  structuralQuality: number
  scoringDetails: {
    extractionQuality: number
    curriculumAlignment: number
    languageAppropriateness: number
    mathematicalCorrectness: number
    contentCompleteness: number
    questionQuality: number
  }
  processingTime: number
}

export class ContentScorer {
  async scoreContent(
    extractedContent: ExtractedContent,
    validationResult: CurriculumValidationResult,
    config: EngineConfig
  ): Promise<ContentScoringResult> {
    const startTime = Date.now()

    try {
      // Calculate individual scoring components
      const extractionQuality = this.assessExtractionQuality(extractedContent)
      const mathematicalAccuracy = this.assessMathematicalAccuracy(extractedContent)
      const contentQuality = this.assessContentQuality(extractedContent, config)
      const questionQuality = this.assessQuestionQuality(extractedContent)

      // Calculate overall content analysis score
      const overallScore = this.calculateOverallScore(
        validationResult,
        extractionQuality,
        mathematicalAccuracy,
        contentQuality,
        questionQuality
      )

      const processingTime = Date.now() - startTime

      return {
        overallScore,
        mathematicalAccuracy,
        contentQuality,
        structuralQuality: extractionQuality,
        scoringDetails: {
          extractionQuality,
          curriculumAlignment: validationResult.alignmentScore,
          languageAppropriateness: validationResult.languageAppropriatenessScore,
          mathematicalCorrectness: mathematicalAccuracy,
          contentCompleteness: contentQuality,
          questionQuality
        },
        processingTime
      }
    } catch (error) {
      console.error('Content scoring failed:', error)
      
      return {
        overallScore: {
          score: 5.0,
          details: {
            curriculumAlignment: 5.0,
            languageAppropriate: 5.0,
            mathematicalAccuracy: 5.0
          }
        },
        mathematicalAccuracy: 5.0,
        contentQuality: 5.0,
        structuralQuality: 5.0,
        scoringDetails: {
          extractionQuality: 5.0,
          curriculumAlignment: 5.0,
          languageAppropriateness: 5.0,
          mathematicalCorrectness: 5.0,
          contentCompleteness: 5.0,
          questionQuality: 5.0
        },
        processingTime: Date.now() - startTime
      }
    }
  }

  private assessExtractionQuality(content: ExtractedContent): number {
    let score = 6.0

    // Quality based on word count
    const wordCount = content.structuredContent.metadata.wordCount
    if (wordCount === 0) {
      return 0
    } else if (wordCount < 50) {
      score = 3.0
    } else if (wordCount < 100) {
      score = 5.0
    } else if (wordCount >= 100) {
      score = 8.0
    }

    // Bonus for question detection
    const questionCount = content.structuredContent.metadata.questionCount
    if (questionCount === 0) {
      score -= 2.0
    } else if (questionCount >= 3) {
      score += 1.0
    } else if (questionCount >= 5) {
      score += 1.5
    }

    // Bonus for structured content
    if (content.structuredContent.instructions.length > 0) {
      score += 0.5
    }
    if (content.structuredContent.titles.length > 0) {
      score += 0.3
    }
    if (content.structuredContent.metadata.hasAnswers) {
      score += 0.7
    }

    return Math.max(0, Math.min(10, Number(score.toFixed(1))))
  }

  private assessMathematicalAccuracy(content: ExtractedContent): number {
    try {
      let score = 8.0 // Assume accurate unless issues found
      const issues: string[] = []

      const allText = [
        ...content.structuredContent.questions,
        ...content.structuredContent.instructions,
        content.htmlText
      ].join(' ')

      // Check for mathematical expressions and validate basic ones
      const mathExpressions = this.extractMathExpressions(allText)
      let correctExpressions = 0
      const totalExpressions = mathExpressions.length

      mathExpressions.forEach(expr => {
        if (this.validateMathExpression(expr)) {
          correctExpressions++
        } else {
          issues.push(`Potentially incorrect expression: ${expr}`)
        }
      })

      if (totalExpressions > 0) {
        const accuracyRatio = correctExpressions / totalExpressions
        score = accuracyRatio * 10
      }

      // Check for common mathematical errors
      const commonErrors = this.detectCommonMathErrors(allText)
      score -= commonErrors.length * 0.5

      // If no mathematical content is detected, use a neutral score
      if (totalExpressions === 0 && !this.containsMathematicalContent(allText)) {
        score = 7.0 // Neutral score for non-math content
      }

      return Math.max(0, Math.min(10, Number(score.toFixed(1))))
    } catch (error) {
      console.warn('Mathematical accuracy assessment failed:', error)
      return 7.0 // Neutral score on error
    }
  }

  private extractMathExpressions(text: string): string[] {
    const expressions: string[] = []

    // Simple arithmetic expressions
    const arithmeticRegex = /\b\d+\s*[+\-×÷*\/]\s*\d+\s*=\s*\d+/g
    const arithmeticMatches = text.match(arithmeticRegex) || []
    expressions.push(...arithmeticMatches)

    // Fractions
    const fractionRegex = /\b\d+\/\d+/g
    const fractionMatches = text.match(fractionRegex) || []
    expressions.push(...fractionMatches)

    // Percentages with calculations
    const percentageRegex = /\b\d+%\s*of\s*\d+\s*=\s*\d+/g
    const percentageMatches = text.match(percentageRegex) || []
    expressions.push(...percentageMatches)

    return expressions
  }

  private validateMathExpression(expression: string): boolean {
    try {
      // Simple validation for basic arithmetic
      const cleanExpr = expression.replace(/×/g, '*').replace(/÷/g, '/')
      
      // Check if it's a simple equation (a op b = c)
      const equationMatch = cleanExpr.match(/(\d+)\s*([+\-*\/])\s*(\d+)\s*=\s*(\d+)/)
      if (equationMatch) {
        const [, a, op, b, result] = equationMatch
        const num1 = parseFloat(a)
        const num2 = parseFloat(b)
        const expectedResult = parseFloat(result)

        let calculatedResult: number
        switch (op) {
          case '+':
            calculatedResult = num1 + num2
            break
          case '-':
            calculatedResult = num1 - num2
            break
          case '*':
            calculatedResult = num1 * num2
            break
          case '/':
            calculatedResult = num2 !== 0 ? num1 / num2 : NaN
            break
          default:
            return true // Unable to validate, assume correct
        }

        return Math.abs(calculatedResult - expectedResult) < 0.01
      }

      return true // Unable to validate complex expressions, assume correct
    } catch {
      return true // Assume correct if validation fails
    }
  }

  private detectCommonMathErrors(text: string): string[] {
    const errors: string[] = []

    // Division by zero
    if (text.includes('÷ 0') || text.includes('/ 0')) {
      errors.push('Division by zero detected')
    }

    // Impossible percentages
    const percentageRegex = /(\d+)%/g
    const percentMatches = text.match(percentageRegex) || []
    percentMatches.forEach(match => {
      const value = parseInt(match.replace('%', ''))
      if (value > 100 && !text.includes('more than 100%')) {
        errors.push(`Questionable percentage: ${match}`)
      }
    })

    // Negative results where they might not make sense
    if (text.includes('= -') && text.includes('count')) {
      errors.push('Negative count detected')
    }

    return errors
  }

  private containsMathematicalContent(text: string): boolean {
    const mathKeywords = [
      'add', 'subtract', 'multiply', 'divide', 'calculate', 'solve',
      'equation', 'number', 'total', 'sum', 'difference', 'product', 'quotient',
      'plus', 'minus', 'times', 'equals', '+', '-', '×', '÷', '='
    ]

    return mathKeywords.some(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    )
  }

  private assessContentQuality(content: ExtractedContent, config: EngineConfig): number {
    let score = 7.0

    // Expected question count based on config
    const expectedQuestions = config.questionCount || 5
    const actualQuestions = content.structuredContent.metadata.questionCount

    // Score based on question count alignment
    if (actualQuestions === 0) {
      score = 2.0
    } else if (actualQuestions < expectedQuestions * 0.7) {
      score = 5.0 // Too few questions
    } else if (actualQuestions >= expectedQuestions * 0.8 && actualQuestions <= expectedQuestions * 1.2) {
      score = 9.0 // Good alignment
    } else if (actualQuestions > expectedQuestions * 1.5) {
      score = 6.0 // Too many questions
    }

    // Content completeness
    if (content.structuredContent.instructions.length === 0) {
      score -= 1.0
    }
    
    if (content.structuredContent.titles.length === 0) {
      score -= 0.5
    }

    // Question diversity (check if questions are too similar)
    const uniqueQuestionStarts = new Set(
      content.structuredContent.questions.map(q => q.substring(0, 10).toLowerCase())
    )
    const diversityRatio = content.structuredContent.questions.length > 0 
      ? uniqueQuestionStarts.size / content.structuredContent.questions.length 
      : 1

    if (diversityRatio < 0.7) {
      score -= 1.5 // Questions are too similar
    }

    return Math.max(0, Math.min(10, Number(score.toFixed(1))))
  }

  private assessQuestionQuality(content: ExtractedContent): number {
    let score = 7.0

    if (content.structuredContent.questions.length === 0) {
      return 0
    }

    // Average question length (good questions are neither too short nor too long)
    const avgQuestionLength = content.structuredContent.questions.reduce(
      (sum, q) => sum + q.length, 0
    ) / content.structuredContent.questions.length

    if (avgQuestionLength < 10) {
      score -= 2.0 // Too short/vague
    } else if (avgQuestionLength > 200) {
      score -= 1.5 // Too long/complex
    } else if (avgQuestionLength >= 20 && avgQuestionLength <= 100) {
      score += 1.0 // Good length
    }

    // Question clarity (check for question words)
    const questionWords = ['what', 'how', 'where', 'when', 'why', 'which', 'calculate', 'find', 'solve']
    const questionsWithQuestionWords = content.structuredContent.questions.filter(q => 
      questionWords.some(word => q.toLowerCase().includes(word))
    )

    const clarityRatio = questionsWithQuestionWords.length / content.structuredContent.questions.length
    if (clarityRatio < 0.5) {
      score -= 1.0 // Questions lack clarity
    } else if (clarityRatio >= 0.8) {
      score += 0.5 // Good question clarity
    }

    return Math.max(0, Math.min(10, Number(score.toFixed(1))))
  }

  private calculateOverallScore(
    validation: CurriculumValidationResult,
    extractionQuality: number,
    mathematicalAccuracy: number,
    contentQuality: number,
    questionQuality: number
  ): ContentAnalysisScore {
    // Weighted average of all components
    const weights = {
      curriculum: 0.25,
      language: 0.20,
      mathematical: 0.25,
      content: 0.15,
      question: 0.15
    }

    const weightedScore = (
      (validation.alignmentScore * weights.curriculum) +
      (validation.languageAppropriatenessScore * weights.language) +
      (mathematicalAccuracy * weights.mathematical) +
      (contentQuality * weights.content) +
      (questionQuality * weights.question)
    )

    return {
      score: Number(weightedScore.toFixed(1)),
      details: {
        curriculumAlignment: validation.alignmentScore,
        languageAppropriate: validation.languageAppropriatenessScore,
        mathematicalAccuracy
      }
    }
  }
}