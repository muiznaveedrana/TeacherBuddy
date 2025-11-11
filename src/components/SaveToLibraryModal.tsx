'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import type { SaveToLibraryMetadata } from '@/lib/types/library'

interface SaveToLibraryModalProps {
  isOpen: boolean
  onClose: () => void
  worksheetHtml: string
  showAnswers: boolean
  metadata: SaveToLibraryMetadata
  onSuccess?: (worksheet: any) => void
}

export function SaveToLibraryModal({
  isOpen,
  onClose,
  worksheetHtml,
  showAnswers,
  metadata: initialMetadata,
  onSuccess,
}: SaveToLibraryModalProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [metadata, setMetadata] = useState<SaveToLibraryMetadata>(initialMetadata)

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)

    try {
      console.log('💾 SaveToLibraryModal received HTML:', {
        length: worksheetHtml.length,
        preview: worksheetHtml.substring(0, 200)
      })

      // Clean the HTML before saving (same logic as PDF download)
      let cleanedHtml = worksheetHtml
      const parser = new DOMParser()
      const doc = parser.parseFromString(cleanedHtml, 'text/html')

      // Remove answer key if toggle is OFF
      if (!showAnswers) {
        const answerKeyElement = doc.querySelector('.answer-key')
        if (answerKeyElement) {
          answerKeyElement.remove()
          console.log('🗑️ Removed answer key from library save (showAnswers = false)')
        }
      }

      // Remove worksheet header (metrics) for cleaner library screenshots
      const headerElement = doc.querySelector('.worksheet-header')
      if (headerElement) {
        headerElement.remove()
        console.log('🗑️ Removed worksheet header (metrics) from library save')
      }

      cleanedHtml = doc.documentElement.outerHTML

      const response = await fetch('/api/library/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          worksheetHtml: cleanedHtml,
          metadata,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save to library')
      }

      console.log('✅ Worksheet saved:', result.worksheet)
      setSuccess(true)

      if (onSuccess) {
        onSuccess(result.worksheet)
      }

      // Auto-redirect to library after 1.5 seconds using client-side navigation
      setTimeout(() => {
        router.push('/library')
      }, 1500)

    } catch (err) {
      console.error('❌ Save failed:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Save to Library</DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-green-600">
              Published to Library!
            </h3>
            <p className="text-gray-600 mt-2">
              Opening library...
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">
                Worksheet Info
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Year:</span> {metadata.year_group}
                </div>
                <div>
                  <span className="font-medium">Topic:</span> {metadata.topic}
                </div>
                <div>
                  <span className="font-medium">Subtopic:</span> {metadata.subtopic}
                </div>
                {metadata.visual_theme && (
                  <div>
                    <span className="font-medium">Theme:</span> {metadata.visual_theme}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={metadata.title}
                  onChange={(e) =>
                    setMetadata({ ...metadata, title: e.target.value })
                  }
                  placeholder="Reception - Counting to 10"
                />
              </div>

              <div>
                <Label htmlFor="seo_title">SEO Title</Label>
                <Input
                  id="seo_title"
                  value={metadata.seo_title || ''}
                  onChange={(e) =>
                    setMetadata({ ...metadata, seo_title: e.target.value })
                  }
                  placeholder="Free Reception Counting Worksheet"
                  maxLength={60}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Max 60 characters for Google
                </p>
              </div>

              <div>
                <Label htmlFor="seo_description">SEO Description</Label>
                <Textarea
                  id="seo_description"
                  value={metadata.seo_description || ''}
                  onChange={(e) =>
                    setMetadata({
                      ...metadata,
                      seo_description: e.target.value,
                    })
                  }
                  placeholder="Download free Reception counting worksheet..."
                  rows={3}
                  maxLength={160}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Max 160 characters for Google
                </p>
              </div>

              <div>
                <Label htmlFor="activity_type">Activity Type (for uniqueness)</Label>
                <Input
                  id="activity_type"
                  value={metadata.activity_type || ''}
                  onChange={(e) =>
                    setMetadata({ ...metadata, activity_type: e.target.value })
                  }
                  placeholder="e.g., circle-answer, fill-blanks, matching"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Helps differentiate similar worksheets
                </p>
              </div>

              <div>
                <Label htmlFor="seasonal_theme">Seasonal Theme (optional)</Label>
                <Input
                  id="seasonal_theme"
                  value={metadata.seasonal_theme || ''}
                  onChange={(e) =>
                    setMetadata({ ...metadata, seasonal_theme: e.target.value })
                  }
                  placeholder="e.g., christmas, halloween, summer"
                />
                <p className="text-xs text-gray-500 mt-1">
                  For holiday-specific versions
                </p>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={metadata.tags?.join(', ') || ''}
                  onChange={(e) =>
                    setMetadata({
                      ...metadata,
                      tags: e.target.value
                        .split(',')
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="reception, counting, numbers"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                <strong>Error:</strong> {error}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={onClose} disabled={isSaving}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Saving...
                  </>
                ) : (
                  'Save to Library'
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
