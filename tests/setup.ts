import { vi } from 'vitest'

// Mock environment variables for tests
process.env.GEMINI_API_KEY = 'test-api-key'

// Mock Next.js server functions
vi.mock('next/server', () => ({
  NextRequest: class NextRequest {
    method: string
    url: string
    body?: any
    headers: Map<string, string>

    constructor(url: string, init?: RequestInit & { body?: any }) {
      this.url = url
      this.method = init?.method || 'GET'
      this.body = init?.body
      this.headers = new Map()
      
      if (init?.headers) {
        Object.entries(init.headers).forEach(([key, value]) => {
          this.headers.set(key.toLowerCase(), value)
        })
      }
    }

    async json() {
      return typeof this.body === 'string' ? JSON.parse(this.body) : this.body
    }
  },
  NextResponse: {
    json: (data: any, init?: { status?: number }) => ({
      status: init?.status || 200,
      json: async () => data,
    }),
  },
}))