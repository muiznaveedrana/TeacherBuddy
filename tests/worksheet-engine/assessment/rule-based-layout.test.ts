/**
 * Rule-Based Layout Assessment Tests
 * Story Engine.1.2: Hybrid Quality Assessment Framework
 */

import { RuleBasedLayoutAssessment } from '@/worksheet-engine/assessment/rule-based/rule-based-layout-assessment'
import { RuleBasedLayoutScore } from '@/worksheet-engine/types/engine-types'
import fs from 'fs'
import path from 'path'

describe('RuleBasedLayoutAssessment', () => {
  let assessment: RuleBasedLayoutAssessment
  let tempDir: string
  let mockHtmlPath: string
  let mockPdfPath: string

  const mockGoodHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 16px; }
        h1 { font-size: 24px; font-weight: bold; margin: 16px 0; }
        h2 { font-size: 18px; font-weight: 600; margin: 12px 0; }
        p { font-size: 14px; margin: 8px 0; line-height: 1.5; }
        .question { margin: 16px 0; padding: 8px; }
        .instructions { margin: 16px 0; padding: 12px; background: #f5f5f5; }
      </style>
    </head>
    <body>
      <h1>Year 3 Addition Worksheet</h1>
      <div class="instructions">
        <p>Complete the following addition problems. Show your working.</p>
      </div>
      <div class="question">
        <p>1. What is 15 + 23?</p>
      </div>
      <div class="question">
        <p>2. Calculate 47 + 28</p>
      </div>
      <div class="question">
        <p>3. Find the sum of 34 and 19</p>
      </div>
    </body>
    </html>
  `

  const mockPoorHtml = `
    <html>
    <head>
      <style>
        body { font-family: Times New Roman; margin: 0; }
        h1 { font-size: 28px; font-weight: normal; margin: 50px 0; }
        h2 { font-size: 16px; font-weight: bold; margin: 2px 0; }
        p { font-size: 12px; margin: 30px 0; }
        .question { margin: -10px 0; position: absolute; }
        .weird { font-family: Comic Sans MS; font-size: 22px; }
      </style>
    </head>
    <body>
      <h1 class="weird">Addition Problems!!!</h1>
      <div class="question" style="margin: -5px; position: absolute; top: 100px;">
        <p style="font-size: 8px;">1. 15 + 23 =</p>
      </div>
      <div class="question" style="position: absolute; top: 200px; margin: 0;">
        <p style="font-size: 20px; margin: 0;">2. 47 + 28 =</p>
      </div>
    </body>
    </html>
  `

  beforeAll(() => {
    tempDir = path.join(__dirname, 'temp-rule-based-test')
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true })
    }
    
    mockHtmlPath = path.join(tempDir, 'test-worksheet.html')
    mockPdfPath = path.join(tempDir, 'test-worksheet.pdf')
    
    // Create mock PDF file
    fs.writeFileSync(mockPdfPath, 'mock pdf content')
  })

  afterAll(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true })
    }
  })

  beforeEach(() => {
    assessment = new RuleBasedLayoutAssessment()
  })

  describe('assess (PDF input)', () => {
    it('should assess PDF file when corresponding HTML exists', async () => {
      fs.writeFileSync(mockHtmlPath, mockGoodHtml)
      
      const result = await assessment.assess(mockPdfPath)
      
      expect(result).toBeDefined()
      expect(result.score).toBeGreaterThanOrEqual(0)
      expect(result.score).toBeLessThanOrEqual(10)
      expect(result.details.fontConsistency).toBeGreaterThanOrEqual(0)
      expect(result.details.spacingQuality).toBeGreaterThanOrEqual(0)
      expect(result.details.elementPositioning).toBeGreaterThanOrEqual(0)
    })

    it('should return default scores when HTML file is missing', async () => {
      const nonExistentPdf = path.join(tempDir, 'nonexistent.pdf')
      fs.writeFileSync(nonExistentPdf, 'mock pdf')
      
      const result = await assessment.assess(nonExistentPdf)
      
      expect(result.score).toBe(7.5)
      expect(result.details.fontConsistency).toBe(7.5)
      expect(result.details.spacingQuality).toBe(7.5)
      expect(result.details.elementPositioning).toBe(7.5)
      
      // Cleanup
      fs.unlinkSync(nonExistentPdf)
    })
  })

  describe('assessHtml', () => {
    it('should assess well-structured HTML with high scores', async () => {
      const result = await assessment.assessHtml(mockGoodHtml)
      
      expect(result.score).toBeGreaterThan(6.0)
      expect(result.details.fontConsistency).toBeGreaterThan(6.0)
      expect(result.details.spacingQuality).toBeGreaterThan(6.0)
      expect(result.details.elementPositioning).toBeGreaterThan(6.0)
    })

    it('should assess poorly-structured HTML with lower scores', async () => {
      const result = await assessment.assessHtml(mockPoorHtml)
      
      expect(result.score).toBeLessThan(8.0) // Should be lower due to poor practices
      // At least some aspects should be flagged as problematic
      const scores = [result.details.fontConsistency, result.details.spacingQuality, result.details.elementPositioning]
      expect(scores.some(score => score < 7.0)).toBe(true)
    })

    it('should handle empty HTML content', async () => {
      const result = await assessment.assessHtml('')
      
      expect(result.score).toBeLessThan(6.0)
      expect(result.details.fontConsistency).toBeLessThanOrEqual(10)
      expect(result.details.spacingQuality).toBeLessThanOrEqual(10)
      expect(result.details.elementPositioning).toBeLessThanOrEqual(10)
    })

    it('should handle malformed HTML gracefully', async () => {
      const malformedHtml = '<html><head><style>broken css {</style><body>content'
      
      const result = await assessment.assessHtml(malformedHtml)
      
      expect(result.score).toBeGreaterThanOrEqual(0)
      expect(result.score).toBeLessThanOrEqual(10)
    })

    it('should assess HTML with inline styles', async () => {
      const inlineStyleHtml = `
        <html>
        <body style="font-family: Arial; margin: 16px;">
          <h1 style="font-size: 24px; margin: 16px 0;">Title</h1>
          <p style="font-size: 14px; margin: 8px 0;">Content</p>
        </body>
        </html>
      `
      
      const result = await assessment.assessHtml(inlineStyleHtml)
      
      expect(result.score).toBeGreaterThan(5.0)
      expect(result.details.fontConsistency).toBeGreaterThan(5.0)
    })

    it('should handle HTML with modern CSS features', async () => {
      const modernHtml = `
        <html>
        <head>
          <style>
            body { font-family: 'Inter', Arial, sans-serif; margin: 0; }
            .container { display: flex; justify-content: center; align-items: start; gap: 16px; }
            .card { display: grid; grid-template-columns: 1fr 2fr; padding: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="card">Modern layout</div>
          </div>
        </body>
        </html>
      `
      
      const result = await assessment.assessHtml(modernHtml)
      
      // Modern layout techniques should score well on element positioning
      expect(result.details.elementPositioning).toBeGreaterThan(6.0)
    })
  })

  describe('generateReport', () => {
    it('should generate detailed assessment report', async () => {
      fs.writeFileSync(mockHtmlPath, mockGoodHtml)
      
      const report = await assessment.generateReport(mockGoodHtml)
      
      expect(report).toContain('Rule-based assessment')
      expect(report).toContain('Overall Score:')
      expect(report).toContain('Font Consistency:')
      expect(report).toContain('Spacing Quality:')
      expect(report).toContain('Element Positioning:')
    })

    it('should handle report generation errors gracefully', async () => {
      const report = await assessment.generateReport('')
      
      expect(report).toContain('Rule-based assessment')
      expect(typeof report).toBe('string')
    })
  })

  describe('quickAssess', () => {
    it('should provide quick assessment metrics', async () => {
      const result = await assessment.quickAssess(mockGoodHtml)
      
      expect(result.score).toBeGreaterThanOrEqual(0)
      expect(result.score).toBeLessThanOrEqual(10)
      expect(typeof result.fontIssues).toBe('number')
      expect(typeof result.spacingIssues).toBe('number')
      expect(typeof result.alignmentIssues).toBe('number')
      expect(result.fontIssues).toBeGreaterThanOrEqual(0)
      expect(result.spacingIssues).toBeGreaterThanOrEqual(0)
      expect(result.alignmentIssues).toBeGreaterThanOrEqual(0)
    })

    it('should handle quick assessment errors', async () => {
      const result = await assessment.quickAssess('')
      
      expect(result.score).toBe(5.0)
      expect(result.fontIssues).toBe(0)
      expect(result.spacingIssues).toBe(0)
      expect(result.alignmentIssues).toBe(0)
    })
  })

  describe('edge cases', () => {
    it('should handle CSS with complex selectors', async () => {
      const complexCssHtml = `
        <html>
        <head>
          <style>
            body > div:nth-child(2n+1) .question:not(.answered) p { margin: 8px; }
            .container .question:hover::before { content: "→"; }
            @media (max-width: 768px) { .question { margin: 4px; } }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="question"><p>Question 1</p></div>
          </div>
        </body>
        </html>
      `
      
      const result = await assessment.assessHtml(complexCssHtml)
      
      expect(result.score).toBeGreaterThanOrEqual(0)
      expect(result.score).toBeLessThanOrEqual(10)
    })

    it('should handle CSS custom properties', async () => {
      const customPropsHtml = `
        <html>
        <head>
          <style>
            :root { --primary-margin: 16px; --font-size: 14px; }
            body { margin: var(--primary-margin); font-size: var(--font-size); }
            .question { margin: var(--primary-margin) 0; }
          </style>
        </head>
        <body>
          <div class="question">Question with custom properties</div>
        </body>
        </html>
      `
      
      const result = await assessment.assessHtml(customPropsHtml)
      
      expect(result.score).toBeGreaterThanOrEqual(0)
    })

    it('should handle very large HTML documents', async () => {
      let largeHtml = '<html><head><style>body { margin: 16px; }</style></head><body>'
      for (let i = 0; i < 1000; i++) {
        largeHtml += `<div class="question-${i}" style="margin: 8px 0;"><p>Question ${i}</p></div>`
      }
      largeHtml += '</body></html>'
      
      const result = await assessment.assessHtml(largeHtml)
      
      expect(result.score).toBeGreaterThanOrEqual(0)
      expect(result.score).toBeLessThanOrEqual(10)
    })
  })
})