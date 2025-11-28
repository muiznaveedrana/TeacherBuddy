import { MetadataRoute } from 'next'
import { browseLibraryWorksheets } from '@/lib/services/libraryService'
import { getAllYearGroupSlugs, getAllSubtopicPaths } from '@/lib/services/hubService'

/**
 * Dynamic Sitemap for FreeMathPrintable.com
 *
 * SEO Optimized sitemap that:
 * - Includes all public pages
 * - Includes all free-printables hub pages (year groups + subtopics)
 * - Dynamically lists all library worksheets
 * - Excludes protected/private pages
 * - Sets appropriate priorities and update frequencies
 *
 * Access at: https://freemathprintable.com/sitemap.xml
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freemathprintable.com'

  // Static public pages (SEO optimized)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0, // Homepage - highest priority
    },
    {
      url: `${baseUrl}/free-printables`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95, // Main hub page - very high priority for SEO
    },
    {
      url: `${baseUrl}/library`,
      lastModified: new Date(),
      changeFrequency: 'daily', // Updated frequently with new worksheets
      priority: 0.9, // Main content - very high priority
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2024-11-12'), // Last policy update
      changeFrequency: 'monthly',
      priority: 0.5, // Legal pages - medium priority
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2024-11-12'), // Last terms update
      changeFrequency: 'monthly',
      priority: 0.5, // Legal pages - medium priority
    },
  ]
  // Note: /create is excluded (requires auth, not for public indexing)

  // Generate hub pages (year groups)
  const yearGroupSlugs = getAllYearGroupSlugs()
  const yearGroupPages: MetadataRoute.Sitemap = yearGroupSlugs.map((slug) => ({
    url: `${baseUrl}/free-printables/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85, // Year group hub pages - high priority
  }))

  // Generate subtopic hub pages (the main blog pages)
  const subtopicPaths = getAllSubtopicPaths()
  const subtopicPages: MetadataRoute.Sitemap = subtopicPaths.map((path) => ({
    url: `${baseUrl}/free-printables/${path.yearGroup}/${path.subtopic}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8, // Subtopic hub pages - high priority for long-tail SEO
  }))

  // Fetch all published worksheets
  try {
    const { worksheets } = await browseLibraryWorksheets({
      limit: 1000, // Get all worksheets
      sort_by: 'newest',
    })

    const worksheetPages: MetadataRoute.Sitemap = worksheets.map((worksheet) => ({
      url: `${baseUrl}/library/${worksheet.slug}`,
      lastModified: worksheet.updated_at ? new Date(worksheet.updated_at) : new Date(worksheet.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    return [...staticPages, ...yearGroupPages, ...subtopicPages, ...worksheetPages]
  } catch (error) {
    console.error('Failed to generate sitemap:', error)
    return [...staticPages, ...yearGroupPages, ...subtopicPages]
  }
}
