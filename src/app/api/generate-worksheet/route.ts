import { NextRequest, NextResponse } from 'next/server'
import { generateWorksheet } from '@/lib/services/gemini'
import { WorksheetConfig, WorksheetGenerationResult } from '@/lib/types/worksheet'
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

    const { topic, subtopic, difficulty, questionCount, nameList, yearGroup } = sanitizedBody as {
      topic: string
      subtopic: string
      difficulty: 'easy' | 'average' | 'hard'
      questionCount: number
      nameList: string
      yearGroup: string
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

    // Get student names from selected name list
    const studentNames = mockNameLists[nameList] || []
    if (studentNames.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Invalid name list',
        message: 'The specified name list was not found or is empty',
        generationTime: Date.now() - startTime,
        timestamp: new Date().toISOString()
      }, { status: 400 })
    }

    // Create worksheet configuration
    const config: WorksheetConfig = {
      topic,
      subtopic,
      difficulty,
      questionCount,
      yearGroup,
      studentNames
    }

    // Generate worksheet using Gemini AI
    const worksheet = await generateWorksheet(config)
    const generationTime = Date.now() - startTime

    // Log performance for monitoring
    console.log(`Worksheet generated in ${generationTime}ms for topic: ${topic}, subtopic: ${subtopic}`)

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