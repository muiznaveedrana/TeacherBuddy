import { Suspense } from 'react'
import Link from 'next/link'
import { WorksheetLibraryBrowser } from '@/components/WorksheetLibraryBrowser'
import { LibraryFilters } from '@/components/LibraryFilters'
import { LibrarySearch } from '@/components/LibrarySearch'
import { Button } from '@/components/ui/button'
import { Home, PlusCircle, Library, ChevronRight } from 'lucide-react'

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
                  <Library className="w-4 h-4 inline mr-1" />
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

      {/* Hero Section with Search */}
      <div className="bg-gradient-to-br from-blue-50 to-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-blue-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Library</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Free Worksheet Library
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Browse thousands of high-quality, free printable worksheets
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <Suspense fallback={<div className="h-11 bg-gray-100 rounded animate-pulse" />}>
              <LibrarySearch />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <Suspense fallback={<div>Loading filters...</div>}>
                <LibraryFilters />
              </Suspense>
            </div>
          </aside>

          {/* Worksheets Grid */}
          <main className="flex-1 min-w-0">
            <Suspense fallback={
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="bg-white rounded-lg border overflow-hidden animate-pulse">
                    <div className="aspect-[4/5] bg-gray-200" />
                    <div className="p-3 space-y-2">
                      <div className="h-4 bg-gray-200 rounded" />
                      <div className="h-3 bg-gray-200 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            }>
              <WorksheetLibraryBrowser />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
