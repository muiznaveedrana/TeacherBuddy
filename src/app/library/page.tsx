import { Suspense } from 'react'
import Link from 'next/link'
import { WorksheetLibraryBrowser } from '@/components/WorksheetLibraryBrowser'
import { LibraryFilters } from '@/components/LibraryFilters'
import { Button } from '@/components/ui/button'
import { Home, PlusCircle } from 'lucide-react'

export const revalidate = 3600

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center">
                <h1 className="text-xl font-bold text-blue-700">WorksheetGenerator.AI</h1>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-gray-600 hover:text-blue-700 transition-colors">
                  <Home className="w-4 h-4 inline mr-1" />
                  Home
                </Link>
                <Link href="/library" className="text-blue-700 font-medium">
                  Browse Library
                </Link>
                <Link href="/create" className="text-gray-600 hover:text-blue-700 transition-colors">
                  <PlusCircle className="w-4 h-4 inline mr-1" />
                  Create Worksheet
                </Link>
              </div>
            </div>
            <Link href="/create">
              <Button size="sm" className="bg-blue-700 hover:bg-blue-800">
                Start Creating
              </Button>
            </Link>
          </div>
        </div>
      </nav>

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
