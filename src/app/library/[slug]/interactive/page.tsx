import { createServerClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { InteractiveWorksheetClient } from './InteractiveWorksheetClient'

interface PageProps {
  params: {
    slug: string
  }
}

export const dynamic = 'force-dynamic'

export default async function InteractiveWorksheetPage({ params }: PageProps) {
  const { slug } = params

  // Create Supabase server client
  const supabase = createServerClient()

  // Fetch worksheet from library
  const { data: worksheet, error } = await supabase
    .from('library_worksheets')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !worksheet) {
    console.error('Worksheet not found:', error)
    notFound()
  }

  // Increment view count (fire-and-forget, don't await)
  supabase
    .from('library_worksheets')
    .update({
      view_count: worksheet.view_count + 1,
      last_downloaded_at: new Date().toISOString()
    })
    .eq('id', worksheet.id)
    .then(() => console.log('Interactive view count incremented'))
    .catch(err => console.error('Failed to increment view count:', err))

  return <InteractiveWorksheetClient worksheet={worksheet} />
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = params

  const supabase = createServerClient()
  const { data: worksheet } = await supabase
    .from('library_worksheets')
    .select('title, seo_title, seo_description')
    .eq('slug', slug)
    .single()

  return {
    title: worksheet?.seo_title || `${worksheet?.title} - Interactive Worksheet` || 'Interactive Worksheet',
    description: worksheet?.seo_description || `Practice ${worksheet?.title} interactively with feedback upon completion!`
  }
}
