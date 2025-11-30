import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { updateWorksheetMetadata, getWorksheetById } from '@/lib/services/libraryService'
import { deleteFromImageKit, addCacheBusting } from '@/lib/services/imageKitService'

// Dynamic import to avoid bundling heavy puppeteer/sharp dependencies
const getThumbnailService = () => import('@/lib/services/thumbnailGenerationService')

export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { html_content, mascots } = await request.json()

    console.log('🔍 API UPDATE: Received mascots:', mascots ? `${mascots.length} mascots` : 'undefined/null')
    console.log('🔍 API UPDATE: Mascots data:', JSON.stringify(mascots, null, 2))

    if (!html_content) {
      return NextResponse.json(
        { error: 'html_content is required' },
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

    // Fetch the existing worksheet to get the slug
    const existingWorksheet = await getWorksheetById(params.id)
    if (!existingWorksheet) {
      return NextResponse.json(
        { error: 'Worksheet not found' },
        { status: 404 }
      )
    }

    // Delete old thumbnail from ImageKit to save space
    if (existingWorksheet.thumbnail_url) {
      console.log('🗑️ Deleting old thumbnail from ImageKit...')
      await deleteFromImageKit(existingWorksheet.thumbnail_url)
    }

    console.log('📸 Regenerating thumbnail from updated HTML with mascots...')
    // Generate new thumbnail from the updated HTML with mascots (dynamic import)
    const { generateWorksheetThumbnail } = await getThumbnailService()
    let thumbnailUrl = await generateWorksheetThumbnail(
      html_content,
      existingWorksheet.slug,
      mascots || undefined
    )

    // Add cache-busting parameter to force browser reload
    thumbnailUrl = addCacheBusting(thumbnailUrl)
    console.log('✅ New thumbnail URL (with cache-busting):', thumbnailUrl)

    // Update the worksheet with new content and thumbnail
    const updatedWorksheet = await updateWorksheetMetadata(params.id, {
      html_content,
      mascots: mascots || null,
      thumbnail_url: thumbnailUrl,
    })

    console.log('✅ Worksheet updated by admin:', params.id)

    return NextResponse.json({
      success: true,
      worksheet: updatedWorksheet,
    })

  } catch (error) {
    console.error('❌ Update worksheet failed:', error)

    return NextResponse.json(
      {
        error: 'Failed to update worksheet',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
