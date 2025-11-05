'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import type { LibraryWorksheet } from '@/lib/types/library'

interface WorksheetDetailViewProps {
  worksheet: LibraryWorksheet
}

export function WorksheetDetailView({ worksheet }: WorksheetDetailViewProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)

    try {
      const response = await fetch('/api/library/download-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          worksheetId: worksheet.id,
          slug: worksheet.slug,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate PDF')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${worksheet.slug}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

    } catch (error) {
      console.error('Failed to download PDF:', error)
      alert('Failed to download PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg border p-6">
            <div className="aspect-[4/5] relative bg-gray-100 rounded overflow-hidden">
              <Image
                src={worksheet.thumbnail_url}
                alt={worksheet.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {worksheet.title}
              </h1>

              <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                <span>👁 {worksheet.view_count.toLocaleString()} views</span>
                <span>⬇ {worksheet.download_count.toLocaleString()} downloads</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Year Group:</span>
                <span className="font-medium">{worksheet.year_group}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Topic:</span>
                <span className="font-medium">{worksheet.topic}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subtopic:</span>
                <span className="font-medium">{worksheet.subtopic}</span>
              </div>
              {worksheet.visual_theme && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Theme:</span>
                  <span className="font-medium capitalize">
                    {worksheet.visual_theme}
                  </span>
                </div>
              )}
              {worksheet.activity_type && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Activity:</span>
                  <span className="font-medium">
                    {worksheet.activity_type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </span>
                </div>
              )}
              {worksheet.seasonal_theme && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Season:</span>
                  <span className="font-medium capitalize">
                    {worksheet.seasonal_theme}
                  </span>
                </div>
              )}
            </div>

            {worksheet.seo_description && (
              <div>
                <h2 className="font-semibold mb-2">About this worksheet</h2>
                <p className="text-gray-600">{worksheet.seo_description}</p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="w-full"
                size="lg"
              >
                {isGeneratingPDF ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Generating PDF...
                  </>
                ) : (
                  <>📥 Download PDF (Free)</>
                )}
              </Button>

              <Button variant="outline" className="w-full" size="lg">
                🔄 Generate Similar Worksheet
              </Button>
            </div>

            <div className="flex items-center justify-around pt-6 border-t text-sm text-gray-600">
              <div className="text-center">
                <div className="font-semibold text-lg text-gray-900">
                  {worksheet.download_count.toLocaleString()}
                </div>
                <div>Downloads</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg text-gray-900">
                  {worksheet.view_count.toLocaleString()}
                </div>
                <div>Views</div>
              </div>
            </div>

            {worksheet.tags && worksheet.tags.length > 0 && (
              <div className="pt-6 border-t">
                <div className="flex flex-wrap gap-2">
                  {worksheet.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
