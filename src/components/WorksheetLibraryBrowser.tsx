'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { LibraryWorksheet } from '@/lib/types/library'

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg border p-4 animate-pulse">
            <div className="aspect-[4/5] bg-gray-200 rounded mb-3" />
            <div className="h-5 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {worksheets.map((worksheet) => (
          <Link
            key={worksheet.id}
            href={`/library/${worksheet.slug}`}
            className="bg-white rounded-lg border hover:shadow-lg transition-shadow"
          >
            <div className="aspect-[4/5] relative bg-gray-100 rounded-t-lg overflow-hidden">
              <Image
                src={worksheet.thumbnail_url}
                alt={worksheet.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 line-clamp-2">
                {worksheet.title}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                  {worksheet.year_group}
                </span>
                {worksheet.visual_theme && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                    {worksheet.visual_theme}
                  </span>
                )}
                {worksheet.seasonal_theme && (
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">
                    {worksheet.seasonal_theme}
                  </span>
                )}
              </div>

              <div className="mt-2 text-xs text-gray-500">
                ⬇ {worksheet.download_count.toLocaleString()} downloads
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
