'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { LibraryWorksheet } from '@/lib/types/library'

// Year group color system
const YEAR_COLORS: Record<string, string> = {
  'Reception': 'bg-purple-600',
  'Year 1': 'bg-blue-600',
  'Year 2': 'bg-green-600',
  'Year 3': 'bg-orange-600',
  'Year 4': 'bg-red-600',
  'Year 5': 'bg-teal-600',
  'Year 6': 'bg-pink-600',
}

// Check if worksheet is new (published within last 7 days)
function isNewWorksheet(publishedAt: string): boolean {
  const publishedDate = new Date(publishedAt)
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  return publishedDate >= weekAgo
}

// Check if worksheet is trending (high downloads recently)
function isTrendingWorksheet(worksheet: LibraryWorksheet): boolean {
  return worksheet.download_count > 1000
}

// Extract version from slug (e.g., "reception-counting-v2" → "V2")
function extractVersion(slug: string): string | null {
  const versionMatch = slug.match(/-v(\d+)$/)
  if (versionMatch) {
    return `V${versionMatch[1]}`
  }
  return null // First version (no suffix)
}

export function WorksheetLibraryBrowser() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [worksheets, setWorksheets] = useState<LibraryWorksheet[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const observerTarget = useRef<HTMLDivElement>(null)

  // Get sort from URL or default to 'newest' (use optional chaining for safety)
  const sortBy = searchParams?.get('sort') || 'newest'
  const initialPage = parseInt(searchParams?.get('page') || '0')

  useEffect(() => {
    async function loadWorksheets() {
      setLoading(true)
      setError(null)
      setHasMore(true)

      try {
        // If URL has page parameter (e.g., /library?page=2), load all pages up to that point
        const targetPage = Math.max(0, initialPage)
        const allWorksheets: LibraryWorksheet[] = []
        let lastHasMore = true

        // Load all pages from 0 to targetPage
        for (let pageNum = 0; pageNum <= targetPage; pageNum++) {
          const params = new URLSearchParams(searchParams?.toString() || '')
          if (!params.has('sort')) {
            params.set('sort', 'newest')
          }
          params.set('page', pageNum.toString())
          params.set('limit', '20')

          const response = await fetch(`/api/library/browse?${params.toString()}`)

          if (!response.ok) {
            throw new Error('Failed to load worksheets')
          }

          const data = await response.json()
          allWorksheets.push(...data.worksheets)
          lastHasMore = data.has_more

          // Stop if backend says no more results
          if (!data.has_more) {
            break
          }
        }

        setWorksheets(allWorksheets)
        setPage(targetPage)
        // Use the last page's has_more flag from backend
        setHasMore(lastHasMore)

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadWorksheets()
  }, [searchParams, initialPage])

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return

    setLoadingMore(true)
    const nextPage = page + 1

    try {
      const params = new URLSearchParams(searchParams?.toString() || '')
      params.set('page', nextPage.toString())
      params.set('limit', '20')
      params.set('sort', sortBy)

      const response = await fetch(`/api/library/browse?${params.toString()}`)

      if (!response.ok) {
        throw new Error('Failed to load more worksheets')
      }

      const data = await response.json()
      setWorksheets(prev => [...prev, ...data.worksheets])
      setPage(nextPage)
      setHasMore(data.has_more) // Use backend's has_more flag

      // Update URL for SEO and shareability using Next.js router (prevents hydration errors)
      const newParams = new URLSearchParams(searchParams?.toString() || '')
      newParams.set('page', nextPage.toString())
      router.replace(`/library?${newParams.toString()}`, { scroll: false })

    } catch (err) {
      console.error('Failed to load more:', err)
    } finally {
      setLoadingMore(false)
    }
  }, [loadingMore, hasMore, page, searchParams, sortBy])

  // Infinite scroll using IntersectionObserver
  // IMPORTANT: This must run AFTER worksheets load (when ref div is rendered)
  useEffect(() => {
    // Don't set up observer during initial loading or if no worksheets
    if (loading || worksheets.length === 0) {
      return;
    }

    const currentTarget = observerTarget.current
    if (!currentTarget) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore()
        }
      },
      { threshold: 0, rootMargin: '400px' } // Large rootMargin to trigger early during scroll
    )

    observer.observe(currentTarget)

    return () => {
      observer.unobserve(currentTarget)
    }
  }, [loading, worksheets.length, hasMore, loadingMore, loadMore])

  // Handle sort change
  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    params.set('sort', newSort)
    router.push(`/library?${params.toString()}`)
  }


  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-white rounded-lg border overflow-hidden animate-pulse">
            <div className="aspect-[4/5] bg-gray-200" />
            <div className="px-2 py-1.5 space-y-0">
              <div className="h-3 bg-gray-200 rounded mb-1" />
              <div className="h-2 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    )
  }

  if (worksheets.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-12 text-center">
        <p className="text-gray-500 text-lg">No worksheets found</p>
        <p className="text-gray-400 text-sm mt-2">
          Try adjusting your filters
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Header with count and sort controls */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {worksheets.length} worksheet{worksheets.length !== 1 ? 's' : ''}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-gray-600">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* 4-Column Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {worksheets.map((worksheet) => {
          const isNew = worksheet.published_at ? isNewWorksheet(worksheet.published_at) : false
          const isTrending = isTrendingWorksheet(worksheet)
          const yearColor = YEAR_COLORS[worksheet.year_group] || 'bg-gray-600'
          const version = extractVersion(worksheet.slug)

          return (
            <Link
              key={worksheet.id}
              href={`/library/${worksheet.slug}`}
              className="group bg-white rounded-lg border hover:shadow-2xl transition-all duration-300 overflow-hidden relative"
            >
              {/* Image Container - Expands on hover to fill entire card */}
              <div className="relative aspect-[4/5] group-hover:aspect-[4/7] bg-gray-100 overflow-hidden transition-all duration-300">
                <Image
                  src={worksheet.thumbnail_url}
                  alt={worksheet.title}
                  fill
                  className="object-cover object-top transition-all duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Year Group Badge - Top Right */}
                <div className={`absolute top-2 right-2 ${yearColor} text-white px-2 py-0.5 rounded text-[10px] font-semibold shadow-lg transition-all duration-300 group-hover:opacity-0 group-hover:scale-0`}>
                  {worksheet.year_group}
                </div>

                {/* Status Badge - Top Left */}
                {isNew && (
                  <div className="absolute top-2 left-2 bg-blue-500/90 backdrop-blur-sm text-white px-1.5 py-0.5 rounded text-[10px] font-bold transition-all duration-300 group-hover:opacity-0 group-hover:scale-0">
                    ⭐ NEW
                  </div>
                )}
                {isTrending && !isNew && (
                  <div className="absolute top-2 left-2 bg-red-500/90 backdrop-blur-sm text-white px-1.5 py-0.5 rounded text-[10px] font-bold transition-all duration-300 group-hover:opacity-0 group-hover:scale-0">
                    🔥 HOT
                  </div>
                )}

                {/* Download Count Badge - Bottom Right */}
                <div className="absolute bottom-2 right-2 bg-gray-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-semibold shadow-lg transition-all duration-300 group-hover:opacity-0 group-hover:scale-0">
                  ⬇ {worksheet.download_count.toLocaleString()}
                </div>

                {/* Version Badge - Bottom Left (only show for versions 2+) */}
                {version && (
                  <div className="absolute bottom-2 left-2 bg-amber-500/90 backdrop-blur-sm text-white px-1.5 py-0.5 rounded text-[10px] font-bold shadow-lg transition-all duration-300 group-hover:opacity-0 group-hover:scale-0">
                    📝 {version}
                  </div>
                )}

                {/* Hover instruction overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xs text-center font-medium">Click to view full worksheet</p>
                </div>
              </div>

              {/* Card Content - Ultra Compact, hidden on hover */}
              <div className="px-2 py-1.5 space-y-0 transition-all duration-300 group-hover:opacity-0 group-hover:h-0 group-hover:p-0 overflow-hidden">
                {/* Title - One Line with Ellipsis */}
                <h3 className="font-semibold text-gray-900 text-xs line-clamp-1 leading-snug">
                  {worksheet.title}
                </h3>

                {/* Metadata - One Line */}
                <p className="text-[10px] text-gray-600 line-clamp-1 leading-snug">
                  {worksheet.topic} • {worksheet.subtopic}
                </p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Infinite Scroll Trigger - Always render when hasMore, positioned AFTER grid */}
      <div ref={observerTarget} className="mt-8 min-h-[100px]">
        {loadingMore && hasMore && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg border overflow-hidden animate-pulse">
                <div className="aspect-[4/5] bg-gray-200" />
                <div className="px-2 py-1.5 space-y-0">
                  <div className="h-3 bg-gray-200 rounded mb-1" />
                  <div className="h-2 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}
        {!loadingMore && hasMore && (
          <div className="text-center text-sm text-gray-400">
            Scroll down to load more...
          </div>
        )}
      </div>

      {/* End of results message */}
      {!hasMore && worksheets.length > 0 && (
        <div className="mt-8 text-center py-8 border-t">
          <p className="text-sm text-gray-500">✓ You've viewed all worksheets</p>
          <p className="text-xs text-gray-400 mt-1">Total: {worksheets.length} worksheets</p>
        </div>
      )}
    </div>
  )
}
