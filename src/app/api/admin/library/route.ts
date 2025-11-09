import { NextRequest, NextResponse } from 'next/server'
import { getAllWorksheetsForAdmin } from '@/lib/services/libraryService'
import { requireAdmin } from '@/lib/auth/authHelpers'
import type { LibraryFilters } from '@/lib/types/library'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Require admin authentication
    await requireAdmin()

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

    // Check if it's an auth error
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          details: 'Admin access required',
        },
        { status: 401 }
      )
    }

    return NextResponse.json(
      {
        error: 'Failed to fetch admin worksheets',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
