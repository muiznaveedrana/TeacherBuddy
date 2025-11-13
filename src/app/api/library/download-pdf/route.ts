import { NextRequest, NextResponse } from 'next/server'
import { getWorksheetBySlug, recordDownload } from '@/lib/services/libraryService'
import { generateWorksheetPdf } from '@/lib/services/pdfGenerationService'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { worksheetId, slug, customHtml } = await request.json()

    if (!worksheetId && !slug) {
      return NextResponse.json(
        { error: 'worksheetId or slug required' },
        { status: 400 }
      )
    }

    const worksheet = await getWorksheetBySlug(slug)

    if (!worksheet) {
      return NextResponse.json(
        { error: 'Worksheet not found' },
        { status: 404 }
      )
    }

    console.log('📄 Generating PDF for:', worksheet.title)

    // Use custom HTML if provided (from editor with mascots already injected), otherwise use library version
    const htmlContent = customHtml || worksheet.html_content

    // Use the proven PDF generation service (same as create/dashboard)
    const result = await generateWorksheetPdf(
      {
        config: {
          layout: worksheet.layout || 'standard',
          topic: worksheet.topic,
          subtopic: worksheet.subtopic,
          difficulty: worksheet.difficulty || 'average',
          questionCount: worksheet.question_count || 10,
          yearGroup: worksheet.year_group,
        },
        generatedContent: htmlContent,
        title: worksheet.title,
      },
      'library-download' // userId for rate limiting
    )

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'PDF generation failed' },
        { status: 500 }
      )
    }

    // Record download analytics
    const userAgent = request.headers.get('user-agent') || undefined
    const ipHash = crypto
      .createHash('sha256')
      .update(request.headers.get('x-forwarded-for') || 'unknown')
      .digest('hex')

    await recordDownload(worksheet.id, {
      userAgent,
      ipHash,
      referrer: request.headers.get('referer') || undefined,
    })

    return new NextResponse(result.buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${slug}.pdf"`,
        'Cache-Control': 'public, max-age=86400',
      },
    })

  } catch (error) {
    console.error('❌ PDF download failed:', error)

    return NextResponse.json(
      {
        error: 'Failed to generate PDF',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
