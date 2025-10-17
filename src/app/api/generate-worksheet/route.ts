import { NextRequest, NextResponse } from 'next/server'
import { generateWorksheet, generateWorksheetStreaming } from '@/lib/services/gemini'
import { WorksheetConfig, WorksheetGenerationResult, LayoutType, VisualTheme } from '@/lib/types/worksheet'
import { validateWorksheetRequest, sanitizeWorksheetRequest } from '@/lib/utils/validation'

// Mock name lists data (will eventually come from database)
const mockNameLists: Record<string, string[]> = {
  'year3-class-a': ['Emma', 'Oliver', 'Sophie', 'James', 'Lily', 'Thomas', 'Grace', 'Harry', 'Charlotte', 'William', 'Amelia', 'Jack', 'Isabella', 'George', 'Ava', 'Noah', 'Mia', 'Lucas', 'Evie', 'Oscar', 'Poppy', 'Leo', 'Freya', 'Max', 'Alice'],
  'year4-maths-group': ['Alfie', 'Daisy', 'Charlie', 'Ruby', 'Jacob', 'Isla', 'Arthur', 'Emily', 'Henry', 'Ella', 'Freddie', 'Scarlett', 'Archie', 'Chloe', 'Theo', 'Maisie', 'Logan', 'Maya'],
  'reception-class': ['Teddy', 'Luna', 'Finn', 'Ivy', 'Reuben', 'Willow', 'Jude', 'Aria', 'Ezra', 'Bonnie', 'Arlo', 'Delilah', 'Felix', 'Aurora', 'Jasper', 'Hazel', 'Casper', 'Iris', 'Rowan', 'Sage']
}

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
      nameList,
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
      nameList: string
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

    // Get student names from selected name list or use generic names when not specified
    let studentNames: string[] = []
    if (nameList && nameList.trim() !== '') {
      studentNames = mockNameLists[nameList] || []
      if (studentNames.length === 0) {
        return NextResponse.json({
          success: false,
          error: 'Invalid name list',
          message: 'The specified name list was not found or is empty',
          generationTime: Date.now() - startTime,
          timestamp: new Date().toISOString()
        }, { status: 400 })
      }
    } else {
      // No specific name list selected - use generic names for LLM to use
      studentNames = ['Emma', 'Oliver', 'Sophie', 'James', 'Lily', 'Thomas', 'Grace', 'Harry']
    }

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
    let worksheet
    let generationTime

    try {
      worksheet = await generateWorksheetStreaming(config, { previousWorksheets })
      generationTime = Date.now() - startTime

      // Quality tracking - validate worksheet meets requirements
      console.log('✅ Worksheet generated successfully (streaming)')

    } catch (error) {
      // Check if this is a retryable error (insufficient questions or non-HTML format)
      const isRetryableError = error instanceof Error && (
        (error.message.includes('Need at least 3 questions') && error.message.includes('Generated worksheet has')) ||
        (error.message.includes('Generated content is not in HTML format'))
      )

      if (isRetryableError) {

        console.log('First attempt failed (insufficient questions or format issues), retrying once...')

        try {
          // One retry attempt (still using streaming)
          worksheet = await generateWorksheetStreaming(config, { previousWorksheets })
          generationTime = Date.now() - startTime
          console.log('Retry successful (streaming)')
        } catch (retryError: any) {
          // If retry also fails, check if we have partial worksheet data
          if (retryError?.metadata?.partialWorksheet) {
            // Accept the partial worksheet from the first attempt
            console.warn(`Accepting partial worksheet with ${retryError.metadata.generatedCount} questions after retry failed`)
            worksheet = retryError.metadata.partialWorksheet
            generationTime = Date.now() - startTime
          } else {
            throw retryError
          }
        }
      } else {
        throw error
      }
    }

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