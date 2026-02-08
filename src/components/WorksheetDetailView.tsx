'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { RelatedWorksheets } from '@/components/RelatedWorksheets'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Home, PlusCircle, ArrowLeft, LogOut, Loader2 } from 'lucide-react'
import type { LibraryWorksheet } from '@/lib/types/library'
import { createBrowserClient } from '@supabase/ssr'
import { yearGroupToDualLabel } from '@/lib/types/hub'
import { findParentTopic } from '@/lib/data/curriculum'

interface WorksheetDetailViewProps {
  worksheet: LibraryWorksheet
}

export function WorksheetDetailView({ worksheet }: WorksheetDetailViewProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function checkAdmin() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

          setIsAdmin(profile?.role === 'admin')
          console.log('WorksheetDetailView: isAdmin =', profile?.role === 'admin')
        }
      } catch (error) {
        console.error('WorksheetDetailView: Error checking admin status:', error)
      }
    }
    checkAdmin()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleGenerateSimilar = () => {
    // Store worksheet preview in sessionStorage for smooth restoration
    const worksheetPreview = {
      html: worksheet.html_content, // Fixed: Using correct field name 'html_content' instead of 'worksheet_html'
      metadata: {
        title: worksheet.title,
        topic: worksheet.topic,
        subtopic: worksheet.subtopic,
        difficulty: worksheet.difficulty || 'easy',
        questionCount: worksheet.question_count || 5,
        curriculum: 'Age-appropriate Mathematics',
        generatedAt: new Date().toISOString(),
      },
    }

    sessionStorage.setItem('resumeWorksheet', JSON.stringify(worksheetPreview))
    console.log('📋 Stored worksheet preview in sessionStorage:', {
      hasHtml: !!worksheetPreview.html,
      htmlLength: worksheetPreview.html?.length || 0,
      metadata: worksheetPreview.metadata
    })

    // Build query params from worksheet metadata
    const params = new URLSearchParams({
      yearGroup: worksheet.year_group,
      topic: worksheet.topic,
      subtopic: worksheet.subtopic,
      resumePreview: 'true', // Flag to indicate we should restore preview
    })

    // Add optional fields if they exist
    if (worksheet.layout_type) {
      params.append('layout', worksheet.layout_type)
    }
    // FRESHNESS: Don't pass visualTheme to allow variety on first regeneration
    // This prevents the "stale" experience of seeing the same theme again
    // The LLM will automatically vary themes for a fresh worksheet
    if (worksheet.difficulty) {
      params.append('difficulty', worksheet.difficulty)
    }
    if (worksheet.question_count) {
      params.append('questionCount', worksheet.question_count.toString())
    }

    // Navigate to dashboard with pre-filled config and preview
    router.push(`/create?${params.toString()}`)
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

      showSuccessMessage('PDF downloaded successfully!')

    } catch (error) {
      console.error('Failed to download PDF:', error)
      alert('Failed to download PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
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
                  <ArrowLeft className="w-4 h-4 inline mr-1" />
                  Back to Library
                </Link>
                <Link href="/create" className="text-gray-600 hover:text-blue-700 transition-colors">
                  <PlusCircle className="w-4 h-4 inline mr-1" />
                  Create Printable
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Button size="sm" variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb Navigation - Links to Hub Pages for SEO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumb items={(() => {
          const yearGroupSlug = worksheet.year_group.toLowerCase().replace(/\s+/g, '-')
          const resolvedTopic = findParentTopic(worksheet.year_group, worksheet.topic) || worksheet.topic
          const formatLabel = (str: string) => str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
          return [
            { label: 'Free Printables', href: '/free-printables' },
            { label: yearGroupToDualLabel(worksheet.year_group), href: `/free-printables/${yearGroupSlug}` },
            { label: formatLabel(resolvedTopic), href: `/free-printables/${yearGroupSlug}/${resolvedTopic}` },
            { label: worksheet.title, current: true }
          ]
        })()} />
      </div>

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
                <span className="text-gray-600">Grade Level:</span>
                <span className="font-medium">{yearGroupToDualLabel(worksheet.year_group)}</span>
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

            <TooltipProvider>
              <div className="space-y-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={`/library/${worksheet.slug}/interactive`} className="block w-full">
                      <Button
                        variant="default"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                        size="lg"
                      >
                        🎮 Interactive Mode
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Practice online with feedback and celebration upon completion! Perfect for tablets and computers.</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleDownloadPDF}
                      disabled={isGeneratingPDF}
                      className="w-full"
                      size="lg"
                    >
                      {isGeneratingPDF ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Generating PDF...
                        </>
                      ) : (
                        <>📥 Download PDF</>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download this worksheet as a ready-to-print PDF file</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={`/library/${worksheet.slug}/edit`} className="block w-full">
                      <Button
                        variant="outline"
                        className="w-full"
                        size="lg"
                      >
                        ✏️ Edit & Download
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Customize this worksheet by editing questions and images, then download</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>

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

        {/* Educational Benefits Section */}
        {worksheet.educational_benefits && (
          <div className="mt-8 bg-white rounded-lg border p-6">
            <h2 className="text-2xl font-bold mb-4">About This Worksheet</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{worksheet.educational_benefits}</p>
          </div>
        )}

        {/* Learning Objectives */}
        {worksheet.learning_objectives && worksheet.learning_objectives.length > 0 && (
          <div className="mt-6 bg-blue-50 rounded-lg border border-blue-200 p-6">
            <h3 className="text-xl font-bold mb-4">Learning Objectives</h3>
            <ul className="space-y-3">
              {worksheet.learning_objectives.map((obj, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* How to Use */}
        {worksheet.how_to_use && (
          <div className="mt-6 bg-white rounded-lg border p-6">
            <h3 className="text-xl font-bold mb-4">💡 How to Use This Worksheet</h3>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{worksheet.how_to_use}</p>
          </div>
        )}

        {/* Skills Developed */}
        {worksheet.skills_developed && worksheet.skills_developed.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Skills Developed</h3>
            <div className="flex flex-wrap gap-2">
              {worksheet.skills_developed.map((skill, i) => (
                <span key={i} className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {worksheet.faq && worksheet.faq.length > 0 && (
          <div className="mt-8 bg-white rounded-lg border p-6">
            <h3 className="text-2xl font-bold mb-6">❓ Frequently Asked Questions</h3>
            <div className="space-y-6">
              {worksheet.faq.map((item, i) => (
                <div key={i} className="border-b last:border-b-0 pb-4 last:pb-0">
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">{item.question}</h4>
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Worksheets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <RelatedWorksheets worksheetId={worksheet.id} />
      </div>
    </div>
  )
}
