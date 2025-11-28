import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, BookOpen, FileText } from 'lucide-react'
import { getYearGroupHubData, getAllYearGroupSlugs } from '@/lib/services/hubService'
import { LibraryNavigation } from '@/components/LibraryNavigation'

export const revalidate = 3600

interface PageProps {
  params: {
    yearGroup: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllYearGroupSlugs()
  return slugs.map((yearGroup) => ({ yearGroup }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const hubData = await getYearGroupHubData(params.yearGroup)

  if (!hubData) {
    return { title: 'Year Group Not Found' }
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

export default async function YearGroupHubPage({ params }: PageProps) {
  const hubData = await getYearGroupHubData(params.yearGroup)

  if (!hubData) {
    notFound()
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freemathprintable.com'

  // JSON-LD for year group hub
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
      name: `${hubData.yearGroup} Mathematics`,
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
          name: hubData.yearGroup,
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
            <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <Link href="/" className="hover:text-blue-700 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/free-printables" className="hover:text-blue-700 transition-colors">
                Free Printables
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">{hubData.yearGroup}</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Free {hubData.yearGroup} Maths Worksheets
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                {hubData.description}
              </p>
              <p className="text-gray-500">
                Ages {hubData.ageRange} • {hubData.topics.length} Topics • {hubData.worksheetCount} Worksheets
              </p>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Browse {hubData.yearGroup} Topics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hubData.topics.map((topic) => (
              <Link
                key={topic.topic}
                href={topic.href}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {topic.label}
                    </h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>

                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">
                    {topic.subtopicCount} Subtopics
                  </p>
                  <p className="font-medium text-green-600 flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {topic.worksheetCount > 0
                      ? `${topic.worksheetCount} Worksheets`
                      : 'Coming Soon'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SEO Content */}
        <div className="bg-white border-t">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="prose prose-gray max-w-none">
              <h2>About {hubData.yearGroup} Maths Worksheets</h2>
              <p>
                Our free {hubData.yearGroup} maths worksheets are designed for children aged {hubData.ageRange}.
                Each worksheet aligns with the UK National Curriculum and covers essential mathematical
                concepts appropriate for this age group.
              </p>

              <h3>What Your Child Will Learn</h3>
              <p>
                {hubData.yearGroup} {hubData.description.toLowerCase()}. Our worksheets cover
                {hubData.topics.length} key topic areas, helping children build a strong foundation
                in mathematics.
              </p>

              <h3>How to Use These Worksheets</h3>
              <p>
                Browse the topics above to find worksheets that match your child&apos;s learning needs.
                Each topic page shows all available subtopics with free, printable worksheets.
                Simply download, print, and start learning!
              </p>
            </div>
          </div>
        </div>

        {/* Back Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/free-printables"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to All Year Groups
          </Link>
        </div>
      </div>
    </>
  )
}
