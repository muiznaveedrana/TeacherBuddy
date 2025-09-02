import { describe, it, expect, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { POST, GET } from '@/app/api/generate-worksheet/route'

// Mock the Gemini AI service
vi.mock('@/lib/services/gemini', () => ({
  generateWorksheet: vi.fn().mockResolvedValue({
    title: 'Number and Operations - Addition and Subtraction Worksheet',
    html: '<div class="worksheet-container"><header class="worksheet-header"><h1>Mathematics Worksheet</h1></header></div>',
    metadata: {
      topic: 'Number and Operations',
      subtopic: 'Addition and Subtraction',
      difficulty: 'easy',
      questionCount: 5,
      curriculum: 'UK National Curriculum',
      generatedAt: '2025-01-01T00:00:00.000Z'
    }
  })
}))

describe('/api/generate-worksheet', () => {
  it('should generate worksheet with valid configuration', async () => {
    const request = new NextRequest('http://localhost/api/generate-worksheet', {
      method: 'POST',
      body: JSON.stringify({
        topic: 'number-operations',
        subtopic: 'addition-subtraction',
        difficulty: 'easy',
        questionCount: 10,
        nameList: 'year3-class-a'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.worksheet).toBeDefined()
    expect(data.worksheet.title).toBe('Number and Operations - Addition and Subtraction Worksheet')
    expect(data.worksheet.html).toContain('worksheet-container')
    expect(data.generationTime).toBeDefined()
  })

  it('should return 400 for missing required fields', async () => {
    const request = new NextRequest('http://localhost/api/generate-worksheet', {
      method: 'POST',
      body: JSON.stringify({
        topic: 'number-operations'
        // Missing other required fields
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Validation failed')
  })

  it('should return 400 for invalid difficulty level', async () => {
    const request = new NextRequest('http://localhost/api/generate-worksheet', {
      method: 'POST',
      body: JSON.stringify({
        topic: 'number-operations',
        subtopic: 'addition-subtraction',
        difficulty: 'invalid',
        questionCount: 10,
        nameList: 'year3-class-a'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Validation failed')
  })

  it('should return 400 for invalid question count', async () => {
    const request = new NextRequest('http://localhost/api/generate-worksheet', {
      method: 'POST',
      body: JSON.stringify({
        topic: 'number-operations',
        subtopic: 'addition-subtraction',
        difficulty: 'easy',
        questionCount: 50, // Too high
        nameList: 'year3-class-a'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Validation failed')
  })

  it('should return 400 for invalid name list', async () => {
    const request = new NextRequest('http://localhost/api/generate-worksheet', {
      method: 'POST',
      body: JSON.stringify({
        topic: 'number-operations',
        subtopic: 'addition-subtraction',
        difficulty: 'easy',
        questionCount: 10,
        nameList: 'invalid-list'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid name list')
  })

  it('should return 405 for GET request', async () => {
    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(405)
    expect(data.error).toBe('Method not allowed')
  })
})