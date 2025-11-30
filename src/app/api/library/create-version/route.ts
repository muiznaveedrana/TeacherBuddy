import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createLibraryWorksheet, getWorksheetById } from '@/lib/services/libraryService'
import { addCacheBusting } from '@/lib/services/imageKitService'

// Dynamic import to avoid bundling heavy puppeteer/sharp dependencies
const getThumbnailService = () => import('@/lib/services/thumbnailGenerationService')

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const {
      original_id,
      title,
      html_content,
      mascots,
      year_group,
      topic,
      subtopic,
      difficulty,
      question_count,
    } = await request.json()

    if (!original_id || !html_content) {
      return NextResponse.json(
        { error: 'original_id and html_content are required' },
        { status: 400 }
      )
    }

    // Create Supabase client with cookies
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
    )

    // Check if user is authenticated and is admin
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in' },
        { status: 401 }
      )
    }

    // Check admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    // Fetch original worksheet to copy metadata
    const originalWorksheet = await getWorksheetById(original_id)

    if (!originalWorksheet) {
      return NextResponse.json(
        { error: 'Original worksheet not found' },
        { status: 404 }
      )
    }

    // Dynamic import to avoid bundling heavy dependencies
    const { generateWorksheetThumbnail, generateSlugFromTitle } = await getThumbnailService()

    // Generate slug for the new version
    const newTitle = title || `${originalWorksheet.title} (Edited)`
    const tempSlug = generateSlugFromTitle(
      newTitle,
      originalWorksheet.visual_theme || undefined,
      originalWorksheet.activity_type || undefined,
      originalWorksheet.seasonal_theme || undefined,
      originalWorksheet.layout_type,
      undefined
    )

    console.log('📸 Generating thumbnail for new version with mascots...')
    // Generate new thumbnail from the edited HTML with mascots
    let thumbnailUrl = await generateWorksheetThumbnail(
      html_content,
      tempSlug,
      mascots || undefined
    )

    // Add cache-busting parameter to ensure fresh image
    thumbnailUrl = addCacheBusting(thumbnailUrl)
    console.log('✅ New thumbnail URL (with cache-busting):', thumbnailUrl)

    // Create new worksheet as a version of the original
    const newWorksheet = await createLibraryWorksheet({
      title: newTitle,
      year_group: year_group || originalWorksheet.year_group,
      topic: topic || originalWorksheet.topic,
      subtopic: subtopic || originalWorksheet.subtopic,
      html_content,
      thumbnail_url: thumbnailUrl, // Use newly generated thumbnail
      difficulty: difficulty || originalWorksheet.difficulty,
      question_count: question_count || originalWorksheet.question_count,
      layout_type: originalWorksheet.layout_type,
      visual_theme: originalWorksheet.visual_theme,
      activity_type: originalWorksheet.activity_type,
      seasonal_theme: originalWorksheet.seasonal_theme,
      mascots: mascots || originalWorksheet.mascots,
      tags: originalWorksheet.tags,
      seo_description: originalWorksheet.seo_description,
      learning_objectives: originalWorksheet.learning_objectives,
      educational_benefits: originalWorksheet.educational_benefits,
      how_to_use: originalWorksheet.how_to_use,
      skills_developed: originalWorksheet.skills_developed,
      faq: originalWorksheet.faq,
      status: 'published', // Auto-publish admin-created versions
      region: originalWorksheet.region || 'UK',
    })

    console.log('✅ New version created by admin:', newWorksheet.slug)

    return NextResponse.json({
      success: true,
      slug: newWorksheet.slug,
      worksheet: newWorksheet,
    })

  } catch (error) {
    console.error('❌ Create version failed:', error)

    return NextResponse.json(
      {
        error: 'Failed to create new version',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
