import { NextRequest, NextResponse } from 'next/server'
import { publishWorksheet } from '@/lib/services/libraryService'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const worksheet = await publishWorksheet(params.id)

    return NextResponse.json({
      success: true,
      worksheet,
      message: 'Worksheet published successfully',
    })

  } catch (error) {
    console.error('❌ Failed to publish worksheet:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to publish worksheet',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
