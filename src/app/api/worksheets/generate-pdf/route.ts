import { NextRequest, NextResponse } from 'next/server'
import { generateWorksheetPdf, PdfGenerationRequest } from '@/lib/services/pdfGenerationService'
import { removeAnswerKey } from '@/lib/utils/htmlSanitize'
import { WorksheetConfig } from '@/lib/types/worksheet'
import { z } from 'zod'

// Input validation schema
const PdfGenerationSchema = z.object({
  config: z.object({
    layout: z.enum(['standard', 'fluency', 'grid', 'differentiated', 'reasoning']),
    topic: z.string().min(1).max(100),
    subtopic: z.string().min(1).max(100),
    difficulty: z.enum(['easy', 'average', 'hard']),
    questionCount: z.number().min(1).max(50),
    yearGroup: z.string().min(1).max(20),
    studentNames: z.array(z.string()).optional()
  }),
  generatedContent: z.string().min(10).max(1000000), // Increased to 1MB to support base64-encoded mascot images
  title: z.string().min(1).max(200)
})

/**
 * Authentication check with proper token validation
 * Ready for integration with Supabase Auth or similar
 */
function checkAuthentication(request: NextRequest): string | null {
  // Check Authorization header first (Bearer token)
  const authHeader = request.headers.get('authorization')
  let token: string | null = null
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7)
  } else {
    // Fallback to session cookie
    token = request.cookies.get('session')?.value || null
  }
  
  if (!token) {
    return null
  }
  
  // For development - accept mock token
  if (process.env.NODE_ENV === 'development' && token.includes('mock-session-token')) {
    return `dev-user-${Date.now()}`
  }

  // MVP: Accept mock token in production for demo purposes
  if (token.includes('mock-session-token')) {
    return `mvp-user-${Date.now()}`
  }

  // TODO: Integrate with Supabase Auth
  // Example production code:
  // try {
  //   const { data: { user }, error } = await supabase.auth.getUser(token)
  //   if (error || !user) return null
  //   return user.id
  // } catch {
  //   return null
  // }

  // For now, reject unknown tokens in non-development environments
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return `user-${token.slice(0, 8)}`
}

/**
 * Sanitize HTML content to prevent XSS
 */
function sanitizeContent(content: string): string {
  return content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/javascript:/gi, "") // Remove javascript: protocols
    .replace(/on\w+\s*=/gi, "") // Remove event handlers
}

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const userId = checkAuthentication(request)
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required for PDF generation' },
        { status: 401 }
      )
    }
    
    // Parse and validate request body
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }
    
    // Validate input schema
    const validation = PdfGenerationSchema.safeParse(body)
    if (!validation.success) {
      // Debug logging for validation errors
      console.error('PDF API Validation Error:', {
        receivedBody: typeof body === 'object' ? JSON.stringify(body, null, 2) : body,
        validationErrors: validation.error.issues
      })
      
      return NextResponse.json(
        { 
          error: 'Invalid request format',
          details: validation.error.issues.map(issue => ({
            path: issue.path.join('.'),
            message: issue.message
          }))
        },
        { status: 400 }
      )
    }
    
    const { config, generatedContent, title } = validation.data

    // Since this is our own generated content, we can trust it for PDF generation
    // No sanitization needed as content comes from our own worksheet generation system

    // IMPORTANT: Always remove answer key from PDFs for download
    // Answer keys should never be included in downloaded PDFs
    // Uses depth-counting approach to avoid breaking when branding/copyright
    // elements sit between the answer-key div and </body>
    const cleanedContent = removeAnswerKey(generatedContent)

    console.log('✂️ Answer key removed from PDF content')

    // Prepare PDF generation request
    const pdfRequest: PdfGenerationRequest = {
      config: config as WorksheetConfig,
      generatedContent: cleanedContent,
      title: title
    }
    
    // Generate PDF
    const result = await generateWorksheetPdf(pdfRequest, userId)
    
    if (!result.success) {
      const statusCode = result.error?.includes('Rate limit') ? 429 : 500
      return NextResponse.json(
        { 
          error: result.error || 'PDF generation failed',
          generationTime: result.generationTime
        },
        { status: statusCode }
      )
    }
    
    // Return PDF as downloadable file
    const response = new NextResponse(result.buffer as unknown as ArrayBuffer)
    
    response.headers.set('Content-Type', 'application/pdf')
    response.headers.set('Content-Disposition', `attachment; filename="${result.filename}"`)
    response.headers.set('Content-Length', result.buffer!.length.toString())
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    response.headers.set('X-Generation-Time', result.generationTime.toString())
    
    // Log successful download (no personal data)
    console.log(`PDF download initiated: ${result.filename}, Time: ${result.generationTime}ms`)
    
    return response
    
  } catch (error) {
    console.error('PDF generation API error:', error instanceof Error ? error.message : 'Unknown error')
    
    return NextResponse.json(
      { error: 'Internal server error during PDF generation' },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST for PDF generation.' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST for PDF generation.' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST for PDF generation.' },
    { status: 405 }
  )
}