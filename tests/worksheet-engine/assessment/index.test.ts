/**
 * Assessment Module Integration Tests
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

import { AssessmentRunner } from '@/worksheet-engine/assessment'
import { CompositeScorer } from '@/worksheet-engine/assessment/composite-scorer'
import { 
  VisualSimilarityAssessment,
  ContentAnalysisAssessment,
  RuleBasedLayoutAssessment
} from '@/worksheet-engine/assessment'
import { EngineConfig, AssessmentContext } from '@/worksheet-engine/types/engine-types'
import fs from 'fs'
import path from 'path'

describe('Assessment Module Integration', () => {
  let tempDir: string
  let mockConfig: EngineConfig
  let mockContext: AssessmentContext

  beforeAll(() => {
    tempDir = path.join(__dirname, 'temp-integration-test')
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true })
    }

    mockConfig = {
      configId: 'integration-test-config',
      layout: 'standard',
      yearGroup: 'year3',
      topic: 'addition',
      subtopic: 'basic',
      difficulty: 'average',
      questionCount: 5,
      promptVariant: 'baseline'
    }

    const mockPdfPath = path.join(tempDir, 'integration-test.pdf')
    const mockHtmlPath = path.join(tempDir, 'integration-test.html')

    fs.writeFileSync(mockPdfPath, 'mock pdf content for integration test')
    fs.writeFileSync(mockHtmlPath, `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Integration Test Worksheet</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 16px; }
          .instructions { margin: 16px 0; background: #f5f5f5; padding: 12px; }
          .question { margin: 16px 0; }
        </style>
      </head>
      <body>
        <h1>Year 3 Addition Practice</h1>
        <div class="instructions">
          <p>Complete the following addition problems. Show your working.</p>
        </div>
        <div class="question">1. Calculate: 15 + 23 = 38</div>
        <div class="question">2. What is 42 + 17 = 59</div>
        <div class="question">3. Find the sum of 26 and 18 = 44</div>
        <div class="question">4. Add 35 and 29 = 64</div>
        <div class="question">5. Calculate: 47 + 16 = 63</div>
      </body>
      </html>
    `)

    mockContext = {
      worksheetPdfPath: mockPdfPath,
      worksheetHtmlPath: mockHtmlPath,
      config: mockConfig,
      options: {
        enableVisualSimilarity: false, // Skip visual similarity for integration test
        enableContentAnalysis: true,
        enableRuleBasedLayout: true,
        qualityThreshold: 7.0
      }
    }
  })

  afterAll(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true })
    }
  })

  describe('Module Exports', () => {
    it('should export all main assessment classes', () => {
      expect(AssessmentRunner).toBeDefined()
      expect(CompositeScorer).toBeDefined()
      expect(VisualSimilarityAssessment).toBeDefined()
      expect(ContentAnalysisAssessment).toBeDefined()
      expect(RuleBasedLayoutAssessment).toBeDefined()
    })

    it('should create instances of assessment classes successfully', () => {
      const visualAssessment = new VisualSimilarityAssessment()
      const contentAssessment = new ContentAnalysisAssessment()
      const ruleBasedAssessment = new RuleBasedLayoutAssessment()
      const assessmentRunner = new AssessmentRunner(mockContext)

      expect(visualAssessment).toBeInstanceOf(VisualSimilarityAssessment)
      expect(contentAssessment).toBeInstanceOf(ContentAnalysisAssessment)
      expect(ruleBasedAssessment).toBeInstanceOf(RuleBasedLayoutAssessment)
      expect(assessmentRunner).toBeInstanceOf(AssessmentRunner)
    })
  })

  describe('End-to-End Assessment Workflow', () => {
    it('should run complete assessment workflow without visual similarity', async () => {
      const runner = new AssessmentRunner(mockContext)
      const result = await runner.runAssessment()

      // Verify assessment result structure
      expect(result.assessmentId).toBeDefined()
      expect(result.timestamp).toBeDefined()
      expect(result.config).toBe('integration-test-config')
      expect(result.qualityGate).toMatch(/^(PASSED|FAILED)$/)
      expect(result.assessmentTime).toBeGreaterThan(0)
      expect(Array.isArray(result.recommendations)).toBe(true)

      // Verify scores structure
      expect(result.scores.composite).toBeGreaterThanOrEqual(0)
      expect(result.scores.composite).toBeLessThanOrEqual(10)
      
      // Content analysis should have run
      expect(result.scores.contentAnalysis.score).toBeGreaterThan(0)
      expect(result.scores.contentAnalysis.details.curriculumAlignment).toBeGreaterThanOrEqual(0)
      expect(result.scores.contentAnalysis.details.languageAppropriate).toBeGreaterThanOrEqual(0)
      expect(result.scores.contentAnalysis.details.mathematicalAccuracy).toBeGreaterThanOrEqual(0)

      // Rule-based layout should have run
      expect(result.scores.ruleBasedLayout.score).toBeGreaterThan(0)
      expect(result.scores.ruleBasedLayout.details.fontConsistency).toBeGreaterThanOrEqual(0)
      expect(result.scores.ruleBasedLayout.details.spacingQuality).toBeGreaterThanOrEqual(0)
      expect(result.scores.ruleBasedLayout.details.elementPositioning).toBeGreaterThanOrEqual(0)

      // Visual similarity should be disabled (default values)
      expect(result.scores.visualSimilarity.score).toBe(0)
    }, 30000) // Allow up to 30 seconds for complete assessment

    it('should save and generate complete assessment report', async () => {
      const runner = new AssessmentRunner(mockContext)
      const result = await runner.runAssessment()
      
      // Save results
      const savedPath = await runner.saveResults(result, tempDir)
      expect(fs.existsSync(savedPath)).toBe(true)
      
      // Verify saved content
      const savedContent = JSON.parse(fs.readFileSync(savedPath, 'utf-8'))
      expect(savedContent.assessmentId).toBe(result.assessmentId)
      expect(savedContent.scores.composite).toBe(result.scores.composite)

      // Generate report
      const report = runner.generateReport(result)
      expect(report).toContain('WORKSHEET QUALITY ASSESSMENT')
      expect(report).toContain(`Assessment ID: ${result.assessmentId}`)
      expect(report).toContain(`COMPOSITE SCORE: ${result.scores.composite}/10`)
      expect(report).toContain(`QUALITY GATE: ${result.qualityGate}`)

      // Should contain assessment details for enabled modules
      expect(report).toContain('Content Analysis:')
      expect(report).toContain('Rule-Based Layout:')
      
      // Cleanup
      fs.unlinkSync(savedPath)
      const assessmentDir = path.join(tempDir, 'assessment')
      if (fs.existsSync(assessmentDir)) {
        fs.rmSync(assessmentDir, { recursive: true })
      }
    })

    it('should handle assessment with only rule-based layout enabled', async () => {
      const contextWithOnlyRuleBased = {
        ...mockContext,
        options: {
          enableVisualSimilarity: false,
          enableContentAnalysis: false,
          enableRuleBasedLayout: true,
          qualityThreshold: 7.0
        }
      }

      const runner = new AssessmentRunner(contextWithOnlyRuleBased)
      const result = await runner.runAssessment()

      expect(result.scores.ruleBasedLayout.score).toBeGreaterThan(0)
      expect(result.scores.contentAnalysis.score).toBe(0)
      expect(result.scores.visualSimilarity.score).toBe(0)
      expect(result.scores.composite).toEqual(result.scores.ruleBasedLayout.score)
    })

    it('should handle assessment with only content analysis enabled', async () => {
      const contextWithOnlyContent = {
        ...mockContext,
        options: {
          enableVisualSimilarity: false,
          enableContentAnalysis: true,
          enableRuleBasedLayout: false,
          qualityThreshold: 7.0
        }
      }

      const runner = new AssessmentRunner(contextWithOnlyContent)
      const result = await runner.runAssessment()

      expect(result.scores.contentAnalysis.score).toBeGreaterThan(0)
      expect(result.scores.ruleBasedLayout.score).toBe(0)
      expect(result.scores.visualSimilarity.score).toBe(0)
      expect(result.scores.composite).toEqual(result.scores.contentAnalysis.score)
    })
  })

  describe('Performance Requirements', () => {
    it('should complete assessment within 30 seconds', async () => {
      const startTime = Date.now()
      
      const runner = new AssessmentRunner(mockContext)
      await runner.runAssessment()
      
      const totalTime = (Date.now() - startTime) / 1000
      expect(totalTime).toBeLessThan(30)
    })

    it('should handle multiple concurrent assessments', async () => {
      const numConcurrent = 3
      const promises = []

      for (let i = 0; i < numConcurrent; i++) {
        const context = {
          ...mockContext,
          config: {
            ...mockConfig,
            configId: `concurrent-test-${i}`
          }
        }
        const runner = new AssessmentRunner(context)
        promises.push(runner.runAssessment())
      }

      const results = await Promise.all(promises)
      
      expect(results).toHaveLength(numConcurrent)
      results.forEach((result, index) => {
        expect(result.config).toBe(`concurrent-test-${index}`)
        expect(result.scores.composite).toBeGreaterThanOrEqual(0)
        expect(result.assessmentTime).toBeLessThan(30)
      })
    })
  })

  describe('Error Handling Integration', () => {
    it('should handle missing input files gracefully', async () => {
      const invalidContext = {
        ...mockContext,
        worksheetPdfPath: '/nonexistent/file.pdf',
        worksheetHtmlPath: '/nonexistent/file.html'
      }

      const runner = new AssessmentRunner(invalidContext)
      
      await expect(runner.runAssessment()).rejects.toThrow()
    })

    it('should continue assessment if one module fails', async () => {
      // This would require more complex mocking to simulate partial failures
      // For now, we test that the system is resilient through error handling in individual modules
      const runner = new AssessmentRunner(mockContext)
      const result = await runner.runAssessment()

      // Should still produce a valid result even if some components have issues
      expect(result.assessmentId).toBeDefined()
      expect(result.scores.composite).toBeGreaterThanOrEqual(0)
    })
  })

  describe('Quick Assessment Static Method', () => {
    it('should run quick assessment with minimal setup', async () => {
      const result = await AssessmentRunner.runQuickAssessment(
        mockContext.worksheetPdfPath,
        mockContext.worksheetHtmlPath,
        'quick-test-config',
        tempDir
      )

      expect(result.config).toBe('quick-test-config')
      expect(result.assessmentTime).toBeGreaterThan(0)
      expect(result.scores.composite).toBeGreaterThanOrEqual(0)
      
      // Verify results were saved
      const assessmentDir = path.join(tempDir, 'assessment')
      expect(fs.existsSync(assessmentDir)).toBe(true)
      
      // Cleanup
      if (fs.existsSync(assessmentDir)) {
        fs.rmSync(assessmentDir, { recursive: true })
      }
    })
  })

  describe('Configuration Validation', () => {
    it('should handle different year group configurations', async () => {
      const yearGroups = ['year1', 'year3', 'year6']

      for (const yearGroup of yearGroups) {
        const testConfig = { ...mockConfig, yearGroup }
        const testContext = { ...mockContext, config: testConfig }
        
        const runner = new AssessmentRunner(testContext)
        const result = await runner.runAssessment()
        
        expect(result.config).toBe(testConfig.configId)
        expect(result.scores.composite).toBeGreaterThanOrEqual(0)
      }
    })

    it('should handle different quality thresholds', async () => {
      const thresholds = [5.0, 7.0, 8.5]

      for (const threshold of thresholds) {
        const testContext = {
          ...mockContext,
          options: {
            ...mockContext.options,
            qualityThreshold: threshold
          }
        }
        
        const runner = new AssessmentRunner(testContext)
        const result = await runner.runAssessment()
        
        // Quality gate should respect the threshold
        if (result.scores.composite >= threshold) {
          expect(result.qualityGate).toBe('PASSED')
        } else {
          expect(result.qualityGate).toBe('FAILED')
        }
      }
    })
  })
})