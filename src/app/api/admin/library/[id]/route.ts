import { NextRequest, NextResponse } from 'next/server'
import {
  getWorksheetById,
  updateWorksheetMetadata,
  deleteWorksheet,
} from '@/lib/services/libraryService'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const worksheet = await getWorksheetById(params.id)

    if (!worksheet) {
      return NextResponse.json(
        { error: 'Worksheet not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(worksheet)

  } catch (error) {
    console.error('❌ Failed to fetch worksheet:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch worksheet',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json()

    const worksheet = await updateWorksheetMetadata(params.id, updates)

    return NextResponse.json({
      success: true,
      worksheet,
      message: 'Worksheet updated successfully',
    })

  } catch (error) {
    console.error('❌ Failed to update worksheet:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update worksheet',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteWorksheet(params.id)

    return NextResponse.json({
      success: true,
      message: 'Worksheet deleted successfully',
    })

  } catch (error) {
    console.error('❌ Failed to delete worksheet:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete worksheet',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
