import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ChevronRight, BookOpen, FileText, Download } from 'lucide-react'
import { getTopicHubData, getAllTopicPaths } from '@/lib/services/hubService'
import { LibraryNavigation } from '@/components/LibraryNavigation'
import { yearGroupToDualLabel } from '@/lib/types/hub'

export const revalidate = 3600

interface PageProps {
  params: {
    yearGroup: string
    topic: string
  }
}

export async function generateStaticParams() {
  const paths = getAllTopicPaths()
  return paths
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const hubData = await getTopicHubData(params.yearGroup, params.topic)

  if (!hubData) {
    return { title: 'Topic Not Found' }
  }

  return {
    title: hubData.seo.title,
    description: hubData.seo.description,
    keywords: hubData.seo.keywords.join(', '),
    openGraph: {
      title: hubData.seo.title,
      description: hubData.seo.description,
      type: 'website',
    },
    alternates: {
      canonical: hubData.seo.canonicalUrl,
    },
  }
}

export default async function TopicHubPage({ params }: PageProps) {
  const hubData = await getTopicHubData(params.yearGroup, params.topic)

  if (!hubData) {
    notFound()
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freemathprintable.com'

  // JSON-LD for topic hub
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hubData.seo.title,
    description: hubData.seo.description,
    url: hubData.seo.canonicalUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'FreeMathPrintable.com',
      url: baseUrl,
    },
    about: {
      '@type': 'Thing',
      name: `${hubData.label} - ${hubData.yearGroup}`,
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: ['student', 'teacher', 'parent'],
    },
    numberOfItems: hubData.worksheetCount,
    breadcrumb: {
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
          name: 'Free Printables',
          item: `${baseUrl}/free-printables`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: yearGroupToDualLabel(hubData.yearGroup),
          item: `${baseUrl}/free-printables/${params.yearGroup}`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: hubData.label,
          item: hubData.seo.canonicalUrl,
        },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gray-50">
        <LibraryNavigation currentPage="free-printables" />

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 via-green-50 to-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumbs */}
            <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-6">
              <Link href="/" className="hover:text-blue-700 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/free-printables" className="hover:text-blue-700 transition-colors">
                Free Printables
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/free-printables/${params.yearGroup}`} className="hover:text-blue-700 transition-colors">
                {yearGroupToDualLabel(hubData.yearGroup)}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">{hubData.label}</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Free {hubData.label} Printables
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                {hubData.description}
              </p>
              <p className="text-gray-500">
                {yearGroupToDualLabel(hubData.yearGroup)} • {hubData.subtopics.length} Subtopics • {hubData.worksheetCount} Printables
              </p>
            </div>
          </div>
        </div>

        {/* Subtopics Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Browse {hubData.label} Subtopics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hubData.subtopics.map((subtopic) => (
              <Link
                key={subtopic.subtopic}
                href={`/free-printables/${params.yearGroup}/${params.topic}/${subtopic.subtopicSlug}`}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                      <BookOpen className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {subtopic.label}
                    </h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>

                <p className="font-medium text-green-600 flex items-center gap-1 text-sm">
                  <FileText className="w-4 h-4" />
                  {subtopic.worksheetCount > 0
                    ? `${subtopic.worksheetCount} Printables`
                    : 'Coming Soon'}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Printables Section */}
        {hubData.popularWorksheets.length > 0 && (
          <div className="bg-white border-t border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Popular {hubData.label} Printables
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {hubData.popularWorksheets.map((worksheet) => (
                  <Link
                    key={worksheet.id}
                    href={`/library/${worksheet.slug}`}
                    className="group bg-gray-50 rounded-lg border border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="aspect-[4/5] relative bg-gray-100">
                      {worksheet.thumbnail_url && (
                        <Image
                          src={worksheet.thumbnail_url}
                          alt={worksheet.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                        <span className="text-white text-xs font-medium flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          View
                        </span>
                      </div>
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium text-gray-900 line-clamp-2">
                        {worksheet.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{worksheet.subtopic?.replace(/-/g, ' ')}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link
                  href={`/library?yearGroup=${params.yearGroup}&topic=${params.topic}`}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All {hubData.label} Printables
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Learning Objectives */}
        {hubData.learningObjectives && hubData.learningObjectives.length > 0 && (
          <div className="bg-gray-50 border-t">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="prose prose-gray max-w-none">
                <h2>Learning Objectives</h2>
                <p>
                  Our {hubData.label.toLowerCase()} printables for {yearGroupToDualLabel(hubData.yearGroup)} help children develop key mathematical skills:
                </p>
                <ul>
                  {hubData.learningObjectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Back Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href={`/free-printables/${params.yearGroup}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to {yearGroupToDualLabel(hubData.yearGroup)} Topics
          </Link>
        </div>
      </div>
    </>
  )
}
