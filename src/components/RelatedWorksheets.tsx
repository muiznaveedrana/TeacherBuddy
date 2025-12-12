'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import type { LibraryWorksheet } from '@/lib/types/library'

interface RelatedWorksheetsProps {
  worksheetId: string
}

export function RelatedWorksheets({ worksheetId }: RelatedWorksheetsProps) {
  const [worksheets, setWorksheets] = useState<LibraryWorksheet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/library/${worksheetId}/related`)
      .then(res => res.json())
      .then(data => {
        setWorksheets(data.worksheets || [])
        setLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load related worksheets:', error)
        setLoading(false)
      })
  }, [worksheetId])

  if (loading) {
    return (
      <div className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold">You may also like</h2>
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg border overflow-hidden animate-pulse">
              <div className="aspect-[4/5] bg-gray-200" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (worksheets.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">You may also like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {worksheets.map(worksheet => (
          <Link
            key={worksheet.id}
            href={`/library/${worksheet.slug}`}
            className="group bg-white rounded-lg border hover:shadow-lg transition-all duration-300"
          >
            {/* Worksheet Preview */}
            <div className="aspect-[4/5] relative bg-gray-100 overflow-hidden">
              <Image
                src={worksheet.thumbnail_url}
                alt={worksheet.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>

            {/* Worksheet Info */}
            <div className="p-3">
              <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 group-hover:text-blue-700 transition-colors">
                {worksheet.title}
              </h3>
              <p className="text-xs text-gray-600 mt-1">{worksheet.year_group}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <span>⬇ {worksheet.download_count}</span>
                <span>👁 {worksheet.view_count}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
