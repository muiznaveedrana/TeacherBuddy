import { NextRequest, NextResponse } from 'next/server'
import { getWorksheetBySlug, recordDownload } from '@/lib/services/libraryService'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  let browser = null

  try {
    const { worksheetId, slug } = await request.json()

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

    browser = await puppeteer.launch({
      executablePath: await chromium.executablePath(),
      args: chromium.args,
      headless: true,
    })

    const page = await browser.newPage()

    await page.setContent(worksheet.html_content, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    })

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm',
      },
    })

    await browser.close()
    browser = null

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

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${slug}.pdf"`,
        'Cache-Control': 'public, max-age=86400',
      },
    })

  } catch (error) {
    console.error('❌ PDF download failed:', error)
    if (browser) await browser.close()

    return NextResponse.json(
      {
        error: 'Failed to generate PDF',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
