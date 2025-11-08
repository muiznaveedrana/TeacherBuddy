import { NextRequest, NextResponse } from 'next/server'
import { parseSearchQueryWithCache } from '@/lib/services/aiSearchService'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    // Trim and validate
    const trimmedQuery = query.trim()
    if (trimmedQuery.length < 2) {
      return NextResponse.json(
        { error: 'Query too short' },
        { status: 400 }
      )
    }

    // Parse query using AI
    const parsed = await parseSearchQueryWithCache(trimmedQuery)

    return NextResponse.json({
      success: true,
      query: trimmedQuery,
      parsed,
    })

  } catch (error) {
    console.error('❌ AI search API failed:', error)

    return NextResponse.json(
      {
        error: 'Failed to parse search query',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
