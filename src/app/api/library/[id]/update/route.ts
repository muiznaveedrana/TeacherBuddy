import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { updateWorksheetMetadata } from '@/lib/services/libraryService'

export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { html_content, mascots } = await request.json()

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
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    // Update the worksheet
    const updatedWorksheet = await updateWorksheetMetadata(params.id, {
      html_content,
      mascots: mascots || null,
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
