'use client'

import { useEffect, useCallback, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Download, Gamepad2, ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { LibraryWorksheet } from '@/lib/types/library'
import { yearGroupToDualLabel } from '@/lib/types/hub'
import { trackPreviewOpen, trackPreviewNavigate, trackPreviewDownload } from '@/lib/utils/analytics'

interface WorksheetPreviewPanelProps {
  worksheet: LibraryWorksheet | null
  isOpen: boolean
  onClose: () => void
  onNavigate?: (direction: 'prev' | 'next') => void
  hasPrev?: boolean
  hasNext?: boolean
}

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

export function WorksheetPreviewPanel({
  worksheet,
  isOpen,
  onClose,
  onNavigate,
  hasPrev = false,
  hasNext = false,
}: WorksheetPreviewPanelProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  // Track preview open
  useEffect(() => {
    if (isOpen && worksheet) {
      trackPreviewOpen({
        id: worksheet.id,
        title: worksheet.title,
        yearGroup: worksheet.year_group,
        topic: worksheet.topic
      })
    }
  }, [isOpen, worksheet?.id])

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
      // Arrow key navigation
      if (e.key === 'ArrowLeft' && hasPrev && onNavigate) {
        onNavigate('prev')
      }
      if (e.key === 'ArrowRight' && hasNext && onNavigate) {
        onNavigate('next')
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent body scroll when panel is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, onNavigate, hasPrev, hasNext])

  // Handle PDF download
  const handleDownload = async () => {
    if (!worksheet) return
    setIsDownloading(true)

    // Track download start
    trackPreviewDownload({
      id: worksheet.id,
      title: worksheet.title,
      downloadType: 'pdf'
    })

    try {
      const response = await fetch('/api/library/download-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          worksheetId: worksheet.id,
          slug: worksheet.slug,
        }),
      })

      if (!response.ok) throw new Error('Failed to generate PDF')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${worksheet.slug}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  // Handle navigation with tracking
  const handleNavigate = (direction: 'prev' | 'next') => {
    if (onNavigate && worksheet) {
      trackPreviewNavigate(direction, worksheet.id)
      onNavigate(direction)
    }
  }

  if (!isOpen || !worksheet) return null

  const yearColor = YEAR_COLORS[worksheet.year_group] || 'bg-gray-600'

  return (
    <>
      {/* Backdrop overlay - covers grid but leaves it partially visible */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out panel */}
      <div
        className={`
          fixed top-0 right-0 h-full z-50
          w-full sm:w-[480px] lg:w-[520px]
          bg-[hsl(48,20%,99%)] shadow-2xl
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          flex flex-col
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-title"
      >
        {/* Header - Sticky */}
        <div className="flex-shrink-0 border-b border-[hsl(38,30%,85%)] bg-[hsl(48,20%,99%)] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Navigation arrows */}
            {onNavigate && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleNavigate('prev')}
                  disabled={!hasPrev}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors active:scale-95"
                  aria-label="Previous worksheet"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleNavigate('next')}
                  disabled={!hasNext}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors active:scale-95"
                  aria-label="Next worksheet"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
            <h2 id="preview-title" className="font-semibold text-gray-900 truncate text-lg">
              {worksheet.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0 active:scale-95"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          {/* Large thumbnail preview */}
          <div className="relative aspect-[4/5] bg-gray-100">
            <Image
              src={worksheet.thumbnail_url}
              alt={worksheet.title}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, 520px"
              priority
            />
          </div>

          {/* Metadata section */}
          <div className="p-4 space-y-4">
            {/* Badges row */}
            <div className="flex flex-wrap gap-2">
              <span className={`${yearColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                {yearGroupToDualLabel(worksheet.year_group)}
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {worksheet.topic}
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {worksheet.subtopic}
              </span>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                {worksheet.download_count.toLocaleString()} downloads
              </span>
              {worksheet.question_count && (
                <span>{worksheet.question_count} questions</span>
              )}
            </div>

            {/* Description if available */}
            {worksheet.description && (
              <p className="text-gray-600 text-sm leading-relaxed">
                {worksheet.description}
              </p>
            )}

            {/* Interactive mode discovery banner */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Gamepad2 className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">Try Interactive Mode</h3>
                  <p className="text-gray-600 text-xs mt-0.5">
                    Practice online with instant feedback - perfect for tablets!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Sticky CTAs */}
        <div className="flex-shrink-0 border-t border-[hsl(38,30%,85%)] bg-[hsl(48,20%,99%)] p-4 space-y-3">
          {/* Primary actions - stacked on mobile, side by side on larger */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-base active:scale-[0.98] transition-transform disabled:opacity-70"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </>
              )}
            </Button>
            <Link href={`/library/${worksheet.slug}/interactive`} className="flex-1">
              <Button
                variant="outline"
                className="w-full border-2 border-purple-600 text-purple-700 hover:bg-purple-50 font-semibold py-6 text-base active:scale-[0.98] transition-transform"
              >
                <Gamepad2 className="w-5 h-5 mr-2" />
                Interactive
              </Button>
            </Link>
          </div>

          {/* Secondary action - view full details */}
          <Link
            href={`/library/${worksheet.slug}`}
            className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors py-2"
          >
            View full details
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* Keyboard hint - shown on desktop */}
        <div className="hidden lg:block absolute bottom-20 left-4 text-xs text-gray-400">
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border text-[10px]">←</kbd>
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border text-[10px] ml-1">→</kbd>
          <span className="ml-2">to navigate</span>
          <span className="mx-2">•</span>
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border text-[10px]">ESC</kbd>
          <span className="ml-2">to close</span>
        </div>
      </div>
    </>
  )
}
