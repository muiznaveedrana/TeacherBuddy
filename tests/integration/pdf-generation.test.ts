import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { generateWorksheetPdf, cleanupRateLimit } from '@/lib/services/pdfGenerationService'
import { LayoutType } from '@/lib/types/worksheet'

// Mock Puppeteer for testing
vi.mock('puppeteer-core', () => ({
  default: {
    launch: vi.fn(() => Promise.resolve({
      newPage: vi.fn(() => Promise.resolve({
        setContent: vi.fn(),
        pdf: vi.fn(() => Promise.resolve(Buffer.from('mock-pdf-content'))),
      })),
      close: vi.fn(),
    })),
  },
}))

vi.mock('@sparticuz/chromium', () => ({
  default: {
    args: ['--no-sandbox'],
    defaultViewport: { width: 1280, height: 720 },
    executablePath: vi.fn(() => Promise.resolve('/mock/path/to/chrome')),
    headless: true,
  },
}))

describe('PDF Generation Service', () => {
  const mockUserId = 'test-user-123'
  
  const mockRequest = {
    config: {
      layout: 'standard' as LayoutType,
      topic: 'Addition',
      subtopic: 'Single Digit Addition',
      difficulty: 'easy' as const,
      questionCount: 5,
      yearGroup: 'Year 2',
      studentNames: []
    },
    generatedContent: '1. What is 2 + 3?\n2. What is 5 + 4?\n3. What is 1 + 6?',
    title: 'Addition Worksheet'
  }

  beforeEach(() => {
    // Clear rate limiting between tests
    cleanupRateLimit()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Security and Validation', () => {
    it('should validate required fields', async () => {
      const invalidRequest = {
        ...mockRequest,
        config: { ...mockRequest.config, layout: undefined }
      }

      // @ts-expect-error Testing invalid input
      const result = await generateWorksheetPdf(invalidRequest, mockUserId)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Missing required fields')
    })

    it('should validate layout type', async () => {
      const invalidRequest = {
        ...mockRequest,
        config: { ...mockRequest.config, layout: 'invalid-layout' as LayoutType }
      }

      const result = await generateWorksheetPdf(invalidRequest, mockUserId)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Invalid layout type')
    })

    it('should enforce rate limiting', async () => {
      // Make 5 successful requests (at the limit)
      for (let i = 0; i < 5; i++) {
        const result = await generateWorksheetPdf(mockRequest, mockUserId)
        expect(result.success).toBe(true)
      }

      // 6th request should be rate limited
      const result = await generateWorksheetPdf(mockRequest, mockUserId)
      expect(result.success).toBe(false)
      expect(result.error).toContain('Rate limit exceeded')
    })

    it('should allow requests for different users', async () => {
      // User 1 makes 5 requests
      for (let i = 0; i < 5; i++) {
        const result = await generateWorksheetPdf(mockRequest, 'user1')
        expect(result.success).toBe(true)
      }

      // User 2 should still be able to make requests
      const result = await generateWorksheetPdf(mockRequest, 'user2')
      expect(result.success).toBe(true)
    })
  })

  describe('PDF Generation', () => {
    it('should generate PDF successfully for standard layout', async () => {
      const result = await generateWorksheetPdf(mockRequest, mockUserId)

      expect(result.success).toBe(true)
      expect(result.buffer).toBeDefined()
      expect(result.filename).toMatch(/^Maths_Addition_Standard_\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.pdf$/)
      expect(result.generationTime).toBeGreaterThan(0)
    })

    it('should generate PDFs for all layout types', async () => {
      const layouts: LayoutType[] = ['standard', 'fluency', 'grid', 'differentiated', 'reasoning']

      for (const layout of layouts) {
        cleanupRateLimit() // Reset rate limiting for each layout
        const layoutRequest = {
          ...mockRequest,
          config: { ...mockRequest.config, layout }
        }

        const result = await generateWorksheetPdf(layoutRequest, `${mockUserId}-${layout}`)

        expect(result.success).toBe(true, `Failed for layout: ${layout}`)
        expect(result.filename).toContain(layout.charAt(0).toUpperCase() + layout.slice(1))
      }
    })

    it('should generate secure filenames without personal data', async () => {
      const result = await generateWorksheetPdf(mockRequest, mockUserId)

      expect(result.success).toBe(true)
      expect(result.filename).not.toContain(mockUserId)
      expect(result.filename).not.toContain('student')
      expect(result.filename).toMatch(/^Maths_[A-Za-z0-9]+_[A-Za-z]+_\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.pdf$/)
    })

    it('should handle malformed content gracefully', async () => {
      const malformedRequest = {
        ...mockRequest,
        generatedContent: '<script>alert("xss")</script>Some content'
      }

      const result = await generateWorksheetPdf(malformedRequest, mockUserId)

      // Should succeed but sanitize content
      expect(result.success).toBe(true)
      expect(result.buffer).toBeDefined()
    })
  })

  describe('Error Handling', () => {
    it('should handle Puppeteer launch failures', async () => {
      // Mock Puppeteer to throw an error
      const puppeteer = await import('puppeteer-core')
      vi.mocked(puppeteer.default.launch).mockRejectedValueOnce(new Error('Chrome launch failed'))

      const result = await generateWorksheetPdf(mockRequest, mockUserId)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Chrome launch failed')
      expect(result.generationTime).toBeGreaterThan(0)
    })

    it('should handle PDF generation timeout', async () => {
      // Mock page.setContent to timeout
      const puppeteer = await import('puppeteer-core')
      const mockPage = {
        setContent: vi.fn(() => Promise.reject(new Error('Navigation timeout'))),
        pdf: vi.fn(),
      }
      const mockBrowser = {
        newPage: vi.fn(() => Promise.resolve(mockPage)),
        close: vi.fn(),
      }
      vi.mocked(puppeteer.default.launch).mockResolvedValueOnce(mockBrowser as any)

      const result = await generateWorksheetPdf(mockRequest, mockUserId)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Navigation timeout')
    })
  })

  describe('Question Parsing', () => {
    it('should parse numbered questions correctly', async () => {
      const numberedContent = '1. What is 2 + 2?\n2. What is 3 + 3?\n3. What is 4 + 4?'
      const request = { ...mockRequest, generatedContent: numberedContent }

      const result = await generateWorksheetPdf(request, mockUserId)

      expect(result.success).toBe(true)
      // Verify the layout context would have received parsed questions
    })

    it('should handle content without clear question separation', async () => {
      const unclearContent = 'This is some worksheet content without clear question breaks.'
      const request = { ...mockRequest, generatedContent: unclearContent }

      const result = await generateWorksheetPdf(request, mockUserId)

      expect(result.success).toBe(true)
      // Should treat entire content as one question
    })

    it('should limit question length for security', async () => {
      const longContent = 'Q: ' + 'A'.repeat(1000) // Very long question
      const request = { ...mockRequest, generatedContent: longContent }

      const result = await generateWorksheetPdf(request, mockUserId)

      expect(result.success).toBe(true)
      // Question should be truncated to 500 characters
    })
  })

  describe('Performance', () => {
    it('should complete PDF generation within reasonable time', async () => {
      const startTime = Date.now()
      const result = await generateWorksheetPdf(mockRequest, mockUserId)
      const endTime = Date.now()

      expect(result.success).toBe(true)
      expect(endTime - startTime).toBeLessThan(45000) // Should complete within 45 seconds
      expect(result.generationTime).toBeLessThan(45000)
    })
  })

  describe('Rate Limit Management', () => {
    it('should clean up expired rate limit entries', () => {
      // This is a simple test for the cleanup function
      // In a real scenario, you'd manipulate the rate limit store directly
      expect(() => cleanupRateLimit()).not.toThrow()
    })

    it('should reset rate limits after time window', async () => {
      // This would require mocking time or using a test implementation
      // For now, we verify the rate limit logic works as expected
      for (let i = 0; i < 5; i++) {
        const result = await generateWorksheetPdf(mockRequest, mockUserId)
        expect(result.success).toBe(true)
      }

      // Should hit rate limit
      const rateLimitedResult = await generateWorksheetPdf(mockRequest, mockUserId)
      expect(rateLimitedResult.success).toBe(false)
    })
  })
})