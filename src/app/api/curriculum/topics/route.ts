import { NextRequest, NextResponse } from 'next/server'
import { getAvailableTopics } from '@/lib/data/curriculum'

export const dynamic = 'force-dynamic'

/**
 * GET /api/curriculum/topics?yearGroup=Year3
 * Returns available topics for a specific year group
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const yearGroup = searchParams.get('yearGroup')
    
    if (!yearGroup) {
      return NextResponse.json(
        { error: 'Year group is required' },
        { status: 400 }
      )
    }
    
    const topics = getAvailableTopics(yearGroup)
    
    return NextResponse.json({
      success: true,
      yearGroup,
      topics
    })
  } catch (error) {
    console.error('Error fetching curriculum topics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch topics' },
      { status: 500 }
    )
  }
}