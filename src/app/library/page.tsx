import { Suspense } from 'react'
import { WorksheetLibraryBrowser } from '@/components/WorksheetLibraryBrowser'
import { LibraryFilters } from '@/components/LibraryFilters'

export const revalidate = 3600

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Free Worksheet Library
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Browse our collection of high-quality, free printable worksheets
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className="w-64 flex-shrink-0">
            <Suspense fallback={<div>Loading filters...</div>}>
              <LibraryFilters />
            </Suspense>
          </aside>

          <main className="flex-1">
            <Suspense fallback={<div>Loading worksheets...</div>}>
              <WorksheetLibraryBrowser />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
