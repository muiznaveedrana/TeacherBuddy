'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
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
  const [worksheets, setWorksheets] = useState<LibraryWorksheet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadWorksheets() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `/api/library/browse?${searchParams.toString()}`
        )

        if (!response.ok) {
          throw new Error('Failed to load worksheets')
        }

        const data = await response.json()
        setWorksheets(data.worksheets)

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadWorksheets()
  }, [searchParams])


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
      <div className="mb-4 text-sm text-gray-600">
        Showing {worksheets.length} worksheet{worksheets.length !== 1 ? 's' : ''}
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
    </div>
  )
}
