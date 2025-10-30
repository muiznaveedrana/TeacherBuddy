import { NextRequest } from 'next/server'
import { generateWorksheetStreaming } from '@/lib/services/gemini'
import { WorksheetConfig, LayoutType, VisualTheme } from '@/lib/types/worksheet'
import { validateWorksheetRequest, sanitizeWorksheetRequest } from '@/lib/utils/validation'

// Mock name lists data (same as generate-worksheet/route.ts)
const mockNameLists: Record<string, string[]> = {
  'year3-class-a': ['Emma', 'Oliver', 'Sophie', 'James', 'Lily', 'Thomas', 'Grace', 'Harry', 'Charlotte', 'William', 'Amelia', 'Jack', 'Isabella', 'George', 'Ava', 'Noah', 'Mia', 'Lucas', 'Evie', 'Oscar', 'Poppy', 'Leo', 'Freya', 'Max', 'Alice'],
  'year4-maths-group': ['Alfie', 'Daisy', 'Charlie', 'Ruby', 'Jacob', 'Isla', 'Arthur', 'Emily', 'Henry', 'Ella', 'Freddie', 'Scarlett', 'Archie', 'Chloe', 'Theo', 'Maisie', 'Logan', 'Maya'],
  'reception-class': ['Teddy', 'Luna', 'Finn', 'Ivy', 'Reuben', 'Willow', 'Jude', 'Aria', 'Ezra', 'Bonnie', 'Arlo', 'Delilah', 'Felix', 'Aurora', 'Jasper', 'Hazel', 'Casper', 'Iris', 'Rowan', 'Sage']
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Parse and sanitize request body
    const rawBody = await request.json()
    const sanitizedBody = sanitizeWorksheetRequest(rawBody)

    // Comprehensive validation
    const validation = validateWorksheetRequest(sanitizedBody)
    if (!validation.isValid) {
      // Return error as SSE event
      const encoder = new TextEncoder()
      const errorData = JSON.stringify({
        type: 'error',
        error: 'Validation failed',
        message: validation.errors.map(e => `${e.field}: ${e.message}`).join('; '),
        timestamp: new Date().toISOString()
      })

      return new Response(encoder.encode(`data: ${errorData}\n\n`), {
        status: 400,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      })
    }

    const {
      layout,
      topic,
      subtopic,
      difficulty,
      questionCount,
      nameList,
      yearGroup,
      visualTheme,
      previousWorksheets
    } = sanitizedBody as {
      layout: string
      topic: string
      subtopic: string
      difficulty: 'easy' | 'average' | 'hard'
      questionCount: number
      nameList: string
      yearGroup: string
      visualTheme?: VisualTheme
      previousWorksheets?: Array<{ questions: string[]; images: string[] }>
    }

    // Debug: Check previousWorksheets value
    console.log('🔍 [API] previousWorksheets received:', previousWorksheets ? `${previousWorksheets.length} worksheets` : 'undefined/null');
    if (previousWorksheets && previousWorksheets.length > 0) {
      console.log('🔍 [API] Previous worksheet data:', JSON.stringify(previousWorksheets, null, 2));
    }

    // Validate yearGroup is provided
    if (!yearGroup) {
      const encoder = new TextEncoder()
      const errorData = JSON.stringify({
        type: 'error',
        error: 'Validation failed',
        message: 'Year Group is required for age-appropriate worksheet generation',
        timestamp: new Date().toISOString()
      })

      return new Response(encoder.encode(`data: ${errorData}\n\n`), {
        status: 400,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      })
    }

    // Get student names
    let studentNames: string[] = []
    if (nameList && nameList.trim() !== '') {
      studentNames = mockNameLists[nameList] || []
      if (studentNames.length === 0) {
        const encoder = new TextEncoder()
        const errorData = JSON.stringify({
          type: 'error',
          error: 'Invalid name list',
          message: 'The specified name list was not found or is empty',
          timestamp: new Date().toISOString()
        })

        return new Response(encoder.encode(`data: ${errorData}\n\n`), {
          status: 400,
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
          }
        })
      }
    } else {
      studentNames = ['Emma', 'Oliver', 'Sophie', 'James', 'Lily', 'Thomas', 'Grace', 'Harry']
    }

    // Validate layout parameter
    if (!layout || typeof layout !== 'string') {
      const encoder = new TextEncoder()
      const errorData = JSON.stringify({
        type: 'error',
        error: 'Validation failed',
        message: 'Layout selection is required',
        timestamp: new Date().toISOString()
      })

      return new Response(encoder.encode(`data: ${errorData}\n\n`), {
        status: 400,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      })
    }

    // Create worksheet configuration
    const config: WorksheetConfig = {
      layout: layout as LayoutType,
      topic,
      subtopic,
      difficulty,
      questionCount,
      yearGroup,
      studentNames,
      visualTheme: visualTheme || undefined
    }

    // Create Server-Sent Events stream
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          console.log('🌊 SSE: Starting streaming generation...')

          // Send initial status event
          const startEvent = JSON.stringify({
            type: 'start',
            message: 'Starting worksheet generation...',
            timestamp: new Date().toISOString()
          })
          controller.enqueue(encoder.encode(`data: ${startEvent}\n\n`))

          // Generate worksheet with streaming and progress callbacks
          const worksheet = await generateWorksheetStreaming(config, {
            previousWorksheets,
            onProgress: (partialHtml) => {
              // Send progress event with partial HTML
              const progressEvent = JSON.stringify({
                type: 'progress',
                html: partialHtml,
                timestamp: new Date().toISOString()
              })
              controller.enqueue(encoder.encode(`data: ${progressEvent}\n\n`))
              console.log(`🌊 SSE: Sent ${partialHtml.length} chars to client`)
            }
          })

          const generationTime = Date.now() - startTime

          // Send completion event with full worksheet
          const completeEvent = JSON.stringify({
            type: 'complete',
            worksheet: worksheet,
            generationTime,
            timestamp: new Date().toISOString()
          })
          controller.enqueue(encoder.encode(`data: ${completeEvent}\n\n`))

          console.log(`✅ SSE: Streaming complete in ${generationTime}ms`)

          // Close the stream
          controller.close()

        } catch (error) {
          const generationTime = Date.now() - startTime
          console.error('❌ SSE: Streaming generation error:', error)

          // Send error event
          const errorEvent = JSON.stringify({
            type: 'error',
            error: 'Generation failed',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
            generationTime,
            timestamp: new Date().toISOString()
          })
          controller.enqueue(encoder.encode(`data: ${errorEvent}\n\n`))

          // Close the stream
          controller.close()
        }
      }
    })

    // Return SSE response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no' // Disable nginx buffering
      }
    })

  } catch (error) {
    const generationTime = Date.now() - startTime
    console.error('❌ SSE: Request processing error:', error)

    const encoder = new TextEncoder()
    const errorData = JSON.stringify({
      type: 'error',
      error: 'Request failed',
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
      generationTime,
      timestamp: new Date().toISOString()
    })

    return new Response(encoder.encode(`data: ${errorData}\n\n`), {
      status: 500,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    })
  }
}

// Handle unsupported methods
export async function GET() {
  const encoder = new TextEncoder()
  const errorData = JSON.stringify({
    type: 'error',
    error: 'Method not allowed',
    message: 'Use POST to generate worksheets with streaming',
    timestamp: new Date().toISOString()
  })

  return new Response(encoder.encode(`data: ${errorData}\n\n`), {
    status: 405,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  })
}

// Add OPTIONS method for CORS support
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Allow': 'POST',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}
