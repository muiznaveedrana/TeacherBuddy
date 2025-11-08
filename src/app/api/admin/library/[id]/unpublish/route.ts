import { NextRequest, NextResponse } from 'next/server'
import { unpublishWorksheet } from '@/lib/services/libraryService'
import { requireAdmin } from '@/lib/auth/authHelpers'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Require admin authentication
    await requireAdmin()

    const worksheet = await unpublishWorksheet(params.id)

    return NextResponse.json({
      success: true,
      worksheet,
      message: 'Worksheet unpublished successfully',
    })

  } catch (error) {
    console.error('❌ Failed to unpublish worksheet:', error)

    // Check if it's an auth error
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          details: 'Admin access required',
        },
        { status: 401 }
      )
    }

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
