import { NextRequest, NextResponse } from 'next/server'
import { getRelatedWorksheetsById } from '@/lib/services/relatedWorksheetService'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const worksheetId = params.id
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '8')

    const worksheets = await getRelatedWorksheetsById(worksheetId, limit)

    return NextResponse.json({
      worksheets,
      total: worksheets.length
    })

  } catch (error) {
    console.error('❌ Failed to fetch related worksheets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch related worksheets' },
      { status: 500 }
    )
  }
}
