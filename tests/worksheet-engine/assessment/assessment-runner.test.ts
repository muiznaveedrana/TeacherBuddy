/**
 * Assessment Runner Tests
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

import { AssessmentRunner } from '@/worksheet-engine/assessment/assessment-runner'
import { AssessmentContext, EngineConfig, QualityAssessmentResult } from '@/worksheet-engine/types/engine-types'
import fs from 'fs'
import path from 'path'

// Mock the assessment modules
jest.mock('@/worksheet-engine/assessment/visual-similarity/image-comparison')
jest.mock('@/worksheet-engine/assessment/content-analysis')
jest.mock('@/worksheet-engine/assessment/rule-based')

describe('AssessmentRunner', () => {
  let testContext: AssessmentContext
  let mockPdfPath: string
  let mockHtmlPath: string
  let tempDir: string

  beforeAll(() => {
    tempDir = path.join(__dirname, 'temp-test-files')
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true })
    }
    
    mockPdfPath = path.join(tempDir, 'test-worksheet.pdf')
    mockHtmlPath = path.join(tempDir, 'test-worksheet.html')
    
    // Create mock files
    fs.writeFileSync(mockPdfPath, 'mock pdf content')
    fs.writeFileSync(mockHtmlPath, '<html><body>Mock HTML content</body></html>')
  })

  afterAll(() => {
    // Cleanup
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true })
    }
  })

  beforeEach(() => {
    const mockConfig: EngineConfig = {
      configId: 'test-config',
      layout: 'standard',
      yearGroup: 'year3',
      topic: 'addition',
      subtopic: 'basic',
      difficulty: 'average',
      questionCount: 5,
      promptVariant: 'baseline'
    }

    testContext = {
      worksheetPdfPath: mockPdfPath,
      worksheetHtmlPath: mockHtmlPath,
      config: mockConfig,
      options: {
        enableVisualSimilarity: true,
        enableContentAnalysis: true,
        enableRuleBasedLayout: true,
        qualityThreshold: 7.0
      }
    }
  })

  describe('constructor', () => {
    it('should create AssessmentRunner with valid context', () => {
      const runner = new AssessmentRunner(testContext)
      expect(runner).toBeInstanceOf(AssessmentRunner)
    })
  })

  describe('runAssessment', () => {
    it('should run complete assessment with all modules enabled', async () => {
      const runner = new AssessmentRunner(testContext)
      
      const result = await runner.runAssessment()
      
      expect(result).toBeDefined()
      expect(result.assessmentId).toBeDefined()
      expect(result.timestamp).toBeDefined()
      expect(result.config).toBe('test-config')
      expect(result.scores).toBeDefined()
      expect(result.scores.composite).toBeGreaterThanOrEqual(0)
      expect(result.qualityGate).toMatch(/^(PASSED|FAILED)$/)
      expect(result.assessmentTime).toBeGreaterThan(0)
      expect(Array.isArray(result.recommendations)).toBe(true)
    })

    it('should handle assessment with only rule-based layout enabled', async () => {
      testContext.options = {
        enableVisualSimilarity: false,
        enableContentAnalysis: false,
        enableRuleBasedLayout: true,
        qualityThreshold: 7.0
      }

      const runner = new AssessmentRunner(testContext)
      const result = await runner.runAssessment()
      
      expect(result.scores.ruleBasedLayout.score).toBeGreaterThanOrEqual(0)
      expect(result.scores.visualSimilarity.score).toBe(0)
      expect(result.scores.contentAnalysis.score).toBe(0)
    })

    it('should handle assessment with only content analysis enabled', async () => {
      testContext.options = {
        enableVisualSimilarity: false,
        enableContentAnalysis: true,
        enableRuleBasedLayout: false,
        qualityThreshold: 7.0
      }

      const runner = new AssessmentRunner(testContext)
      const result = await runner.runAssessment()
      
      expect(result.scores.contentAnalysis.score).toBeGreaterThanOrEqual(0)
      expect(result.scores.visualSimilarity.score).toBe(0)
      expect(result.scores.ruleBasedLayout.score).toBe(0)
    })

    it('should handle visual similarity with golden reference', async () => {
      const goldenRefPath = path.join(tempDir, 'golden-reference.pdf')
      fs.writeFileSync(goldenRefPath, 'mock golden reference')
      
      testContext.options.goldenReferencePath = goldenRefPath

      const runner = new AssessmentRunner(testContext)
      const result = await runner.runAssessment()
      
      expect(result.scores.visualSimilarity.score).toBeGreaterThanOrEqual(0)
      
      // Cleanup
      fs.unlinkSync(goldenRefPath)
    })

    it('should skip visual similarity when golden reference is missing', async () => {
      testContext.options.goldenReferencePath = '/nonexistent/path.pdf'

      const runner = new AssessmentRunner(testContext)
      const result = await runner.runAssessment()
      
      expect(result.scores.visualSimilarity.score).toBe(0)
    })

    it('should handle missing input files gracefully', async () => {
      testContext.worksheetPdfPath = '/nonexistent/worksheet.pdf'

      const runner = new AssessmentRunner(testContext)
      
      await expect(runner.runAssessment()).rejects.toThrow()
    })

    it('should complete assessment within performance requirements', async () => {
      const runner = new AssessmentRunner(testContext)
      
      const startTime = Date.now()
      const result = await runner.runAssessment()
      const totalTime = (Date.now() - startTime) / 1000
      
      expect(totalTime).toBeLessThan(30) // Should complete within 30 seconds
      expect(result.assessmentTime).toBeLessThan(30)
    })
  })

  describe('saveResults', () => {
    it('should save assessment results to JSON file', async () => {
      const runner = new AssessmentRunner(testContext)
      const result = await runner.runAssessment()
      
      const outputDir = tempDir
      const savedPath = await runner.saveResults(result, outputDir)
      
      expect(fs.existsSync(savedPath)).toBe(true)
      
      const savedContent = JSON.parse(fs.readFileSync(savedPath, 'utf-8'))
      expect(savedContent.assessmentId).toBe(result.assessmentId)
      expect(savedContent.scores.composite).toBe(result.scores.composite)
      
      // Cleanup
      fs.unlinkSync(savedPath)
      fs.rmSync(path.join(outputDir, 'assessment'), { recursive: true, force: true })
    })

    it('should create assessment directory if it does not exist', async () => {
      const runner = new AssessmentRunner(testContext)
      const result = await runner.runAssessment()
      
      const outputDir = path.join(tempDir, 'new-assessment-dir')
      const savedPath = await runner.saveResults(result, outputDir)
      
      expect(fs.existsSync(savedPath)).toBe(true)
      expect(fs.existsSync(path.join(outputDir, 'assessment'))).toBe(true)
      
      // Cleanup
      fs.rmSync(outputDir, { recursive: true, force: true })
    })
  })

  describe('generateReport', () => {
    it('should generate detailed assessment report', async () => {
      const runner = new AssessmentRunner(testContext)
      const result = await runner.runAssessment()
      
      const report = runner.generateReport(result)
      
      expect(report).toContain('WORKSHEET QUALITY ASSESSMENT')
      expect(report).toContain(`Assessment ID: ${result.assessmentId}`)
      expect(report).toContain(`COMPOSITE SCORE: ${result.scores.composite}/10`)
      expect(report).toContain(`QUALITY GATE: ${result.qualityGate}`)
    })

    it('should include recommendations in report', async () => {
      const runner = new AssessmentRunner(testContext)
      const result = await runner.runAssessment()
      
      if (result.recommendations.length > 0) {
        const report = runner.generateReport(result)
        expect(report).toContain('RECOMMENDATIONS')
        result.recommendations.forEach(rec => {
          expect(report).toContain(rec)
        })
      }
    })
  })

  describe('runQuickAssessment', () => {
    it('should run quick assessment with minimal setup', async () => {
      const result = await AssessmentRunner.runQuickAssessment(
        mockPdfPath,
        mockHtmlPath,
        'test-config',
        tempDir
      )
      
      expect(result.config).toBe('test-config')
      expect(result.assessmentTime).toBeGreaterThan(0)
      expect(result.scores.composite).toBeGreaterThanOrEqual(0)
      
      // Check if results were saved
      const assessmentDir = path.join(tempDir, 'assessment')
      expect(fs.existsSync(assessmentDir)).toBe(true)
      
      // Cleanup
      fs.rmSync(assessmentDir, { recursive: true, force: true })
    })

    it('should handle quick assessment with golden reference', async () => {
      const goldenRefPath = path.join(tempDir, 'golden-reference.pdf')
      fs.writeFileSync(goldenRefPath, 'mock golden reference')
      
      const result = await AssessmentRunner.runQuickAssessment(
        mockPdfPath,
        mockHtmlPath,
        'test-config',
        tempDir,
        goldenRefPath
      )
      
      expect(result.scores.visualSimilarity.score).toBeGreaterThanOrEqual(0)
      
      // Cleanup
      fs.unlinkSync(goldenRefPath)
      const assessmentDir = path.join(tempDir, 'assessment')
      if (fs.existsSync(assessmentDir)) {
        fs.rmSync(assessmentDir, { recursive: true, force: true })
      }
    })
  })

  describe('private methods', () => {
    it('should generate unique assessment IDs', async () => {
      const runner1 = new AssessmentRunner(testContext)
      const runner2 = new AssessmentRunner(testContext)
      
      const result1 = await runner1.runAssessment()
      const result2 = await runner2.runAssessment()
      
      expect(result1.assessmentId).not.toBe(result2.assessmentId)
    })

    it('should validate input files', async () => {
      const invalidContext = {
        ...testContext,
        worksheetPdfPath: '/invalid/path.pdf'
      }
      
      const runner = new AssessmentRunner(invalidContext)
      
      await expect(runner.runAssessment()).rejects.toThrow()
    })
  })
})