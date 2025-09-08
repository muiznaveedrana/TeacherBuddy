/**
 * Content Analysis Assessment Tests
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

import { ContentAnalysisAssessment } from '@/worksheet-engine/assessment/content-analysis/content-analysis-assessment'
import { EngineConfig, ContentAnalysisScore } from '@/worksheet-engine/types/engine-types'
import fs from 'fs'
import path from 'path'

describe('ContentAnalysisAssessment', () => {
  let assessment: ContentAnalysisAssessment
  let tempDir: string
  let mockPdfPath: string
  let mockHtmlPath: string
  let mockConfig: EngineConfig

  const goodMathWorksheetHtml = `
    <!DOCTYPE html>
    <html>
    <head><title>Year 3 Addition Worksheet</title></head>
    <body>
      <h1>Addition and Subtraction Practice</h1>
      <div class="instructions">
        <p>Complete the following problems. Show your working in the space provided.</p>
        <p>Remember to check your answers by counting or using the inverse operation.</p>
      </div>
      <div class="questions">
        <div class="question">1. Calculate: 25 + 17 = 42</div>
        <div class="question">2. What is 43 - 18 = 25</div>
        <div class="question">3. Find the sum of 36 and 29 = 65</div>
        <div class="question">4. Subtract 14 from 52 = 38</div>
        <div class="question">5. Add 19 and 33 = 52</div>
      </div>
      <div class="footer">
        <p>Well done! Remember to check your answers.</p>
      </div>
    </body>
    </html>
  `

  const poorContentHtml = `
    <html>
    <body>
      <h1>Maths</h1>
      <p>Do these:</p>
      <div>1. 100 + 200</div>
      <div>2. Calculate the hypotenuse using pythagorean theorem</div>
      <div>3. Solve: x² + 2x - 15 = 0</div>
    </body>
    </html>
  `

  const emptyContentHtml = `
    <html>
    <body>
      <h1>Empty Worksheet</h1>
    </body>
    </html>
  `

  beforeAll(() => {
    tempDir = path.join(__dirname, 'temp-content-test')
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true })
    }
    
    mockPdfPath = path.join(tempDir, 'test-worksheet.pdf')
    mockHtmlPath = path.join(tempDir, 'test-worksheet.html')
    
    // Create mock PDF file
    fs.writeFileSync(mockPdfPath, 'mock pdf content')

    mockConfig = {
      configId: 'year3-addition-test',
      layout: 'standard',
      yearGroup: 'year3',
      topic: 'addition',
      subtopic: 'basic',
      difficulty: 'average',
      questionCount: 5,
      promptVariant: 'baseline'
    }
  })

  afterAll(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true })
    }
  })

  beforeEach(() => {
    assessment = new ContentAnalysisAssessment()
  })

  describe('assess (PDF input)', () => {
    it('should assess PDF with corresponding HTML file', async () => {
      fs.writeFileSync(mockHtmlPath, goodMathWorksheetHtml)
      
      const result = await assessment.assess(mockPdfPath, mockConfig)
      
      expect(result).toBeDefined()
      expect(result.score).toBeGreaterThanOrEqual(0)
      expect(result.score).toBeLessThanOrEqual(10)
      expect(result.details.curriculumAlignment).toBeGreaterThanOrEqual(0)
      expect(result.details.languageAppropriate).toBeGreaterThanOrEqual(0)
      expect(result.details.mathematicalAccuracy).toBeGreaterThanOrEqual(0)
    })

    it('should assess PDF without HTML file', async () => {
      const pdfOnlyPath = path.join(tempDir, 'pdf-only.pdf')
      fs.writeFileSync(pdfOnlyPath, 'mock pdf content')
      
      const result = await assessment.assess(pdfOnlyPath, mockConfig)
      
      expect(result.score).toBeGreaterThanOrEqual(0)
      expect(result.score).toBeLessThanOrEqual(10)
      
      // Cleanup
      fs.unlinkSync(pdfOnlyPath)
    })

    it('should handle assessment errors gracefully', async () => {
      const invalidPdfPath = path.join(tempDir, 'nonexistent.pdf')
      
      const result = await assessment.assess(invalidPdfPath, mockConfig)
      
      expect(result.score).toBe(5.0)
      expect(result.details.curriculumAlignment).toBe(5.0)
      expect(result.details.languageAppropriate).toBe(5.0)
      expect(result.details.mathematicalAccuracy).toBe(5.0)
    })
  })

  describe('assessHtml', () => {
    it('should assess high-quality math worksheet HTML', async () => {
      const result = await assessment.assessHtml(goodMathWorksheetHtml, mockConfig)
      
      expect(result.score).toBeGreaterThan(6.0)
      expect(result.details.curriculumAlignment).toBeGreaterThan(6.0)
      expect(result.details.mathematicalAccuracy).toBeGreaterThan(7.0) // Correct math
      expect(result.details.languageAppropriate).toBeGreaterThan(6.0)
    })

    it('should assess poor quality content with lower scores', async () => {
      const poorConfig: EngineConfig = {
        ...mockConfig,
        yearGroup: 'year3', // Year 3 but content is too advanced
        topic: 'addition',
        questionCount: 5
      }
      
      const result = await assessment.assessHtml(poorContentHtml, poorConfig)
      
      expect(result.score).toBeLessThan(7.0) // Should be lower due to inappropriate content
      expect(result.details.languageAppropriate).toBeLessThan(7.0) // Too advanced for Year 3
    })

    it('should assess empty content with low scores', async () => {
      const result = await assessment.assessHtml(emptyContentHtml, mockConfig)
      
      expect(result.score).toBeLessThan(5.0)
      expect(result.details.curriculumAlignment).toBeLessThan(6.0)
      expect(result.details.languageAppropriate).toBeLessThan(6.0)
    })

    it('should assess content for different year groups appropriately', async () => {
      const year1Config: EngineConfig = {
        ...mockConfig,
        yearGroup: 'year1',
        topic: 'counting',
        questionCount: 3
      }

      const year1Html = `
        <html><body>
          <h1>Counting Practice</h1>
          <div class="instructions">Count the objects and write the number.</div>
          <div class="question">1. How many apples? (Show 3 apple pictures)</div>
          <div class="question">2. Count the dots: ••• = 3</div>
          <div class="question">3. What number comes after 4? = 5</div>
        </body></html>
      `
      
      const result = await assessment.assessHtml(year1Html, year1Config)
      
      expect(result.score).toBeGreaterThan(6.0)
      expect(result.details.languageAppropriate).toBeGreaterThan(7.0) // Simple language for Year 1
    })

    it('should handle different mathematical topics', async () => {
      const fractionsConfig: EngineConfig = {
        ...mockConfig,
        yearGroup: 'year5',
        topic: 'fractions',
        subtopic: 'basic',
        questionCount: 4
      }

      const fractionsHtml = `
        <html><body>
          <h1>Introduction to Fractions</h1>
          <div class="instructions">A fraction shows part of a whole. The top number (numerator) shows how many parts we have.</div>
          <div class="question">1. What fraction is shaded? 1/2</div>
          <div class="question">2. Color 3/4 of the circle</div>
          <div class="question">3. Which is bigger: 1/3 or 1/2?</div>
          <div class="question">4. Add these fractions: 1/4 + 1/4 = 2/4 = 1/2</div>
        </body></html>
      `
      
      const result = await assessment.assessHtml(fractionsHtml, fractionsConfig)
      
      expect(result.score).toBeGreaterThan(6.0)
      expect(result.details.curriculumAlignment).toBeGreaterThan(6.0) // Good curriculum match
      expect(result.details.mathematicalAccuracy).toBeGreaterThan(7.0) // Correct fraction concepts
    })
  })

  describe('assessDetailed', () => {
    it('should provide detailed assessment results', async () => {
      fs.writeFileSync(mockHtmlPath, goodMathWorksheetHtml)
      
      const result = await assessment.assessDetailed(mockPdfPath, mockConfig)
      
      expect(result.overallScore).toBeDefined()
      expect(result.extractedContent).toBeDefined()
      expect(result.validationResult).toBeDefined()
      expect(result.scoringResult).toBeDefined()
      expect(result.processingTime).toBeGreaterThan(0)
      expect(result.analysisDetails).toBeDefined()
      expect(result.analysisDetails.contentQualityIssues).toBeDefined()
      expect(result.analysisDetails.recommendations).toBeDefined()
    })

    it('should handle detailed assessment errors', async () => {
      const invalidPdfPath = path.join(tempDir, 'nonexistent.pdf')
      
      await expect(assessment.assessDetailed(invalidPdfPath, mockConfig))
        .rejects.toThrow()
    })
  })

  describe('generateReport', () => {
    it('should generate detailed content analysis report', async () => {
      fs.writeFileSync(mockHtmlPath, goodMathWorksheetHtml)
      
      const report = await assessment.generateReport(mockPdfPath, mockConfig)
      
      expect(report).toContain('Content Analysis Assessment Report')
      expect(report).toContain('Overall Content Score:')
      expect(report).toContain('Content Extraction Summary')
      expect(report).toContain('Curriculum Validation')
      expect(report).toContain('Content Quality Scoring')
    })

    it('should handle report generation errors', async () => {
      const invalidPdfPath = path.join(tempDir, 'nonexistent.pdf')
      
      const report = await assessment.generateReport(invalidPdfPath, mockConfig)
      
      expect(report).toContain('Content analysis report generation failed')
    })
  })

  describe('quickAssess', () => {
    it('should provide quick assessment metrics', async () => {
      const result = await assessment.quickAssess(goodMathWorksheetHtml, mockConfig)
      
      expect(result.score).toBeGreaterThanOrEqual(0)
      expect(result.score).toBeLessThanOrEqual(10)
      expect(typeof result.wordCount).toBe('number')
      expect(typeof result.questionCount).toBe('number')
      expect(typeof result.hasInstructions).toBe('boolean')
      expect(typeof result.mathAccuracy).toBe('number')
      
      expect(result.wordCount).toBeGreaterThan(0)
      expect(result.questionCount).toBeGreaterThan(0)
      expect(result.hasInstructions).toBe(true)
      expect(result.mathAccuracy).toBeGreaterThan(6.0)
    })

    it('should handle quick assessment of poor content', async () => {
      const result = await assessment.quickAssess(emptyContentHtml, mockConfig)
      
      expect(result.score).toBeLessThan(6.0)
      expect(result.wordCount).toBeLessThan(10)
      expect(result.questionCount).toBe(0)
      expect(result.hasInstructions).toBe(false)
    })

    it('should handle quick assessment errors gracefully', async () => {
      const result = await assessment.quickAssess('', mockConfig)
      
      expect(result.score).toBe(5.0)
      expect(result.wordCount).toBe(0)
      expect(result.questionCount).toBe(0)
      expect(result.hasInstructions).toBe(false)
      expect(result.mathAccuracy).toBe(5.0)
    })
  })

  describe('edge cases', () => {
    it('should handle HTML with complex mathematical notation', async () => {
      const complexMathHtml = `
        <html><body>
          <h1>Advanced Mathematics</h1>
          <div class="question">1. Calculate: 15 × 23 = 345</div>
          <div class="question">2. Find 25% of 80 = 20</div>
          <div class="question">3. Solve: 2x + 5 = 15, so x = 5</div>
        </body></html>
      `
      
      const result = await assessment.assessHtml(complexMathHtml, mockConfig)
      
      expect(result.score).toBeGreaterThanOrEqual(0)
      expect(result.details.mathematicalAccuracy).toBeGreaterThan(5.0) // Should detect correct math
    })

    it('should handle HTML with incorrect mathematics', async () => {
      const incorrectMathHtml = `
        <html><body>
          <h1>Math Problems</h1>
          <div class="question">1. 5 + 3 = 9</div>
          <div class="question">2. 10 - 4 = 7</div>
          <div class="question">3. 2 × 3 = 7</div>
        </body></html>
      `
      
      const result = await assessment.assessHtml(incorrectMathHtml, mockConfig)
      
      expect(result.details.mathematicalAccuracy).toBeLessThan(7.0) // Should detect errors
    })

    it('should handle very long content', async () => {
      let longHtml = '<html><body><h1>Long Worksheet</h1><div class="instructions">Complete all problems below.</div>'
      for (let i = 1; i <= 100; i++) {
        longHtml += `<div class="question">${i}. What is ${i} + ${i}? Answer: ${i * 2}</div>`
      }
      longHtml += '</body></html>'
      
      const longConfig: EngineConfig = {
        ...mockConfig,
        questionCount: 100
      }
      
      const result = await assessment.assessHtml(longHtml, longConfig)
      
      expect(result.score).toBeGreaterThanOrEqual(0)
      expect(result.score).toBeLessThanOrEqual(10)
    })

    it('should handle HTML with no mathematical content', async () => {
      const nonMathHtml = `
        <html><body>
          <h1>English Worksheet</h1>
          <div class="instructions">Read the story and answer the questions.</div>
          <p>The cat sat on the mat. It was a sunny day.</p>
          <div class="question">1. What did the cat sit on?</div>
          <div class="question">2. What was the weather like?</div>
        </body></html>
      `
      
      const result = await assessment.assessHtml(nonMathHtml, mockConfig)
      
      expect(result.score).toBeGreaterThanOrEqual(0)
      expect(result.details.mathematicalAccuracy).toBeGreaterThan(5.0) // Neutral score for non-math
    })

    it('should handle different configuration parameters', async () => {
      const configs = [
        { yearGroup: 'year1', topic: 'counting', questionCount: 3 },
        { yearGroup: 'year6', topic: 'algebra', questionCount: 10 },
        { yearGroup: 'reception', topic: 'numbers', questionCount: 2 }
      ]

      for (const configOverrides of configs) {
        const testConfig: EngineConfig = { ...mockConfig, ...configOverrides }
        const result = await assessment.assessHtml(goodMathWorksheetHtml, testConfig)
        
        expect(result.score).toBeGreaterThanOrEqual(0)
        expect(result.score).toBeLessThanOrEqual(10)
      }
    })
  })
})