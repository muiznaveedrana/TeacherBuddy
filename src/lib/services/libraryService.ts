import { createClient } from '@supabase/supabase-js'
import type {
  LibraryWorksheet,
  CreateLibraryWorksheetInput,
  LibraryFilters,
  LibraryBrowseResponse,
} from '@/lib/types/library'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function createLibraryWorksheet(
  input: CreateLibraryWorksheetInput
): Promise<LibraryWorksheet> {
  try {
    const { data, error } = await supabase
      .from('library_worksheets')
      .insert({
        ...input,
        region: input.region || 'UK', // Default to UK for MVP
        slug: generateSlug(input.title, input.visual_theme, input.activity_type, input.seasonal_theme, input.layout_type, input.worksheet_version),
      })
      .select()
      .single()

    if (error) throw error

    console.log('✅ Worksheet created:', data.slug)
    return data as LibraryWorksheet

  } catch (error) {
    console.error('❌ Failed to create worksheet:', error)
    throw error
  }
}

export async function getWorksheetBySlug(
  slug: string
): Promise<LibraryWorksheet | null> {
  try {
    const { data, error } = await supabase
      .from('library_worksheets')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }

    await supabase.rpc('increment_view_count', { worksheet_id: data.id })

    return data as LibraryWorksheet

  } catch (error) {
    console.error('❌ Failed to fetch worksheet:', error)
    throw error
  }
}

export async function browseLibraryWorksheets(
  filters: LibraryFilters = {}
): Promise<LibraryBrowseResponse> {
  try {
    let query = supabase
      .from('library_worksheets')
      .select('*', { count: 'exact' })
      .eq('status', 'published')
      .eq('region', 'UK') // MVP: Hard-coded to UK. Future: Pass as parameter

    if (filters.year_group) {
      query = query.eq('year_group', filters.year_group)
    }

    if (filters.topic) {
      query = query.eq('topic', filters.topic)
    }

    if (filters.subtopic) {
      query = query.eq('subtopic', filters.subtopic)
    }

    if (filters.visual_theme) {
      query = query.eq('visual_theme', filters.visual_theme)
    }

    if (filters.activity_type) {
      query = query.eq('activity_type', filters.activity_type)
    }

    if (filters.seasonal_theme) {
      query = query.eq('seasonal_theme', filters.seasonal_theme)
    }

    if (filters.search) {
      query = query.textSearch('title', filters.search)
    }

    const sortBy = filters.sort_by || 'newest'
    switch (sortBy) {
      case 'newest':
        query = query.order('published_at', { ascending: false })
        break
      case 'popular':
        query = query.order('view_count', { ascending: false })
        break
      case 'downloads':
        query = query.order('download_count', { ascending: false })
        break
    }

    const limit = filters.limit || 20
    const offset = filters.offset || 0
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) throw error

    return {
      worksheets: (data as LibraryWorksheet[]) || [],
      total_count: count || 0,
      has_more: (count || 0) > offset + limit,
      filters_applied: filters,
    }

  } catch (error) {
    console.error('❌ Failed to browse library:', error)
    throw error
  }
}

export async function recordDownload(
  worksheetId: string,
  metadata: {
    userAgent?: string
    ipHash?: string
    referrer?: string
  }
): Promise<void> {
  try {
    await supabase.from('library_downloads').insert({
      worksheet_id: worksheetId,
      user_agent: metadata.userAgent,
      ip_hash: metadata.ipHash,
      referrer: metadata.referrer,
    })

    // Fetch current worksheet to increment download count
    const { data: worksheet } = await supabase
      .from('library_worksheets')
      .select('download_count')
      .eq('id', worksheetId)
      .single()

    if (worksheet) {
      await supabase
        .from('library_worksheets')
        .update({
          download_count: worksheet.download_count + 1,
          last_downloaded_at: new Date().toISOString(),
        })
        .eq('id', worksheetId)
    }

    console.log('✅ Download recorded')

  } catch (error) {
    console.warn('Failed to record download:', error)
  }
}

function generateSlug(
  title: string,
  visualTheme?: string,
  activityType?: string,
  seasonalTheme?: string,
  layoutType?: string,
  version?: string
): string {
  // Start with base slug from title
  let slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

  // Add differentiators for uniqueness
  if (visualTheme) {
    slug = `${slug}-with-${visualTheme.toLowerCase().replace(/\s+/g, '-')}`
  }
  if (activityType) {
    slug = `${slug}-${activityType.toLowerCase().replace(/\s+/g, '-')}`
  }
  if (seasonalTheme) {
    slug = `${slug}-${seasonalTheme.toLowerCase().replace(/\s+/g, '-')}-edition`
  }
  // Layout is a PRIMARY differentiator - different LLM prompts = different content
  if (layoutType && layoutType !== 'default') {
    slug = `${slug}-${layoutType.toLowerCase().replace(/\s+/g, '-')}-layout`
  }
  if (version && !visualTheme && !activityType && !seasonalTheme && !layoutType) {
    slug = `${slug}-version-${version.toLowerCase()}`
  }

  return slug
}
