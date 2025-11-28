import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ChevronRight, Download, Clock, BookOpen, CheckCircle, HelpCircle } from 'lucide-react'
import { getSubtopicHubData, getAllSubtopicPaths } from '@/lib/services/hubService'
import { LibraryNavigation } from '@/components/LibraryNavigation'

export const revalidate = 3600

interface PageProps {
  params: {
    yearGroup: string
    subtopic: string
  }
}

export async function generateStaticParams() {
  const paths = getAllSubtopicPaths()
  return paths
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const hubData = await getSubtopicHubData(params.yearGroup, params.subtopic)

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
      images: hubData.worksheets[0]?.thumbnail_url
        ? [{ url: hubData.worksheets[0].thumbnail_url, width: 800, height: 1000 }]
        : undefined,
    },
    alternates: {
      canonical: hubData.seo.canonicalUrl,
    },
  }
}

export default async function SubtopicHubPage({ params }: PageProps) {
  const hubData = await getSubtopicHubData(params.yearGroup, params.subtopic)

  if (!hubData) {
    notFound()
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freemathprintable.com'
  const hasWorksheets = hubData.worksheets.length > 0

  // JSON-LD for subtopic hub (CollectionPage + ItemList)
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
      name: hubData.label,
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: ['student', 'teacher', 'parent'],
    },
    numberOfItems: hubData.worksheetCount,
    mainEntity: hasWorksheets
      ? {
          '@type': 'ItemList',
          itemListElement: hubData.worksheets.slice(0, 10).map((ws, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'LearningResource',
              name: ws.title,
              url: `${baseUrl}/library/${ws.slug}`,
              image: ws.thumbnail_url,
              learningResourceType: 'Worksheet',
              educationalLevel: ws.year_group,
              isAccessibleForFree: true,
            },
          })),
        }
      : undefined,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: hubData.breadcrumbs.map((bc, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: bc.label,
        item: bc.href.startsWith('/') ? `${baseUrl}${bc.href}` : bc.href,
      })),
    },
  }

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: hubData.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gray-50">
        <LibraryNavigation currentPage="free-printables" />

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-50 via-blue-50 to-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Breadcrumbs */}
            <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-6">
              {hubData.breadcrumbs.map((bc, index) => (
                <span key={bc.href} className="flex items-center gap-2">
                  {index > 0 && <ChevronRight className="w-4 h-4" />}
                  {bc.current ? (
                    <span className="text-gray-900 font-medium">{bc.label}</span>
                  ) : (
                    <Link href={bc.href} className="hover:text-blue-700 transition-colors">
                      {bc.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Free {hubData.label} Worksheets for {hubData.yearGroup}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {hubData.educationalContent.introduction}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  {hubData.worksheetCount} Worksheets
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  UK Curriculum
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  10-15 min each
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main Content */}
            <main className="flex-1">
              {/* Worksheets Grid */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {hasWorksheets
                    ? `All ${hubData.label} Worksheets`
                    : `${hubData.label} Worksheets Coming Soon`}
                </h2>

                {hasWorksheets ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {hubData.worksheets.map((worksheet) => (
                      <Link
                        key={worksheet.id}
                        href={`/library/${worksheet.slug}`}
                        className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all"
                      >
                        <div className="aspect-[4/5] relative bg-gray-100">
                          {worksheet.thumbnail_url && (
                            <Image
                              src={worksheet.thumbnail_url}
                              alt={worksheet.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                            <span className="text-white text-sm font-medium flex items-center gap-1">
                              <Download className="w-4 h-4" />
                              View & Download
                            </span>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors">
                            {worksheet.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {worksheet.visual_theme && `${worksheet.visual_theme} theme`}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon!</h3>
                    <p className="text-gray-600 mb-4">
                      We&apos;re working on creating high-quality {hubData.label.toLowerCase()} worksheets
                      for {hubData.yearGroup}. Check back soon!
                    </p>
                    <Link
                      href="/create"
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Create Your Own
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </section>

              {/* Educational Content */}
              <section className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Why {hubData.label} is Important
                </h2>
                <p className="text-gray-600 mb-6">{hubData.educationalContent.whyImportant}</p>

                <h3 className="text-lg font-bold text-gray-900 mb-3">How to Use These Worksheets</h3>
                <p className="text-gray-600 mb-6">{hubData.educationalContent.howToUse}</p>

                <h3 className="text-lg font-bold text-gray-900 mb-3">Teaching Tips</h3>
                <ul className="space-y-2 mb-6">
                  {hubData.educationalContent.teachingTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-bold text-gray-900 mb-3">Skills Developed</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {hubData.educationalContent.skillsDeveloped.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">Curriculum Alignment</h3>
                <p className="text-gray-600">{hubData.educationalContent.curriculumAlignment}</p>
              </section>

              {/* FAQ Section */}
              <section className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {hubData.faq.map((item, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <h3 className="font-medium text-gray-900 mb-2">{item.question}</h3>
                      <p className="text-gray-600 text-sm">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </main>

            {/* Sidebar */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Related Subtopics */}
                {hubData.relatedSubtopics.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <h3 className="font-bold text-gray-900 mb-4">Related Topics</h3>
                    <div className="space-y-2">
                      {hubData.relatedSubtopics.map((subtopic) => (
                        <Link
                          key={subtopic.subtopic}
                          href={subtopic.href}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <span className="text-gray-700 group-hover:text-blue-700 transition-colors">
                            {subtopic.label}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Links */}
                <div className="bg-blue-50 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
                  <div className="space-y-2">
                    <Link
                      href={`/free-printables/${params.yearGroup}`}
                      className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
                    >
                      <ChevronRight className="w-4 h-4" />
                      All {hubData.yearGroup} Topics
                    </Link>
                    <Link
                      href="/free-printables"
                      className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
                    >
                      <ChevronRight className="w-4 h-4" />
                      All Year Groups
                    </Link>
                    <Link
                      href="/library"
                      className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
                    >
                      <ChevronRight className="w-4 h-4" />
                      Browse Library
                    </Link>
                  </div>
                </div>

                {/* Create Custom CTA */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-5 border border-green-200">
                  <h3 className="font-bold text-gray-900 mb-2">Need Something Different?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Create a custom {hubData.label.toLowerCase()} worksheet tailored to your needs.
                  </p>
                  <Link
                    href="/create"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors w-full justify-center"
                  >
                    Create Custom Worksheet
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
