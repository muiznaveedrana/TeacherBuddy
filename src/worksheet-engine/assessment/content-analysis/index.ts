/**
 * Content Analysis Assessment Module - Main orchestrator for content quality assessment
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

import { ContentAnalysisScore, EngineConfig } from '../../types/engine-types'
import { TextExtractor, ExtractedContent } from './text-extraction'
import { CurriculumValidator, CurriculumValidationResult, CurriculumStandard } from './curriculum-validator'
import { ContentScorer, ContentScoringResult } from './content-scorer'

export interface ContentAnalysisResult {
  extractedContent: ExtractedContent
  validationResult: CurriculumValidationResult
  scoringResult: ContentScoringResult
  overallScore: ContentAnalysisScore
  processingTime: number
  analysisDetails: {
    textExtractionTime: number
    validationTime: number
    scoringTime: number
    contentQualityIssues: string[]
    recommendations: string[]
  }
}

export class ContentAnalysisAssessment {
  private textExtractor: TextExtractor
  private curriculumValidator: CurriculumValidator
  private contentScorer: ContentScorer

  constructor() {
    this.textExtractor = new TextExtractor()
    this.curriculumValidator = new CurriculumValidator()
    this.contentScorer = new ContentScorer()
  }

  async assessContent(
    pdfPath?: string,
    htmlContent?: string,
    config?: EngineConfig
  ): Promise<ContentAnalysisResult> {
    const startTime = Date.now()

    try {
      // Step 1: Extract text content
      const extractedContent = await this.textExtractor.extractContent(pdfPath, htmlContent)
      
      // Step 2: Create curriculum standard from config
      const curriculumStandard = this.createCurriculumStandardFromConfig(config)
      
      // Step 3: Validate against curriculum standards
      const validationResult = await this.curriculumValidator.validateContent(
        extractedContent,
        curriculumStandard
      )
      
      // Step 4: Score the content quality
      const scoringResult = await this.contentScorer.scoreContent(
        extractedContent,
        validationResult,
        config || this.getDefaultConfig()
      )

      const processingTime = Date.now() - startTime
      
      // Generate analysis details and recommendations
      const analysisDetails = this.generateAnalysisDetails(
        extractedContent,
        validationResult,
        scoringResult
      )

      return {
        extractedContent,
        validationResult,
        scoringResult,
        overallScore: scoringResult.overallScore,
        processingTime,
        analysisDetails
      }
    } catch (error) {
      console.error('Content analysis assessment failed:', error)
      
      // Return default values on error
      const processingTime = Date.now() - startTime
      
      return {
        extractedContent: {
          htmlText: '',
          structuredContent: {
            questions: [],
            instructions: [],
            titles: [],
            metadata: { wordCount: 0, questionCount: 0, hasAnswers: false }
          },
          extractionTime: 0
        },
        validationResult: {
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
          validationTime: 0
        },
        scoringResult: {
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
          processingTime: 0
        },
        overallScore: {
          score: 5.0,
          details: {
            curriculumAlignment: 5.0,
            languageAppropriate: 5.0,
            mathematicalAccuracy: 5.0
          }
        },
        processingTime,
        analysisDetails: {
          textExtractionTime: 0,
          validationTime: 0,
          scoringTime: 0,
          contentQualityIssues: ['Assessment failed'],
          recommendations: ['Retry content analysis assessment']
        }
      }
    }
  }

  private createCurriculumStandardFromConfig(config?: EngineConfig): Partial<CurriculumStandard> {
    if (!config) {
      return {
        yearGroup: 'Unknown',
        subject: 'Mathematics',
        topic: 'General',
        subtopic: 'General'
      }
    }

    return {
      yearGroup: this.parseYearGroup(config.yearGroup),
      subject: 'Mathematics', // Assuming math for now
      topic: this.capitalizeFirst(config.topic),
      subtopic: this.capitalizeFirst(config.subtopic),
      difficultyLevel: this.mapDifficultyLevel(config.difficulty)
    }
  }

  private parseYearGroup(yearGroup: string): string {
    // Convert "year3" to "Year 3", etc.
    const match = yearGroup.match(/year(\d+)/i)
    if (match) {
      return `Year ${match[1]}`
    }
    return yearGroup
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  private mapDifficultyLevel(difficulty: string): 'beginner' | 'intermediate' | 'advanced' {
    const lower = difficulty.toLowerCase()
    if (lower.includes('easy') || lower.includes('basic')) {
      return 'beginner'
    } else if (lower.includes('hard') || lower.includes('challenging') || lower.includes('advanced')) {
      return 'advanced'
    } else {
      return 'intermediate'
    }
  }

  private getDefaultConfig(): EngineConfig {
    return {
      configId: 'default',
      layout: 'standard',
      yearGroup: 'year3',
      topic: 'addition',
      subtopic: 'basic',
      difficulty: 'average',
      questionCount: 5,
      promptVariant: 'baseline'
    }
  }

  private generateAnalysisDetails(
    content: ExtractedContent,
    validation: CurriculumValidationResult,
    scoring: ContentScoringResult
  ): ContentAnalysisResult['analysisDetails'] {
    const issues: string[] = []
    const recommendations: string[] = []

    // Identify content quality issues
    if (content.structuredContent.metadata.wordCount < 50) {
      issues.push('Very low word count - content may be incomplete')
      recommendations.push('Ensure worksheet contains sufficient instructional content')
    }

    if (content.structuredContent.metadata.questionCount === 0) {
      issues.push('No questions detected in content')
      recommendations.push('Add clear, well-structured questions to the worksheet')
    }

    if (content.structuredContent.instructions.length === 0) {
      issues.push('No instructions detected')
      recommendations.push('Include clear instructions for students')
    }

    if (validation.alignmentScore < 6.0) {
      issues.push('Poor curriculum alignment')
      recommendations.push('Include more curriculum-relevant vocabulary and concepts')
    }

    if (validation.languageAppropriatenessScore < 6.0) {
      issues.push('Language may not be age-appropriate')
      recommendations.push('Review language complexity and age-appropriateness')
    }

    if (scoring.mathematicalAccuracy < 7.0) {
      issues.push('Potential mathematical accuracy concerns')
      recommendations.push('Verify mathematical expressions and calculations')
    }

    // Add validation-specific recommendations
    if (validation.details.missedConcepts.length > 0) {
      recommendations.push(`Consider including these concepts: ${validation.details.missedConcepts.slice(0, 3).join(', ')}`)
    }

    if (validation.details.inappropriateLanguage.length > 0) {
      recommendations.push('Replace complex vocabulary with age-appropriate alternatives')
    }

    // Add scoring-specific recommendations
    if (scoring.scoringDetails.questionQuality < 7.0) {
      recommendations.push('Improve question clarity and structure')
    }

    if (scoring.scoringDetails.contentCompleteness < 7.0) {
      recommendations.push('Ensure content completeness and proper structure')
    }

    return {
      textExtractionTime: content.extractionTime,
      validationTime: validation.validationTime,
      scoringTime: scoring.processingTime,
      contentQualityIssues: issues,
      recommendations
    }
  }

  generateDetailedReport(result: ContentAnalysisResult): string {
    const report = []

    report.push('=== Content Analysis Assessment Report ===')
    report.push(`Overall Content Score: ${result.overallScore.score}/10.0`)
    report.push(`Total Processing Time: ${result.processingTime}ms`)
    report.push('')

    // Content Extraction Summary
    report.push('--- Content Extraction Summary ---')
    report.push(`Words Extracted: ${result.extractedContent.structuredContent.metadata.wordCount}`)
    report.push(`Questions Detected: ${result.extractedContent.structuredContent.metadata.questionCount}`)
    report.push(`Instructions Found: ${result.extractedContent.structuredContent.instructions.length}`)
    report.push(`Titles Found: ${result.extractedContent.structuredContent.titles.length}`)
    report.push(`Has Answers: ${result.extractedContent.structuredContent.metadata.hasAnswers ? 'Yes' : 'No'}`)
    report.push(`Extraction Time: ${result.extractedContent.extractionTime}ms`)
    report.push('')

    // Curriculum Validation
    report.push('--- Curriculum Validation ---')
    report.push(`Curriculum Alignment: ${result.validationResult.alignmentScore}/10.0`)
    report.push(`Language Appropriateness: ${result.validationResult.languageAppropriatenessScore}/10.0`)
    report.push(`Concept Coverage: ${result.validationResult.conceptCoverageScore}/10.0`)
    report.push(`Readability Level: ${result.validationResult.details.readabilityLevel}`)
    report.push(`Estimated Age Level: ${result.validationResult.details.estimatedAge}`)
    report.push(`Vocabulary Matches: ${result.validationResult.details.vocabularyMatches}`)
    
    if (result.validationResult.details.matchedConcepts.length > 0) {
      report.push(`Matched Concepts: ${result.validationResult.details.matchedConcepts.join(', ')}`)
    }
    
    if (result.validationResult.details.missedConcepts.length > 0) {
      report.push(`Missing Concepts: ${result.validationResult.details.missedConcepts.join(', ')}`)
    }
    report.push('')

    // Content Quality Scoring
    report.push('--- Content Quality Scoring ---')
    report.push(`Mathematical Accuracy: ${result.scoringResult.mathematicalAccuracy}/10.0`)
    report.push(`Content Quality: ${result.scoringResult.contentQuality}/10.0`)
    report.push(`Structural Quality: ${result.scoringResult.structuralQuality}/10.0`)
    report.push(`Question Quality: ${result.scoringResult.scoringDetails.questionQuality}/10.0`)
    report.push(`Content Completeness: ${result.scoringResult.scoringDetails.contentCompleteness}/10.0`)
    report.push('')

    // Issues and Recommendations
    if (result.analysisDetails.contentQualityIssues.length > 0) {
      report.push('--- Content Quality Issues ---')
      result.analysisDetails.contentQualityIssues.forEach(issue => {
        report.push(`• ${issue}`)
      })
      report.push('')
    }

    if (result.analysisDetails.recommendations.length > 0) {
      report.push('--- Recommendations ---')
      result.analysisDetails.recommendations.forEach(rec => {
        report.push(`• ${rec}`)
      })
    }

    return report.join('\n')
  }
}

// Export the main assessment interface for external use
export { ContentAnalysisAssessment } from './content-analysis-assessment'