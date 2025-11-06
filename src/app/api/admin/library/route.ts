import { NextRequest, NextResponse } from 'next/server'
import { getAllWorksheetsForAdmin } from '@/lib/services/libraryService'
import type { LibraryFilters } from '@/lib/types/library'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters: Partial<LibraryFilters> = {
      year_group: searchParams.get('year_group') || undefined,
      topic: searchParams.get('topic') || undefined,
      search: searchParams.get('q') || undefined,
      sort_by: (searchParams.get('sort') as any) || 'newest',
      limit: parseInt(searchParams.get('limit') || '50'),
      offset: parseInt(searchParams.get('page') || '0') * 50,
    }

    const result = await getAllWorksheetsForAdmin(filters)

    return NextResponse.json(result)

  } catch (error) {
    console.error('❌ Admin browse failed:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch admin worksheets',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
