import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { POST, GET } from '@/app/api/worksheets/generate-pdf/route'

// Mock the PDF service
vi.mock('@/lib/services/pdfGenerationService', () => ({
  generateWorksheetPdf: vi.fn(),
}))

// Mock Next.js request/response
const createMockRequest = (body: any, headers: Record<string, string> = {}) => {
  const request = {
    json: vi.fn(() => Promise.resolve(body)),
    headers: new Map(Object.entries({
      'authorization': 'Bearer mock-token',
      ...headers
    })),
    cookies: new Map([['session', { value: 'mock-session-token' }]]),
  } as unknown as NextRequest

  return request
}

describe('/api/worksheets/generate-pdf', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Authentication', () => {
    it('should require authentication', async () => {
      const request = createMockRequest({}, {}) // No auth headers
      request.headers = new Map() // Empty headers
      request.cookies = new Map() // No cookies

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toContain('Authentication required')
    })

    it('should accept valid authentication', async () => {
      const validBody = {
        config: {
          layout: 'standard',
          topic: 'Addition',
          subtopic: 'Single Digit',
          difficulty: 'easy',
          questionCount: 5,
          yearGroup: 'Year 2',
          studentNames: []
        },
        generatedContent: 'Test content',
        title: 'Test Worksheet'
      }

      const { generateWorksheetPdf } = await import('@/lib/services/pdfGenerationService')
      vi.mocked(generateWorksheetPdf).mockResolvedValue({
        success: true,
        buffer: Buffer.from('mock-pdf'),
        filename: 'test.pdf',
        generationTime: 1000
      })

      const request = createMockRequest(validBody)
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(response.headers.get('Content-Type')).toBe('application/pdf')
    })
  })

  describe('Input Validation', () => {
    it('should validate JSON format', async () => {
      const request = createMockRequest({})
      request.json = vi.fn(() => Promise.reject(new Error('Invalid JSON')))

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Invalid JSON')
    })

    it('should validate required fields', async () => {
      const invalidBody = {
        config: {
          // Missing required fields
          layout: 'standard'
        }
      }

      const request = createMockRequest(invalidBody)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Invalid request format')
      expect(data.details).toBeDefined()
    })

    it('should validate layout types', async () => {
      const invalidBody = {
        config: {
          layout: 'invalid-layout',
          topic: 'Addition',
          subtopic: 'Single Digit',
          difficulty: 'easy',
          questionCount: 5,
          yearGroup: 'Year 2',
          studentNames: []
        },
        generatedContent: 'Test content',
        title: 'Test Worksheet'
      }

      const request = createMockRequest(invalidBody)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Invalid request format')
    })

    it('should validate difficulty levels', async () => {
      const invalidBody = {
        config: {
          layout: 'standard',
          topic: 'Addition',
          subtopic: 'Single Digit',
          difficulty: 'invalid-difficulty',
          questionCount: 5,
          yearGroup: 'Year 2',
          studentNames: []
        },
        generatedContent: 'Test content',
        title: 'Test Worksheet'
      }

      const request = createMockRequest(invalidBody)
      const response = await POST(request)

      expect(response.status).toBe(400)
    })

    it('should validate question count limits', async () => {
      const invalidBody = {
        config: {
          layout: 'standard',
          topic: 'Addition',
          subtopic: 'Single Digit',
          difficulty: 'easy',
          questionCount: 100, // Too many questions
          yearGroup: 'Year 2',
          studentNames: []
        },
        generatedContent: 'Test content',
        title: 'Test Worksheet'
      }

      const request = createMockRequest(invalidBody)
      const response = await POST(request)

      expect(response.status).toBe(400)
    })
  })

  describe('Content Sanitization', () => {
    it('should sanitize HTML content', async () => {
      const maliciousBody = {
        config: {
          layout: 'standard',
          topic: 'Addition',
          subtopic: 'Single Digit',
          difficulty: 'easy',
          questionCount: 5,
          yearGroup: 'Year 2',
          studentNames: []
        },
        generatedContent: '<script>alert("xss")</script>Safe content',
        title: '<img src=x onerror=alert("xss")>Test Title'
      }

      const { generateWorksheetPdf } = await import('@/lib/services/pdfGenerationService')
      vi.mocked(generateWorksheetPdf).mockResolvedValue({
        success: true,
        buffer: Buffer.from('mock-pdf'),
        filename: 'test.pdf',
        generationTime: 1000
      })

      const request = createMockRequest(maliciousBody)
      await POST(request)

      // Verify that generateWorksheetPdf was called with sanitized content
      expect(generateWorksheetPdf).toHaveBeenCalledWith(
        expect.objectContaining({
          generatedContent: expect.not.stringContaining('<script>'),
          title: expect.not.stringContaining('onerror')
        }),
        expect.any(String)
      )
    })

    it('should remove javascript protocols', async () => {
      const maliciousBody = {
        config: {
          layout: 'standard',
          topic: 'Addition',
          subtopic: 'Single Digit',
          difficulty: 'easy',
          questionCount: 5,
          yearGroup: 'Year 2',
          studentNames: []
        },
        generatedContent: 'Click javascript:alert("evil") here',
        title: 'Test Title'
      }

      const { generateWorksheetPdf } = await import('@/lib/services/pdfGenerationService')
      vi.mocked(generateWorksheetPdf).mockResolvedValue({
        success: true,
        buffer: Buffer.from('mock-pdf'),
        filename: 'test.pdf',
        generationTime: 1000
      })

      const request = createMockRequest(maliciousBody)
      await POST(request)

      expect(generateWorksheetPdf).toHaveBeenCalledWith(
        expect.objectContaining({
          generatedContent: expect.not.stringContaining('javascript:')
        }),
        expect.any(String)
      )
    })
  })

  describe('PDF Generation Success', () => {
    it('should return PDF with correct headers', async () => {
      const validBody = {
        config: {
          layout: 'standard',
          topic: 'Addition',
          subtopic: 'Single Digit',
          difficulty: 'easy',
          questionCount: 5,
          yearGroup: 'Year 2',
          studentNames: []
        },
        generatedContent: 'Test content',
        title: 'Test Worksheet'
      }

      const mockPdfBuffer = Buffer.from('mock-pdf-content')
      const { generateWorksheetPdf } = await import('@/lib/services/pdfGenerationService')
      vi.mocked(generateWorksheetPdf).mockResolvedValue({
        success: true,
        buffer: mockPdfBuffer,
        filename: 'Maths_Addition_Standard_2024-01-15T10-30-00.pdf',
        generationTime: 2500
      })

      const request = createMockRequest(validBody)
      const response = await POST(request)

      expect(response.status).toBe(200)
      expect(response.headers.get('Content-Type')).toBe('application/pdf')
      expect(response.headers.get('Content-Disposition')).toContain('attachment')
      expect(response.headers.get('Content-Disposition')).toContain('Maths_Addition_Standard')
      expect(response.headers.get('Content-Length')).toBe(mockPdfBuffer.length.toString())
      expect(response.headers.get('Cache-Control')).toBe('no-store, no-cache, must-revalidate')
      expect(response.headers.get('X-Generation-Time')).toBe('2500')
    })
  })

  describe('Error Handling', () => {
    it('should handle PDF generation failures', async () => {
      const validBody = {
        config: {
          layout: 'standard',
          topic: 'Addition',
          subtopic: 'Single Digit',
          difficulty: 'easy',
          questionCount: 5,
          yearGroup: 'Year 2',
          studentNames: []
        },
        generatedContent: 'Test content',
        title: 'Test Worksheet'
      }

      const { generateWorksheetPdf } = await import('@/lib/services/pdfGenerationService')
      vi.mocked(generateWorksheetPdf).mockResolvedValue({
        success: false,
        filename: '',
        error: 'PDF generation failed due to Chrome launch error',
        generationTime: 1000
      })

      const request = createMockRequest(validBody)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toContain('PDF generation failed')
      expect(data.generationTime).toBe(1000)
    })

    it('should handle rate limiting with proper status code', async () => {
      const validBody = {
        config: {
          layout: 'standard',
          topic: 'Addition',
          subtopic: 'Single Digit',
          difficulty: 'easy',
          questionCount: 5,
          yearGroup: 'Year 2',
          studentNames: []
        },
        generatedContent: 'Test content',
        title: 'Test Worksheet'
      }

      const { generateWorksheetPdf } = await import('@/lib/services/pdfGenerationService')
      vi.mocked(generateWorksheetPdf).mockResolvedValue({
        success: false,
        filename: '',
        error: 'Rate limit exceeded. Maximum 5 PDFs per 3 minutes.',
        generationTime: 100
      })

      const request = createMockRequest(validBody)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(429)
      expect(data.error).toContain('Rate limit exceeded')
    })

    it('should handle service exceptions', async () => {
      const validBody = {
        config: {
          layout: 'standard',
          topic: 'Addition',
          subtopic: 'Single Digit',
          difficulty: 'easy',
          questionCount: 5,
          yearGroup: 'Year 2',
          studentNames: []
        },
        generatedContent: 'Test content',
        title: 'Test Worksheet'
      }

      const { generateWorksheetPdf } = await import('@/lib/services/pdfGenerationService')
      vi.mocked(generateWorksheetPdf).mockRejectedValue(new Error('Unexpected service error'))

      const request = createMockRequest(validBody)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toContain('Internal server error')
    })
  })

  describe('HTTP Methods', () => {
    it('should reject GET requests', async () => {
      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(405)
      expect(data.error).toContain('Method not allowed')
    })
  })

  describe('Privacy and Logging', () => {
    it('should not include personal data in error responses', async () => {
      const bodyWithPersonalData = {
        config: {
          layout: 'standard',
          topic: 'Addition',
          subtopic: 'Single Digit',
          difficulty: 'easy',
          questionCount: 5,
          yearGroup: 'Year 2',
          studentNames: ['Alice Johnson', 'Bob Smith'] // Personal data
        },
        generatedContent: 'Test content with student names: Alice, Bob',
        title: 'Test Worksheet'
      }

      const { generateWorksheetPdf } = await import('@/lib/services/pdfGenerationService')
      vi.mocked(generateWorksheetPdf).mockResolvedValue({
        success: false,
        filename: '',
        error: 'Generation failed',
        generationTime: 1000
      })

      const request = createMockRequest(bodyWithPersonalData)
      const response = await POST(request)
      const data = await response.json()

      // Error response should not contain student names
      expect(JSON.stringify(data)).not.toContain('Alice')
      expect(JSON.stringify(data)).not.toContain('Bob')
    })
  })
})