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

  // Format topic for display
  const formatLabel = (str: string) => str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  // JSON-LD structured data for SEO (US-first)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: worksheet.title,
    description: worksheet.seo_description || `Free printable ${yearGroupToDualLabel(worksheet.year_group)} ${worksheet.topic} worksheet`,
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
    inLanguage: 'en-US',
    keywords: worksheet.seo_keywords?.join(', '),
    datePublished: worksheet.published_at,
    dateModified: worksheet.updated_at || worksheet.created_at,
    publisher: {
      '@type': 'Organization',
      name: 'FreeMathPrintable.com',
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

  // Breadcrumb schema for SEO navigation
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Library',
        item: `${baseUrl}/library`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: yearGroupToDualLabel(worksheet.year_group),
        item: `${baseUrl}/free-printables/${worksheet.year_group.toLowerCase().replace(' ', '-')}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: formatLabel(worksheet.topic),
        item: `${baseUrl}/free-printables/${worksheet.year_group.toLowerCase().replace(' ', '-')}/${worksheet.topic}`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: worksheet.title,
        item: `${baseUrl}/library/${worksheet.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <WorksheetDetailView worksheet={worksheet} />
    </>
  )
}
