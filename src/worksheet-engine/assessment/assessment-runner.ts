/**
 * Assessment Runner - Main orchestrator for quality assessment
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

import { QualityAssessmentResult, AssessmentContext, QualityScores } from '../types/engine-types'
import { CompositeScorer } from './composite-scorer'
import { VisualSimilarityAssessment } from './visual-similarity/image-comparison'
import { ContentAnalysisAssessment } from './content-analysis'
import { RuleBasedLayoutAssessment } from './rule-based'
import fs from 'fs'
import path from 'path'

export class AssessmentRunner {
  private context: AssessmentContext

  constructor(context: AssessmentContext) {
    this.context = context
  }

  /**
   * Execute complete quality assessment pipeline
   */
  async runAssessment(): Promise<QualityAssessmentResult> {
    const startTime = Date.now()
    const assessmentId = this.generateAssessmentId()
    
    console.log(`Starting quality assessment: ${assessmentId}`)
    
    // Verify input files exist
    this.validateInputFiles()

    const scores: Partial<QualityScores> = {}

    try {
      // Run rule-based layout assessment (always enabled)
      if (this.context.options.enableRuleBasedLayout) {
        console.log('Running rule-based layout assessment...')
        const ruleBasedAssessment = new RuleBasedLayoutAssessment()
        scores.ruleBasedLayout = await ruleBasedAssessment.assess(this.context.worksheetPdfPath)
        console.log(`Rule-based layout score: ${scores.ruleBasedLayout.score}`)
      }

      // Run content analysis assessment
      if (this.context.options.enableContentAnalysis) {
        console.log('Running content analysis assessment...')
        const contentAssessment = new ContentAnalysisAssessment()
        scores.contentAnalysis = await contentAssessment.assess(
          this.context.worksheetPdfPath,
          this.context.config
        )
        console.log(`Content analysis score: ${scores.contentAnalysis.score}`)
      }

      // Run visual similarity assessment (only if golden reference provided)
      if (this.context.options.enableVisualSimilarity && this.context.options.goldenReferencePath) {
        if (fs.existsSync(this.context.options.goldenReferencePath)) {
          console.log('Running visual similarity assessment...')
          const visualAssessment = new VisualSimilarityAssessment()
          scores.visualSimilarity = await visualAssessment.compare(
            this.context.worksheetPdfPath,
            this.context.options.goldenReferencePath
          )
          console.log(`Visual similarity score: ${scores.visualSimilarity.score}`)
        } else {
          console.warn(`Golden reference file not found: ${this.context.options.goldenReferencePath}`)
          console.log('Skipping visual similarity assessment')
        }
      } else if (this.context.options.enableVisualSimilarity) {
        console.log('Visual similarity assessment skipped - no golden reference provided')
      }

      // Calculate composite scores
      const finalScores = CompositeScorer.calculateCompositeScore(scores)
      const qualityThreshold = this.context.options.qualityThreshold || 7.0
      const qualityGate = CompositeScorer.determineQualityGate(finalScores.composite, qualityThreshold)
      const recommendations = CompositeScorer.generateRecommendations(finalScores)

      const assessmentTime = (Date.now() - startTime) / 1000

      const result: QualityAssessmentResult = {
        assessmentId,
        timestamp: new Date().toISOString(),
        config: this.context.config.configId,
        scores: finalScores,
        qualityGate,
        recommendations,
        assessmentTime
      }

      console.log(`Assessment completed in ${assessmentTime}s`)
      console.log(`Composite score: ${finalScores.composite}/10`)
      console.log(`Quality gate: ${qualityGate}`)

      return result

    } catch (error) {
      const assessmentTime = (Date.now() - startTime) / 1000
      
      console.error('Assessment failed:', error)
      
      // Return partial result with error information
      const result: QualityAssessmentResult = {
        assessmentId,
        timestamp: new Date().toISOString(),
        config: this.context.config.configId,
        scores: CompositeScorer.calculateCompositeScore(scores),
        qualityGate: 'FAILED',
        recommendations: ['Assessment failed - see logs for details'],
        assessmentTime
      }

      return result
    }
  }

  /**
   * Save assessment results to JSON file
   */
  async saveResults(result: QualityAssessmentResult, outputDir: string): Promise<string> {
    const resultsDir = path.join(outputDir, 'assessment')
    
    // Create assessment directory if it doesn't exist
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true })
    }

    const filename = `assessment-${result.assessmentId}.json`
    const filepath = path.join(resultsDir, filename)
    
    const formattedResults = JSON.stringify(result, null, 2)
    fs.writeFileSync(filepath, formattedResults, 'utf-8')
    
    console.log(`Assessment results saved: ${filepath}`)
    return filepath
  }

  /**
   * Generate detailed assessment report
   */
  generateReport(result: QualityAssessmentResult): string {
    const lines: string[] = []
    
    lines.push('═══════════════════════════════════════════════')
    lines.push('           WORKSHEET QUALITY ASSESSMENT       ')
    lines.push('═══════════════════════════════════════════════')
    lines.push('')
    lines.push(`Assessment ID: ${result.assessmentId}`)
    lines.push(`Configuration: ${result.config}`)
    lines.push(`Timestamp: ${result.timestamp}`)
    lines.push(`Assessment Time: ${result.assessmentTime}s`)
    lines.push('')
    lines.push('QUALITY SCORES')
    lines.push('─────────────────────────────────────────────')
    
    // Visual similarity
    if (result.scores.visualSimilarity.score > 0) {
      lines.push(`Visual Similarity: ${result.scores.visualSimilarity.score}/10`)
      lines.push(`  • Structural Similarity: ${result.scores.visualSimilarity.details.structuralSimilarity}`)
      lines.push(`  • Layout Consistency: ${result.scores.visualSimilarity.details.layoutConsistency}`)
      lines.push(`  • Visual Alignment: ${result.scores.visualSimilarity.details.visualAlignment}`)
      lines.push('')
    }

    // Content analysis
    if (result.scores.contentAnalysis.score > 0) {
      lines.push(`Content Analysis: ${result.scores.contentAnalysis.score}/10`)
      lines.push(`  • Curriculum Alignment: ${result.scores.contentAnalysis.details.curriculumAlignment}`)
      lines.push(`  • Language Appropriate: ${result.scores.contentAnalysis.details.languageAppropriate}`)
      lines.push(`  • Mathematical Accuracy: ${result.scores.contentAnalysis.details.mathematicalAccuracy}`)
      lines.push('')
    }

    // Rule-based layout
    if (result.scores.ruleBasedLayout.score > 0) {
      lines.push(`Rule-Based Layout: ${result.scores.ruleBasedLayout.score}/10`)
      lines.push(`  • Font Consistency: ${result.scores.ruleBasedLayout.details.fontConsistency}`)
      lines.push(`  • Spacing Quality: ${result.scores.ruleBasedLayout.details.spacingQuality}`)
      lines.push(`  • Element Positioning: ${result.scores.ruleBasedLayout.details.elementPositioning}`)
      lines.push('')
    }

    // Composite score
    lines.push(`COMPOSITE SCORE: ${result.scores.composite}/10`)
    lines.push(`QUALITY GATE: ${result.qualityGate}`)
    lines.push('')

    // Recommendations
    if (result.recommendations.length > 0) {
      lines.push('RECOMMENDATIONS')
      lines.push('─────────────────────────────────────────────')
      result.recommendations.forEach(rec => {
        lines.push(`• ${rec}`)
      })
      lines.push('')
    }

    lines.push('═══════════════════════════════════════════════')
    
    return lines.join('\n')
  }

  private validateInputFiles(): void {
    if (!fs.existsSync(this.context.worksheetPdfPath)) {
      throw new Error(`Worksheet PDF not found: ${this.context.worksheetPdfPath}`)
    }

    if (!fs.existsSync(this.context.worksheetHtmlPath)) {
      throw new Error(`Worksheet HTML not found: ${this.context.worksheetHtmlPath}`)
    }
  }

  private generateAssessmentId(): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const random = Math.random().toString(36).substring(2, 8)
    return `${this.context.config.configId}-${timestamp}-${random}`
  }

  /**
   * Static method to run assessment with minimal setup
   */
  static async runQuickAssessment(
    worksheetPdfPath: string,
    worksheetHtmlPath: string,
    configId: string,
    outputDir: string,
    goldenRef?: string
  ): Promise<QualityAssessmentResult> {
    const context: AssessmentContext = {
      worksheetPdfPath,
      worksheetHtmlPath,
      config: {
        configId,
        layout: '',
        yearGroup: '',
        topic: '',
        subtopic: '',
        difficulty: '',
        questionCount: 0,
        promptVariant: ''
      },
      options: {
        enableVisualSimilarity: !!goldenRef,
        enableContentAnalysis: true,
        enableRuleBasedLayout: true,
        goldenReferencePath: goldenRef,
        qualityThreshold: 7.0
      }
    }

    const runner = new AssessmentRunner(context)
    const result = await runner.runAssessment()
    await runner.saveResults(result, outputDir)
    
    return result
  }
}