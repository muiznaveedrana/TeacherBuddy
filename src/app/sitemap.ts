import { MetadataRoute } from 'next'
import { browseLibraryWorksheets } from '@/lib/services/libraryService'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/create`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/library`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
  ]

  // Fetch all published worksheets
  try {
    const { worksheets } = await browseLibraryWorksheets({
      limit: 1000, // Get all worksheets
      sort_by: 'newest',
    })

    const worksheetPages: MetadataRoute.Sitemap = worksheets.map((worksheet) => ({
      url: `${baseUrl}/library/${worksheet.slug}`,
      lastModified: worksheet.updated_at ? new Date(worksheet.updated_at) : new Date(worksheet.created_at),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

    return [...staticPages, ...worksheetPages]
  } catch (error) {
    console.error('Failed to generate sitemap:', error)
    return staticPages
  }
}
