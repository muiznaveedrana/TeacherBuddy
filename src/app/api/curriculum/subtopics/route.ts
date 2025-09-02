import { NextRequest, NextResponse } from 'next/server'
import { getAvailableSubtopics } from '@/lib/data/curriculum'

/**
 * GET /api/curriculum/subtopics?yearGroup=Year3&topic=number-place-value
 * Returns available subtopics for a specific year group and topic combination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const yearGroup = searchParams.get('yearGroup')
    const topic = searchParams.get('topic')
    
    if (!yearGroup || !topic) {
      return NextResponse.json(
        { error: 'Both yearGroup and topic are required' },
        { status: 400 }
      )
    }
    
    const subtopics = getAvailableSubtopics(yearGroup, topic)
    
    return NextResponse.json({
      success: true,
      yearGroup,
      topic,
      subtopics
    })
  } catch (error) {
    console.error('Error fetching curriculum subtopics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subtopics' },
      { status: 500 }
    )
  }
}