import { NextRequest, NextResponse } from 'next/server'
import { createLibraryWorksheet } from '@/lib/services/libraryService'
import { generateWorksheetThumbnail, generateSlugFromTitle } from '@/lib/services/thumbnailGenerationService'
import { generateEducationalContent } from '@/lib/services/educationalContentService'
import { normalizeTopicValue, normalizeSubtopicValue } from '@/lib/config/worksheetTaxonomy'
import { yearGroupToUSLabel } from '@/lib/types/hub'
import type { SaveToLibraryMetadata } from '@/lib/types/library'

export const dynamic = 'force-dynamic'

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

    console.log('📚 Generating educational content...')
    const educationalContent = await generateEducationalContent({
      title: metadata.title,
      year_group: metadata.year_group,
      topic: metadata.topic,
      subtopic: metadata.subtopic,
      difficulty: metadata.difficulty,
      question_count: metadata.question_count,
      visual_theme: metadata.visual_theme,
      activity_type: metadata.activity_type,
      seasonal_theme: metadata.seasonal_theme,
    })

    // CRITICAL FIX: Force estimated_time_minutes to be a valid integer
    // Parse strings like "15-30" or "20 minutes" to just the number
    let safeEstimatedTime = educationalContent.estimated_time_minutes
    if (typeof safeEstimatedTime === 'string') {
      // Extract first number from string (handles "15-30", "20 minutes", etc.)
      const match = safeEstimatedTime.match(/\d+/)
      safeEstimatedTime = match ? parseInt(match[0]) : 15 // Default 15 if no number found
    } else if (typeof safeEstimatedTime !== 'number' || isNaN(safeEstimatedTime)) {
      safeEstimatedTime = 15 // Default fallback
    }

    console.log('✅ Educational content generated:', {
      objectives: educationalContent.learning_objectives.length,
      skills: educationalContent.skills_developed.length,
      faq: educationalContent.faq.length,
      estimated_time: safeEstimatedTime,
    })

    // Get US grade equivalent for international SEO
    const usGradeLabel = yearGroupToUSLabel(metadata.year_group)

    // Enhanced SEO title with both UK and US terminology
    const seoTitle = metadata.seo_title ||
      `${metadata.title} - Free Printable ${metadata.year_group} (${usGradeLabel}) Worksheet`

    // Enhanced SEO description with better structure
    const seoDescription = metadata.seo_description ||
      `Download free ${metadata.year_group} (${usGradeLabel}) ${metadata.topic} worksheet` +
      (metadata.visual_theme ? ` featuring ${metadata.visual_theme}` : '') +
      (metadata.activity_type ? `. ${metadata.activity_type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} activity` : '') +
      (metadata.seasonal_theme ? ` - ${metadata.seasonal_theme.charAt(0).toUpperCase() + metadata.seasonal_theme.slice(1)} themed` : '') +
      `. Perfect for classroom or homeschool learning. Print-ready PDF.`

    // Enhanced SEO keywords with US grade equivalents
    const seoKeywords = metadata.seo_keywords || [
      metadata.year_group.toLowerCase(),
      usGradeLabel.toLowerCase(),
      metadata.topic.toLowerCase(),
      metadata.subtopic.toLowerCase(),
      ...(metadata.visual_theme ? [metadata.visual_theme.toLowerCase()] : []),
      ...(metadata.activity_type ? [metadata.activity_type.toLowerCase()] : []),
      ...(metadata.seasonal_theme ? [metadata.seasonal_theme.toLowerCase()] : []),
      'worksheet',
      'free',
      'printable',
      'educational',
      'math worksheet',
      'homeschool',
      'classroom',
    ]

    // Enhanced tags with better categorization
    const tags = metadata.tags || [
      metadata.year_group.toLowerCase().replace(/\s+/g, '-'),
      usGradeLabel.toLowerCase().replace(/\s+/g, '-'),
      metadata.topic.toLowerCase().replace(/\s+/g, '-'),
      metadata.subtopic.toLowerCase().replace(/\s+/g, '-'),
      ...(metadata.visual_theme ? [metadata.visual_theme.toLowerCase().replace(/\s+/g, '-')] : []),
      ...(metadata.activity_type ? [metadata.activity_type.toLowerCase().replace(/\s+/g, '-')] : []),
      ...(metadata.seasonal_theme ? [metadata.seasonal_theme.toLowerCase().replace(/\s+/g, '-')] : []),
      'free',
      'printable',
    ]

    // NORMALIZE: Enforce taxonomy standards
    const normalizedTopic = normalizeTopicValue(metadata.topic) || metadata.topic
    const normalizedSubtopic = normalizeSubtopicValue(normalizedTopic, metadata.subtopic) || metadata.subtopic

    if (!normalizeTopicValue(metadata.topic)) {
      console.warn(`⚠️ Unknown topic value: "${metadata.topic}"`)
    }
    if (!normalizeSubtopicValue(normalizedTopic, metadata.subtopic)) {
      console.warn(`⚠️ Unknown subtopic value: "${metadata.subtopic}" for topic "${metadata.topic}"`)
    }

    console.log('💾 Saving to database with normalized values:', {
      original: { topic: metadata.topic, subtopic: metadata.subtopic },
      normalized: { topic: normalizedTopic, subtopic: normalizedSubtopic }
    })

    const worksheet = await createLibraryWorksheet({
      title: metadata.title,
      html_content: worksheetHtml,
      year_group: metadata.year_group,
      topic: normalizedTopic,
      subtopic: normalizedSubtopic,
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
      // Rich educational content
      learning_objectives: educationalContent.learning_objectives,
      how_to_use: educationalContent.how_to_use,
      educational_benefits: educationalContent.educational_benefits,
      skills_developed: educationalContent.skills_developed,
      estimated_time_minutes: safeEstimatedTime,
      curriculum_standards: educationalContent.curriculum_standards,
      faq: educationalContent.faq,
      status: 'published', // Auto-publish (was 'draft')
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
        message: 'Worksheet published to library',
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
