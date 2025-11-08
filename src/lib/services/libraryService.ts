import { createClient } from '@supabase/supabase-js'
import type {
  LibraryWorksheet,
  CreateLibraryWorksheetInput,
  LibraryFilters,
  LibraryBrowseResponse,
} from '@/lib/types/library'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Public client for reads (respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for writes (bypasses RLS) - server-side only
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export async function createLibraryWorksheet(
  input: CreateLibraryWorksheetInput
): Promise<LibraryWorksheet> {
  try {
    // Generate slug with auto-versioning
    const slug = await generateUniqueSlug(
      input.title,
      input.visual_theme,
      input.activity_type,
      input.seasonal_theme,
      input.layout_type,
      input.worksheet_version
    )

    const { data, error} = await supabaseAdmin
      .from('library_worksheets')
      .insert({
        ...input,
        region: input.region || 'UK', // Default to UK for MVP
        slug,
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
    const { data, error } = await supabaseAdmin
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
    const { data: worksheet } = await supabaseAdmin
      .from('library_worksheets')
      .select('download_count')
      .eq('id', worksheetId)
      .single()

    if (worksheet) {
      await supabaseAdmin
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

// ============================================
// ADMIN FUNCTIONS
// ============================================

export async function getAllWorksheetsForAdmin(
  filters: Partial<LibraryFilters> = {}
): Promise<LibraryBrowseResponse> {
  try {
    let query = supabaseAdmin
      .from('library_worksheets')
      .select('*', { count: 'exact' })

    // No status filter - show ALL worksheets (published & drafts)

    if (filters.year_group) {
      query = query.eq('year_group', filters.year_group)
    }

    if (filters.topic) {
      query = query.eq('topic', filters.topic)
    }

    if (filters.search) {
      query = query.textSearch('title', filters.search)
    }

    // Default sort: newest first
    const sortBy = filters.sort_by || 'newest'
    switch (sortBy) {
      case 'newest':
        query = query.order('created_at', { ascending: false })
        break
      case 'popular':
        query = query.order('view_count', { ascending: false })
        break
      case 'downloads':
        query = query.order('download_count', { ascending: false })
        break
    }

    const limit = filters.limit || 50
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
    console.error('❌ Failed to fetch admin worksheets:', error)
    throw error
  }
}

export async function getWorksheetById(
  id: string
): Promise<LibraryWorksheet | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('library_worksheets')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw error
    }

    return data as LibraryWorksheet

  } catch (error) {
    console.error('❌ Failed to fetch worksheet by ID:', error)
    throw error
  }
}

export async function publishWorksheet(id: string): Promise<LibraryWorksheet> {
  try {
    const { data, error } = await supabaseAdmin
      .from('library_worksheets')
      .update({
        status: 'published',
        published_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    console.log('✅ Worksheet published:', id)
    return data as LibraryWorksheet

  } catch (error) {
    console.error('❌ Failed to publish worksheet:', error)
    throw error
  }
}

export async function unpublishWorksheet(id: string): Promise<LibraryWorksheet> {
  try {
    const { data, error } = await supabaseAdmin
      .from('library_worksheets')
      .update({
        status: 'draft',
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    console.log('✅ Worksheet unpublished:', id)
    return data as LibraryWorksheet

  } catch (error) {
    console.error('❌ Failed to unpublish worksheet:', error)
    throw error
  }
}

export async function deleteWorksheet(id: string): Promise<void> {
  try {
    // First delete associated downloads
    await supabaseAdmin
      .from('library_downloads')
      .delete()
      .eq('worksheet_id', id)

    // Then delete the worksheet
    const { error } = await supabaseAdmin
      .from('library_worksheets')
      .delete()
      .eq('id', id)

    if (error) throw error

    console.log('✅ Worksheet deleted:', id)

  } catch (error) {
    console.error('❌ Failed to delete worksheet:', error)
    throw error
  }
}

export async function updateWorksheetMetadata(
  id: string,
  updates: Partial<CreateLibraryWorksheetInput>
): Promise<LibraryWorksheet> {
  try {
    const { data, error } = await supabaseAdmin
      .from('library_worksheets')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    console.log('✅ Worksheet metadata updated:', id)
    return data as LibraryWorksheet

  } catch (error) {
    console.error('❌ Failed to update worksheet metadata:', error)
    throw error
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if a slug already exists in the database
 */
async function slugExists(slug: string): Promise<boolean> {
  const { data, error } = await supabaseAdmin
    .from('library_worksheets')
    .select('slug')
    .eq('slug', slug)
    .single()

  // If no error and data exists, slug is taken
  if (data) return true

  // PGRST116 means no rows found, which is what we want
  if (error?.code === 'PGRST116') return false

  // Any other error, assume slug exists for safety
  if (error) {
    console.warn('⚠️ Error checking slug existence:', error)
    return true
  }

  return false
}

/**
 * Generate a unique slug with auto-versioning (-v2, -v3, etc.)
 */
async function generateUniqueSlug(
  title: string,
  visualTheme?: string,
  activityType?: string,
  seasonalTheme?: string,
  layoutType?: string,
  version?: string
): Promise<string> {
  // Generate base slug
  const baseSlug = generateSlug(title, visualTheme, activityType, seasonalTheme, layoutType, version)

  // Check if base slug is available
  const baseExists = await slugExists(baseSlug)
  if (!baseExists) {
    console.log('✅ Slug available:', baseSlug)
    return baseSlug
  }

  // Base slug exists, try versioned slugs
  console.log('⚠️ Slug already exists, trying versioned slugs:', baseSlug)

  let versionNumber = 2
  let versionedSlug = `${baseSlug}-v${versionNumber}`

  // Keep incrementing until we find an available slug
  while (await slugExists(versionedSlug)) {
    versionNumber++
    versionedSlug = `${baseSlug}-v${versionNumber}`

    // Safety check to prevent infinite loop
    if (versionNumber > 100) {
      // Fallback: add timestamp
      const timestamp = Date.now()
      versionedSlug = `${baseSlug}-${timestamp}`
      break
    }
  }

  console.log('✅ Generated versioned slug:', versionedSlug)
  return versionedSlug
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
