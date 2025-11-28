import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Download, BookOpen, Users } from 'lucide-react'
import { getMainHubData } from '@/lib/services/hubService'
import { LibraryNavigation } from '@/components/LibraryNavigation'
import { yearGroupToDualLabel } from '@/lib/types/hub'

export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: 'Free Math Printables | Kindergarten to Grade 6 / Reception to Year 6',
  description:
    'Download free math printables for Kindergarten to Grade 6 (Reception to Year 6). Ages 4-11. Curriculum-aligned, ready to print. Perfect for home learning and classroom use.',
  keywords:
    'free math printables, kindergarten math printables, grade 1 math printables, grade 2 printables, elementary math printables, free maths printables, reception worksheets, year 1 maths printables, year 2 maths printables, primary maths resources, ages 4-11 math worksheets',
  openGraph: {
    title: 'Free Math Printables | Kindergarten to Grade 6',
    description:
      'Download free math printables for elementary and primary schools. Curriculum-aligned and ready to print.',
    type: 'website',
  },
}

export default async function FreePrintablesPage() {
  const hubData = await getMainHubData()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freemathprintable.com'

  // JSON-LD for main hub page
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Free Math Printables | Kindergarten to Grade 6',
    description:
      'Collection of free math printables for elementary and primary schools, from Kindergarten to Grade 6 (Reception to Year 6).',
    url: `${baseUrl}/free-printables`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'FreeMathPrintable.com',
      url: baseUrl,
    },
    about: {
      '@type': 'Thing',
      name: 'Mathematics Education',
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: ['student', 'teacher', 'parent'],
    },
    educationalLevel: ['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Reception', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'],
    numberOfItems: hubData.totalWorksheetCount,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Navigation Header */}
        <LibraryNavigation currentPage="free-printables" />

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-50 via-blue-50 to-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <Link href="/" className="hover:text-blue-700 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">Free Printables</span>
            </nav>

            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Free Math Printables
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Download free, curriculum-aligned math printables for elementary and primary schools.
                From Kindergarten to Grade 6 (Reception to Year 6), all printables are ready to print and use.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-8">
                <div className="flex items-center gap-2 text-gray-700">
                  <Download className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">{hubData.totalWorksheetCount}+ Printables</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Curriculum Aligned</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold">100% Free</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Year Groups Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Browse by Grade Level
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hubData.yearGroups.map((yg) => (
              <Link
                key={yg.yearGroup}
                href={yg.href}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {yearGroupToDualLabel(yg.yearGroup)}
                    </h3>
                    <p className="text-sm text-gray-500">Ages {yg.ageRange}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p>{yg.topicCount} Topics</p>
                  <p className="font-medium text-green-600">
                    {yg.worksheetCount} Printables Available
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Printables Section */}
        {hubData.popularWorksheets.length > 0 && (
          <div className="bg-white border-t border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Popular Printables
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
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium text-gray-900 line-clamp-2">
                        {worksheet.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{worksheet.year_group}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link
                  href="/library"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All Printables
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* SEO Content Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-gray max-w-none">
            <h2>Free Math Printables for Elementary &amp; Primary Schools</h2>
            <p>
              Welcome to our collection of free math printables designed for both
              US elementary schools and UK primary schools. All printables are curriculum-aligned
              and are perfect for classroom use, homework, or home learning.
            </p>

            <h3>Why Choose Our Free Printables?</h3>
            <ul>
              <li><strong>Age-appropriate:</strong> Every printable is designed for specific developmental stages (ages 4-11)</li>
              <li><strong>Expert-designed:</strong> Created by experienced educators for each grade level</li>
              <li><strong>Ready to print:</strong> High-quality PDFs that print perfectly every time</li>
              <li><strong>Completely free:</strong> No signup, no subscription, no hidden costs</li>
            </ul>

            <h3>Printables for Every Grade Level</h3>
            <p>
              We offer printables for Kindergarten/Reception (ages 4-5) through Grade 6/Year 6 (ages 10-11),
              covering all key math topics including counting, addition, subtraction, shapes,
              measurement, and more. Each printable is designed to build confidence and develop
              essential mathematical skills.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-blue-50 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Need a Custom Printable?
            </h2>
            <p className="text-gray-600 mb-4">
              Use our generator to create personalised printables
            </p>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Create Custom Printable
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
