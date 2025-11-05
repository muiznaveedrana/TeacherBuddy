import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getWorksheetBySlug } from '@/lib/services/libraryService'
import { WorksheetDetailView } from '@/components/WorksheetDetailView'

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

  return <WorksheetDetailView worksheet={worksheet} />
}
