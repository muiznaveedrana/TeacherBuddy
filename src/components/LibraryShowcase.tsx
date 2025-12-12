'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Download, Eye, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { LibraryWorksheet } from '@/lib/types/library'

interface LibraryShowcaseProps {
  className?: string
}

export function LibraryShowcase({ className = '' }: LibraryShowcaseProps) {
  const [worksheets, setWorksheets] = useState<LibraryWorksheet[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch popular/recent worksheets on mount
  useEffect(() => {
    const fetchWorksheets = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/library/browse?sort=popular&limit=6')

        if (!response.ok) {
          throw new Error('Failed to fetch worksheets')
        }

        const data = await response.json()
        setWorksheets(data.worksheets || [])
      } catch (err) {
        console.error('Error fetching library worksheets:', err)
        setError('Failed to load worksheets')
      } finally {
        setLoading(false)
      }
    }

    fetchWorksheets()
  }, [])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? worksheets.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === worksheets.length - 1 ? 0 : prev + 1))
  }

  if (loading) {
    return (
      <div className={`h-full flex items-center justify-center ${className}`}>
        <div className="text-center p-6">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-slate-600">Loading popular worksheets...</p>
        </div>
      </div>
    )
  }

  if (error || worksheets.length === 0) {
    return (
      <div className={`h-full flex items-center justify-center bg-slate-50 ${className}`}>
        <div className="text-center p-6">
          <p className="text-sm text-slate-600 mb-2">
            {error || 'No worksheets available'}
          </p>
          <Link href="/library">
            <Button variant="outline" size="sm">
              Browse Library
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const currentWorksheet = worksheets[currentIndex]

  return (
    <div className={`h-full flex flex-col bg-slate-50 ${className}`}>
      {/* Main Instruction Header */}
      <div className="px-6 pt-8 pb-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-b-2 border-blue-200">
        <div className="text-center max-w-xl mx-auto">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
              <span className="text-3xl">📝</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Printable Preview Area
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Configure your printable using the panel on the left, then click <strong>"Generate Printable"</strong> below to see your personalized printable here.
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs text-blue-700 bg-blue-100 px-4 py-2 rounded-full inline-flex">
              <span className="font-medium">💡 Quick Start:</span>
              <span>Layout → Year Group → Topic → Subtopic → Generate</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-600 bg-slate-100 px-4 py-2 rounded-full inline-flex">
              <span className="font-medium">⏱️ Generation Time:</span>
              <span>Typically 15-20 seconds for personalized, curriculum-aligned content</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Carousel Section */}
      <div className="px-6 py-4 border-b bg-white">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 text-center">
          Or browse popular worksheets from our free library
        </p>
      </div>

      {/* Carousel Content - Compact */}
      <div className="flex items-center justify-center px-4 py-4 relative bg-white">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all hover:scale-110"
          aria-label="Previous worksheet"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all hover:scale-110"
          aria-label="Next worksheet"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        {/* Worksheet Card - Compact */}
        <div className="max-w-sm w-full">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            {/* Thumbnail - Smaller */}
            <div className="relative bg-gray-100 aspect-[3/4] overflow-hidden">
              {currentWorksheet.thumbnail_url ? (
                <img
                  src={currentWorksheet.thumbnail_url}
                  alt={currentWorksheet.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100">
                  <div className="text-center p-4">
                    <div className="text-4xl mb-2">📝</div>
                    <p className="text-sm text-gray-600">Worksheet Preview</p>
                  </div>
                </div>
              )}

              {/* Badge overlay */}
              {currentWorksheet.download_count > 50 && (
                <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  ⭐ Popular
                </div>
              )}
            </div>

            {/* Content - Compact */}
            <div className="p-3">
              <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                {currentWorksheet.title}
              </h4>

              {/* Meta info */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700">
                  {currentWorksheet.year_group}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-700">
                  {currentWorksheet.topic}
                </span>
                {currentWorksheet.visual_theme && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700">
                    {currentWorksheet.visual_theme}
                  </span>
                )}
              </div>

              {/* Stats - Compact */}
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  <span>{currentWorksheet.download_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{currentWorksheet.view_count}</span>
                </div>
              </div>

              {/* Action Button - Single Compact */}
              <Link href={`/library/${currentWorksheet.slug}`} className="block">
                <Button size="sm" className="w-full text-xs bg-blue-600 hover:bg-blue-700 h-8">
                  View & Download
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators - Compact */}
      <div className="flex justify-center gap-1.5 py-3 bg-white">
        {worksheets.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-blue-600 w-6'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to worksheet ${index + 1}`}
          />
        ))}
      </div>

      {/* Footer CTA - Compact */}
      <div className="px-4 py-3 border-t bg-slate-50">
        <div className="text-center">
          <Link href="/library">
            <Button variant="outline" size="sm" className="text-xs h-8 px-4">
              Browse 100+ More Worksheets →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
