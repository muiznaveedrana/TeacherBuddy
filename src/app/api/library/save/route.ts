import { NextRequest, NextResponse } from 'next/server'
import { createLibraryWorksheet } from '@/lib/services/libraryService'
import { generateWorksheetThumbnail, generateSlugFromTitle } from '@/lib/services/thumbnailGenerationService'
import type { SaveToLibraryMetadata } from '@/lib/types/library'

export async function POST(request: NextRequest) {
  try {
    console.log('📥 Received save to library request')

    const body = await request.json()
    const { worksheetHtml, metadata }: {
      worksheetHtml: string
      metadata: SaveToLibraryMetadata
    } = body

    if (!worksheetHtml || !metadata) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('📝 Metadata:', metadata)

    const slug = metadata.slug || generateSlugFromTitle(
      metadata.title,
      metadata.visual_theme,
      metadata.activity_type,
      metadata.seasonal_theme,
      metadata.layout_type,
      metadata.worksheet_version
    )
    console.log('🔗 Generated slug:', slug)

    console.log('📸 Generating thumbnail...')
    const thumbnailUrl = await generateWorksheetThumbnail(worksheetHtml, slug)
    console.log('✅ Thumbnail URL:', thumbnailUrl)

    const seoTitle = metadata.seo_title ||
      `${metadata.title} - Free Printable ${metadata.year_group} Worksheet`

    const seoDescription = metadata.seo_description ||
      `Download free ${metadata.year_group} ${metadata.topic} worksheet` +
      (metadata.visual_theme ? ` featuring ${metadata.visual_theme}` : '') +
      (metadata.activity_type ? `. ${metadata.activity_type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} activity` : '') +
      (metadata.seasonal_theme ? ` - ${metadata.seasonal_theme.charAt(0).toUpperCase() + metadata.seasonal_theme.slice(1)} themed` : '') +
      `. Perfect for classroom or home learning.`

    const seoKeywords = metadata.seo_keywords || [
      metadata.year_group.toLowerCase(),
      metadata.topic.toLowerCase(),
      metadata.subtopic.toLowerCase(),
      ...(metadata.visual_theme ? [metadata.visual_theme.toLowerCase()] : []),
      ...(metadata.activity_type ? [metadata.activity_type.toLowerCase()] : []),
      ...(metadata.seasonal_theme ? [metadata.seasonal_theme.toLowerCase()] : []),
      'worksheet',
      'free',
      'printable',
      'educational',
    ]

    const tags = metadata.tags || [
      metadata.year_group.toLowerCase().replace(/\s+/g, '-'),
      metadata.topic.toLowerCase().replace(/\s+/g, '-'),
      ...(metadata.visual_theme ? [metadata.visual_theme.toLowerCase().replace(/\s+/g, '-')] : []),
      ...(metadata.activity_type ? [metadata.activity_type.toLowerCase().replace(/\s+/g, '-')] : []),
      ...(metadata.seasonal_theme ? [metadata.seasonal_theme.toLowerCase().replace(/\s+/g, '-')] : []),
      'free',
      'printable',
    ]

    console.log('💾 Saving to database...')
    const worksheet = await createLibraryWorksheet({
      title: metadata.title,
      html_content: worksheetHtml,
      year_group: metadata.year_group,
      topic: metadata.topic,
      subtopic: metadata.subtopic,
      layout_type: metadata.layout_type,
      thumbnail_url: thumbnailUrl,
      seo_title: seoTitle,
      seo_description: seoDescription,
      seo_keywords: seoKeywords,
      quality_score: metadata.quality_score,
      tags,
      visual_theme: metadata.visual_theme,
      activity_type: metadata.activity_type,
      seasonal_theme: metadata.seasonal_theme,
      worksheet_version: metadata.worksheet_version,
      status: 'draft',
    })

    console.log('✅ Worksheet saved to library:', worksheet.id)

    return NextResponse.json(
      {
        success: true,
        worksheet: {
          id: worksheet.id,
          slug: worksheet.slug,
          title: worksheet.title,
          thumbnail_url: worksheet.thumbnail_url,
          status: worksheet.status,
        },
        message: 'Worksheet saved to library as draft',
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('❌ Failed to save worksheet:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save worksheet',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
