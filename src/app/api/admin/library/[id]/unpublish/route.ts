import { NextRequest, NextResponse } from 'next/server'
import { unpublishWorksheet } from '@/lib/services/libraryService'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const worksheet = await unpublishWorksheet(params.id)

    return NextResponse.json({
      success: true,
      worksheet,
      message: 'Worksheet unpublished successfully',
    })

  } catch (error) {
    console.error('❌ Failed to unpublish worksheet:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to unpublish worksheet',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
