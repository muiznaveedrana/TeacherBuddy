import { NextRequest, NextResponse } from 'next/server'
import { generateWorksheet, generateWorksheetStreaming } from '@/lib/services/gemini'
import { WorksheetConfig, WorksheetGenerationResult, LayoutType, VisualTheme } from '@/lib/types/worksheet'
import { validateWorksheetRequest, sanitizeWorksheetRequest } from '@/lib/utils/validation'

export async function POST(request: NextRequest): Promise<NextResponse<WorksheetGenerationResult>> {
  const startTime = Date.now()
  
  try {
    // Parse and sanitize request body
    const rawBody = await request.json()
    const sanitizedBody = sanitizeWorksheetRequest(rawBody)

    // Comprehensive validation
    const validation = validateWorksheetRequest(sanitizedBody)
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        message: validation.errors.map(e => `${e.field}: ${e.message}`).join('; '),
        generationTime: Date.now() - startTime,
        timestamp: new Date().toISOString()
      }, { status: 400 })
    }

    const {
      layout,
      topic,
      subtopic,
      difficulty,
      questionCount,
      yearGroup,
      // Enhanced configuration options (USP.2)
      visualTheme,
      // Freshness tracking (cross-iteration)
      previousWorksheets
    } = sanitizedBody as {
      layout: string
      topic: string
      subtopic: string
      difficulty: 'easy' | 'average' | 'hard'
      questionCount: number
      yearGroup: string
      // Enhanced options (optional)
      visualTheme?: VisualTheme
      // Freshness tracking (optional)
      previousWorksheets?: Array<{ questions: string[]; images: string[] }>
    }

    // 🔍 FRESHNESS DEBUG: Log received previousWorksheets data
    console.log('🔍 API Route: Received previousWorksheets:', previousWorksheets?.length || 0, 'worksheets')
    if (previousWorksheets && previousWorksheets.length > 0) {
      console.log('🔍 First previous worksheet sample:')
      console.log('  - Questions:', previousWorksheets[0].questions.slice(0, 2))
      console.log('  - Images:', previousWorksheets[0].images.slice(0, 3))
    }
    
    // Validate yearGroup is provided
    if (!yearGroup) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        message: 'Year Group is required for age-appropriate worksheet generation',
        generationTime: Date.now() - startTime,
        timestamp: new Date().toISOString()
      }, { status: 400 })
    }

    // Use default student names for personalization
    const studentNames: string[] = ['Emma', 'Oliver', 'Sophie', 'James', 'Lily', 'Thomas', 'Grace', 'Harry']

    // Validate layout parameter
    if (!layout || typeof layout !== 'string') {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        message: 'Layout selection is required',
        generationTime: Date.now() - startTime,
        timestamp: new Date().toISOString()
      }, { status: 400 })
    }

    // Create worksheet configuration with explicit undefined handling
    const config: WorksheetConfig = {
      layout: layout as LayoutType,
      topic,
      subtopic,
      difficulty,
      questionCount,
      yearGroup,
      studentNames,
      // Enhanced configuration options (USP.2) 
      // Unified Service: These drive the consolidated prompt generation system
      visualTheme: visualTheme || undefined
    }

    // Generate worksheet using Gemini AI with STREAMING for better UX
    // Uses generateWorksheetStreaming() which delivers first content in 5-6s vs 30s
    const worksheet = await generateWorksheetStreaming(config, { previousWorksheets })
    const generationTime = Date.now() - startTime

    // Quality tracking - validate worksheet meets requirements
    console.log('✅ Worksheet generated successfully (streaming)')

    // Log performance for monitoring (Unified Service)
    const hasEnhanced = !!(visualTheme)
    console.log(`Unified PromptService worksheet generated in ${generationTime}ms`, {
      topic,
      subtopic,
      yearGroup,
      enhancedSystem: hasEnhanced,
      ...(hasEnhanced && {
        visualTheme: visualTheme || 'none'
      })
    })

    // Return successful response
    return NextResponse.json({
      success: true,
      worksheet,
      generationTime,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    const generationTime = Date.now() - startTime
    console.error('Worksheet generation error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      generationTime,
      timestamp: new Date().toISOString()
    })
    
    // Return appropriate error response with consistent structure
    return NextResponse.json({
      success: false,
      error: 'Generation failed',
      message: error instanceof Error ? error.message : 'An unexpected error occurred during worksheet generation',
      generationTime,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

// Handle unsupported methods
export async function GET(): Promise<NextResponse<WorksheetGenerationResult>> {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed',
    message: 'Use POST to generate worksheets',
    generationTime: 0,
    timestamp: new Date().toISOString()
  }, { status: 405 })
}

// Add OPTIONS method for CORS support
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Allow': 'POST',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}