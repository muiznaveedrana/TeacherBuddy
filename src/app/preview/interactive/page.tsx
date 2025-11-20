'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { InteractiveModeV2 } from '@/components/worksheet/InteractiveModeV2'

export default function PreviewInteractivePage() {
  const router = useRouter()
  const [worksheetHtml, setWorksheetHtml] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get HTML from sessionStorage
    const html = sessionStorage.getItem('previewWorksheetHtml')

    if (!html) {
      // No worksheet to preview, redirect to create page
      console.error('❌ No worksheet HTML in sessionStorage, redirecting to /create')
      router.push('/create')
      return
    }

    // Debug: Check if answer key is in the HTML
    console.log('📋 Preview HTML length:', html.length)
    console.log('📋 Has answer-key class:', html.includes('answer-key'))
    console.log('📋 Has answer-key-content class:', html.includes('answer-key-content'))

    // Show first 500 characters of HTML
    console.log('📋 First 500 characters:', html.substring(0, 500))

    // Look for answer key in the HTML string
    const answerKeyIndex = html.indexOf('answer-key')
    if (answerKeyIndex >= 0) {
      console.log('📋 Found "answer-key" at index:', answerKeyIndex)
      console.log('📋 Context around answer-key:', html.substring(Math.max(0, answerKeyIndex - 50), answerKeyIndex + 200))
    } else {
      console.error('❌ "answer-key" string NOT found in HTML!')
    }

    // Check if answer key section exists in the HTML
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const answerKeySection = doc.querySelector('.answer-key')
    const answerKeyContent = doc.querySelector('.answer-key-content')
    console.log('📋 Answer key section found:', !!answerKeySection)
    console.log('📋 Answer key content found:', !!answerKeyContent)

    if (answerKeySection) {
      console.log('📋 Answer key section HTML:', answerKeySection.outerHTML.substring(0, 500))
    }

    if (answerKeyContent) {
      const paragraphs = answerKeyContent.querySelectorAll('p')
      console.log('📋 Answer key paragraphs:', paragraphs.length)
      paragraphs.forEach((p, i) => {
        console.log(`   ${i + 1}. ${p.textContent}`)
      })
    } else {
      console.error('❌ Answer key content div NOT found in parsed DOM!')

      // Try to debug why
      console.log('🔍 All divs with "answer" in class name:')
      const answerDivs = doc.querySelectorAll('div[class*="answer"]')
      answerDivs.forEach(div => {
        console.log(`   - ${div.className}`)
      })
    }

    setWorksheetHtml(html)
    setLoading(false)

    // Clear sessionStorage after loading (optional - keeps it for refresh)
    // sessionStorage.removeItem('previewWorksheetHtml')
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading interactive worksheet...</p>
        </div>
      </div>
    )
  }

  if (!worksheetHtml) {
    return null // Will redirect
  }

  // Create a mock worksheet object for InteractiveModeV2
  const mockWorksheet = {
    id: 'preview',
    slug: 'preview',
    title: 'Worksheet Preview',
    html_content: worksheetHtml,
    year_group: 'Preview',
    topic: 'Preview',
    subtopic: 'Preview',
    status: 'draft' as const,
    region: 'UK',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    view_count: 0,
    download_count: 0
  }

  const handleExit = () => {
    // Navigate back to create page
    router.push('/create')
  }

  return (
    <div className="min-h-screen">
      <InteractiveModeV2
        htmlContent={worksheetHtml}
        worksheet={mockWorksheet}
        onExit={handleExit}
      />
    </div>
  )
}
