import { NextRequest, NextResponse } from 'next/server'
import { browseLibraryWorksheets } from '@/lib/services/libraryService'
import type { LibraryFilters } from '@/lib/types/library'

export const revalidate = 3600

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters: LibraryFilters = {
      year_group: searchParams.get('year_group') || undefined,
      topic: searchParams.get('topic') || undefined,
      subtopic: searchParams.get('subtopic') || undefined,
      visual_theme: searchParams.get('visual_theme') || undefined,
      activity_type: searchParams.get('activity_type') || undefined,
      seasonal_theme: searchParams.get('seasonal_theme') || undefined,
      search: searchParams.get('q') || undefined,
      sort_by: (searchParams.get('sort') as any) || 'newest',
      limit: parseInt(searchParams.get('limit') || '20'),
      offset: parseInt(searchParams.get('page') || '0') * 20,
    }

    const result = await browseLibraryWorksheets(filters)

    return NextResponse.json(result)

  } catch (error) {
    console.error('❌ Browse library failed:', error)

    return NextResponse.json(
      {
        error: 'Failed to browse library',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
