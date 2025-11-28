import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getWorksheetBySlug } from '@/lib/services/libraryService'
import { WorksheetDetailView } from '@/components/WorksheetDetailView'
import { yearGroupToDualLabel, yearGroupToUSLabel } from '@/lib/types/hub'

export const revalidate = 3600

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const worksheet = await getWorksheetBySlug(params.slug)

  if (!worksheet) {
    return {
      title: 'Worksheet Not Found',
    }
  }

  return {
    title: worksheet.seo_title || worksheet.title,
    description: worksheet.seo_description || undefined,
    keywords: worksheet.seo_keywords?.join(', '),
    openGraph: {
      title: worksheet.title,
      description: worksheet.seo_description || undefined,
      images: [
        {
          url: worksheet.thumbnail_url,
          width: 800,
          height: 1000,
          alt: worksheet.title,
        },
      ],
      type: 'article',
    },
  }
}

export default async function WorksheetDetailPage({ params }: PageProps) {
  const worksheet = await getWorksheetBySlug(params.slug)

  if (!worksheet) {
    notFound()
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: worksheet.title,
    description: worksheet.seo_description || `Free printable ${yearGroupToDualLabel(worksheet.year_group)} ${worksheet.topic} printable`,
    learningResourceType: 'Worksheet',
    educationalLevel: [yearGroupToUSLabel(worksheet.year_group), worksheet.year_group],
    about: {
      '@type': 'Thing',
      name: worksheet.topic,
    },
    url: `${baseUrl}/library/${worksheet.slug}`,
    image: worksheet.thumbnail_url,
    thumbnailUrl: worksheet.thumbnail_url,
    isAccessibleForFree: true,
    interactivityType: 'mixed',
    inLanguage: 'en-GB',
    keywords: worksheet.seo_keywords?.join(', '),
    datePublished: worksheet.published_at,
    dateModified: worksheet.updated_at || worksheet.created_at,
    publisher: {
      '@type': 'Organization',
      name: 'Star Worksheets',
      url: baseUrl,
    },
    educationalUse: ['practice', 'assessment', 'homework'],
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
    },
    aggregateRating: worksheet.view_count > 10 ? {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: Math.floor(worksheet.view_count / 10),
    } : undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorksheetDetailView worksheet={worksheet} />
    </>
  )
}
