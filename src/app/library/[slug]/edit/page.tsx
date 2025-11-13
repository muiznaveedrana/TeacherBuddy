'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { WorksheetEditor } from '@/components/worksheet/WorksheetEditor'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Download, Save, Loader2, Home, Library, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import type { LibraryWorksheet } from '@/lib/types/library'

interface Mascot {
  id: string
  src: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
  opacity: number
  zIndex: number
  locked: boolean
}

export default function EditWorksheetPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string

  const [worksheet, setWorksheet] = useState<LibraryWorksheet | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMode, setSaveMode] = useState<'download' | 'update' | 'new'>('download')
  const [editedContent, setEditedContent] = useState<string>('')
  const [editedMascots, setEditedMascots] = useState<Mascot[]>([])

  // Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Fetch worksheet and check admin status
  useEffect(() => {
    async function loadWorksheet() {
      try {
        // Fetch worksheet by slug
        const { data: worksheetData, error: worksheetError } = await supabase
          .from('library_worksheets')
          .select('*')
          .eq('slug', slug)
          .single()

        if (worksheetError) throw worksheetError
        setWorksheet(worksheetData)

        // Check if user is admin
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('role')
            .eq('id', user.id)
            .single()

          setIsAdmin(profile?.role === 'admin')
        }
      } catch (error) {
        console.error('Error loading worksheet:', error)
        alert('Failed to load worksheet')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      loadWorksheet()
    }
  }, [slug])

  const handleSave = (content: string, mascots?: Mascot[]) => {
    console.log('📝 EDIT: handleSave called with mascots:', mascots?.length || 0)
    setEditedContent(content)
    setEditedMascots(mascots || [])
  }

  const handleDownloadPDF = async () => {
    if (!editedContent && !worksheet) return

    setSaving(true)
    try {
      let htmlContent = editedContent || worksheet!.html_content
      console.log('📥 EDIT: Download starting. editedMascots:', editedMascots.length, 'worksheet mascots:', (worksheet!.mascots as Mascot[] || []).length)
      const mascots = editedMascots.length > 0 ? editedMascots : (worksheet!.mascots as Mascot[] || [])

      // Inject mascots into HTML (same pattern as create page)
      if (mascots && mascots.length > 0) {
        console.log(`🎭 EDIT PDF: Processing ${mascots.length} mascots for injection`)
        const parser = new DOMParser()
        const doc = parser.parseFromString(htmlContent, 'text/html')
        const body = doc.body

        if (body) {
          // Add body style for relative positioning
          const bodyStyle = doc.createElement('style')
          bodyStyle.textContent = 'body { position: relative; }'
          doc.head.appendChild(bodyStyle)

          // Create mascot container
          const mascotContainer = doc.createElement('div')
          mascotContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 9999;
          `

          // Convert mascot images to base64 and add them
          const mascotPromises = mascots.map(async (mascot, index) => {
            try {
              console.log(`🎭 EDIT PDF: Loading mascot ${index + 1}/${mascots.length}: ${mascot.src}`)
              const response = await fetch(mascot.src)
              const blob = await response.blob()
              const base64 = await new Promise<string>((resolve) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result as string)
                reader.readAsDataURL(blob)
              })

              const mascotDiv = doc.createElement('div')
              mascotDiv.style.cssText = `
                position: absolute;
                left: ${mascot.x}px;
                top: ${mascot.y}px;
                width: ${mascot.width}px;
                height: ${mascot.height}px;
                z-index: ${mascot.zIndex};
                opacity: ${mascot.opacity};
                transform: rotate(${mascot.rotation}deg);
                pointer-events: none;
              `

              const img = doc.createElement('img')
              img.src = base64
              img.alt = 'Mascot'
              img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: contain;
              `

              mascotDiv.appendChild(img)
              mascotContainer.appendChild(mascotDiv)
              console.log(`✅ EDIT PDF: Mascot ${index + 1} added successfully`)
            } catch (error) {
              console.error(`❌ EDIT PDF: Failed to load mascot ${index + 1}:`, mascot.src, error)
            }
          })

          await Promise.all(mascotPromises)
          console.log(`🎭 EDIT PDF: All mascots processed. Container has ${mascotContainer.children.length} children`)
          body.appendChild(mascotContainer)
          htmlContent = doc.documentElement.outerHTML
        }
      }

      const response = await fetch('/api/library/download-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          worksheetId: worksheet!.id,
          slug: worksheet!.slug,
          customHtml: htmlContent, // HTML with mascots already injected
        }),
      })

      if (!response.ok) throw new Error('PDF generation failed')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${worksheet!.slug}-edited.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

      showSuccessMessage('PDF downloaded successfully!')
    } catch (error) {
      console.error('Download error:', error)
      alert('Failed to download PDF')
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateLibrary = async () => {
    if (!isAdmin || !editedContent) return

    setSaving(true)
    try {
      const response = await fetch(`/api/library/${worksheet!.id}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html_content: editedContent,
          mascots: editedMascots
        }),
      })

      if (!response.ok) throw new Error('Update failed')

      showSuccessMessage('Library worksheet updated successfully!')
      setTimeout(() => router.push(`/library/${slug}`), 1500)
    } catch (error) {
      console.error('Update error:', error)
      alert('Failed to update library worksheet')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveAsNew = async () => {
    if (!isAdmin || !editedContent || !worksheet) return

    setSaving(true)
    try {
      const response = await fetch('/api/library/create-version', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          original_id: worksheet.id,
          title: `${worksheet.title} (v${Date.now()})`,
          html_content: editedContent,
          mascots: editedMascots,
          year_group: worksheet.year_group,
          topic: worksheet.topic,
          subtopic: worksheet.subtopic,
          difficulty: worksheet.difficulty,
          question_count: worksheet.question_count
        }),
      })

      if (!response.ok) throw new Error('Save as new failed')

      const { slug: newSlug } = await response.json()
      showSuccessMessage('New version saved successfully!')
      setTimeout(() => router.push(`/library/${newSlug}`), 1500)
    } catch (error) {
      console.error('Save as new error:', error)
      alert('Failed to save as new version')
    } finally {
      setSaving(false)
    }
  }

  const showSuccessMessage = (message: string) => {
    const toast = document.createElement('div')
    toast.textContent = message
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.2);
      z-index: 99999;
      font-weight: 600;
      animation: slideIn 0.3s ease-out;
    `
    document.body.appendChild(toast)
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-out'
      setTimeout(() => toast.remove(), 300)
    }, 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!worksheet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Worksheet Not Found</h1>
          <Link href="/library">
            <Button>Back to Library</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center">
                <h1 className="text-xl font-bold text-blue-700">FreeMathPrintable.com</h1>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-gray-600 hover:text-blue-700 transition-colors">
                  <Home className="w-4 h-4 inline mr-1" />
                  Home
                </Link>
                <Link href="/library" className="text-gray-600 hover:text-blue-700 transition-colors">
                  <Library className="w-4 h-4 inline mr-1" />
                  Browse Library
                </Link>
                <Link href="/create" className="text-gray-600 hover:text-blue-700 transition-colors">
                  <PlusCircle className="w-4 h-4 inline mr-1" />
                  Create Worksheet
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 hidden md:block">Editing: {worksheet.title}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Editor */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WorksheetEditor
          htmlContent={worksheet.html_content}
          initialMascots={worksheet.mascots as Mascot[] | undefined}
          onSave={handleSave}
        />

        {/* Save Options */}
        <Card className="mt-6 p-6">
          <h2 className="text-lg font-semibold mb-4">Save Options</h2>

          {isAdmin && (
            <div className="mb-4 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="saveMode"
                  value="download"
                  checked={saveMode === 'download'}
                  onChange={(e) => setSaveMode(e.target.value as any)}
                  className="w-4 h-4"
                />
                <span>Download PDF only (don't update library)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="saveMode"
                  value="update"
                  checked={saveMode === 'update'}
                  onChange={(e) => setSaveMode(e.target.value as any)}
                  className="w-4 h-4"
                />
                <span>Update library worksheet</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="saveMode"
                  value="new"
                  checked={saveMode === 'new'}
                  onChange={(e) => setSaveMode(e.target.value as any)}
                  className="w-4 h-4"
                />
                <span>Save as new version</span>
              </label>
            </div>
          )}

          <div className="flex gap-3">
            <Link href={`/library/${slug}`}>
              <Button variant="outline" disabled={saving}>
                Cancel
              </Button>
            </Link>

            {saveMode === 'download' && (
              <Button
                onClick={handleDownloadPDF}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </>
                )}
              </Button>
            )}

            {isAdmin && saveMode === 'update' && (
              <Button
                onClick={handleUpdateLibrary}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Update Library
                  </>
                )}
              </Button>
            )}

            {isAdmin && saveMode === 'new' && (
              <Button
                onClick={handleSaveAsNew}
                disabled={saving}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save as New Version
                  </>
                )}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
