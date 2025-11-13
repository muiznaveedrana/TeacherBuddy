'use client'

import React, { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Navigation } from '@/components/ui/navigation'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Footer } from '@/components/ui/footer'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Download, Info, Loader2, AlertCircle, Edit3, Eye, Home, Library, PlusCircle, LogOut } from 'lucide-react'
import WelcomeTour from '@/components/WelcomeTour'
import { PullToRefresh } from '@/components/mobile/PullToRefresh'
import { YEAR_GROUPS } from '@/lib/data/curriculum'
import { LAYOUT_TEMPLATES, DEFAULT_LAYOUT, getLayoutOptions } from '@/lib/data/layouts'
import type { LayoutType, VisualTheme } from '@/lib/types/worksheet'
import { EnhancedConfigurationPanel } from '@/components/worksheet/EnhancedConfigurationPanel'
import { WorksheetEditor } from '@/components/worksheet/WorksheetEditor'
import { SaveToLibraryModal } from '@/components/SaveToLibraryModal'
import { generateLibraryMetadata } from '@/lib/helpers/metadataGenerator'
import { createBrowserClient } from '@supabase/ssr'
import { LibraryShowcase } from '@/components/LibraryShowcase'

export const dynamic = 'force-dynamic'

const mockNameLists = [
  { value: 'year3-class-a', label: 'Year 3 Class A (25 students)' },
  { value: 'year4-maths-group', label: 'Year 4 Maths Group (18 students)' },
  { value: 'reception-class', label: 'Reception Class (20 students)' }
]

type GenerationState = 'idle' | 'generating' | 'completed' | 'error'
type DifficultyLevel = 'easy' | 'average' | 'hard'

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

interface GeneratedWorksheet {
  title: string
  html: string
  mascots?: Mascot[]
  metadata: {
    topic: string
    subtopic: string
    difficulty: string
    questionCount: number
    curriculum: string
    generatedAt: string
  }
}

function DashboardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [showTour, setShowTour] = useState(false)
  const [fromLibrary, setFromLibrary] = useState(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  // Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Ref to preserve subtopic from URL params during subtopics loading
  const pendingSubtopicRef = useRef<string | null>(null)

  // Ref to track if we've already restored from sessionStorage (prevent double-restoration in React Strict Mode)
  const hasRestoredRef = useRef(false)

  // Configuration state
  const [layout, setLayout] = useState<LayoutType>(DEFAULT_LAYOUT) // Layout selection drives template
  const [yearGroup, setYearGroup] = useState<string>('Year 1') // Default from mock profile - NOW FIRST
  const [availableTopics, setAvailableTopics] = useState<{value: string, label: string}[]>([])
  const [availableSubtopics, setAvailableSubtopics] = useState<{value: string, label: string}[]>([])
  const [topic, setTopic] = useState<string>('')
  const [subtopic, setSubtopic] = useState<string>('')
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy')
  const [questionCount, setQuestionCount] = useState<number>(5)
  const [nameList, setNameList] = useState<string>('')
  const [showAnswers, setShowAnswers] = useState<boolean>(false) // Default: hide answers
  const [editMode, setEditMode] = useState<boolean>(false) // Toggle between view and edit modes

  // Enhanced configuration state (USP.2)
  const [visualTheme, setVisualTheme] = useState<VisualTheme | undefined>(undefined)
  
  // Generation state
  const [generationState, setGenerationState] = useState<GenerationState>('idle')
  const [progress, setProgress] = useState<number>(0)
  const [generatedWorksheet, setGeneratedWorksheet] = useState<GeneratedWorksheet | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [loadingTopics, setLoadingTopics] = useState<boolean>(false)
  const [loadingSubtopics, setLoadingSubtopics] = useState<boolean>(false)
  const [pdfGenerating, setPdfGenerating] = useState<boolean>(false)
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false)

  // Cross-iteration freshness tracking
  const [previousWorksheets, setPreviousWorksheets] = useState<Array<{ questions: string[]; images: string[] }>>([])

  // FRESHNESS FIX: Use ref for synchronous access (bypasses React's async state batching)
  // The ref always holds the current value, even during re-renders
  const previousWorksheetsRef = useRef<Array<{ questions: string[]; images: string[] }>>([])

  // Check if user is admin on mount
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()
        setIsAdmin(profile?.role === 'admin')
      }
    }
    checkAdmin()
  }, [])

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  // 🔍 DEBUG: Log worksheet history state changes
  useEffect(() => {
    console.log('🔍 DASHBOARD: previousWorksheets state updated:', previousWorksheets.length, 'worksheets')
    console.log('🔍 DASHBOARD: Current history:', previousWorksheets)
  }, [previousWorksheets])

  // Pre-fill configuration from query parameters (for "Generate Similar" feature)
  useEffect(() => {
    if (searchParams) {
      const yearGroupParam = searchParams.get('yearGroup')
      const topicParam = searchParams.get('topic')
      const subtopicParam = searchParams.get('subtopic')
      const layoutParam = searchParams.get('layout')
      const visualThemeParam = searchParams.get('visualTheme')
      const difficultyParam = searchParams.get('difficulty')
      const questionCountParam = searchParams.get('questionCount')
      const resumePreviewParam = searchParams.get('resumePreview')

      // Check if user came from library
      if (resumePreviewParam === 'true') {
        setFromLibrary(true)
      }

      if (yearGroupParam) setYearGroup(yearGroupParam)
      if (topicParam) setTopic(topicParam)
      // Store subtopic in ref to preserve it during subtopics loading
      if (subtopicParam) {
        pendingSubtopicRef.current = subtopicParam
        setSubtopic(subtopicParam)
      }
      if (layoutParam) setLayout(layoutParam as LayoutType)
      if (visualThemeParam) setVisualTheme(visualThemeParam as VisualTheme)
      if (difficultyParam) setDifficulty(difficultyParam as DifficultyLevel)
      if (questionCountParam) setQuestionCount(parseInt(questionCountParam))

      // Restore worksheet preview from sessionStorage (only once, prevent double-restoration in Strict Mode)
      if (resumePreviewParam === 'true' && !hasRestoredRef.current) {
        const storedWorksheet = sessionStorage.getItem('resumeWorksheet')
        console.log('📋 Attempting to restore worksheet from sessionStorage:', storedWorksheet ? 'Found' : 'Not found')

        if (storedWorksheet) {
          try {
            const worksheetData = JSON.parse(storedWorksheet)
            console.log('📋 Parsed worksheet data:', worksheetData)

            setGeneratedWorksheet({
              title: worksheetData.metadata.title,
              html: worksheetData.html,
              metadata: worksheetData.metadata,
            })
            setGenerationState('completed')
            hasRestoredRef.current = true // Mark as restored
            console.log('✅ Restored worksheet preview from sessionStorage')
            console.log('✅ generatedWorksheet set, generationState set to completed')

            // FRESHNESS: For library worksheets, auto-select a random age-appropriate visual theme
            // This prevents the "stale" experience of regenerating the same theme
            if (!visualThemeParam && yearGroupParam) {
              // Age-appropriate theme selection based on year group
              let variedThemes: VisualTheme[] = []

              if (['Reception', 'Year 1', 'Year 2'].includes(yearGroupParam)) {
                // Younger students: animals and food
                variedThemes = ['animals', 'food']
              } else if (['Year 3', 'Year 4'].includes(yearGroupParam)) {
                // Middle years: animals, food, and sports
                variedThemes = ['animals', 'food', 'sports']
              } else {
                // Older students: all themes including space
                variedThemes = ['animals', 'food', 'sports', 'space']
              }

              const randomTheme = variedThemes[Math.floor(Math.random() * variedThemes.length)]
              setVisualTheme(randomTheme)
              console.log(`🎲 Auto-selected random visual theme for ${yearGroupParam}: ${randomTheme}`)
            }

            // Clear the stored worksheet to prevent re-restoration
            sessionStorage.removeItem('resumeWorksheet')
          } catch (error) {
            console.error('❌ Failed to restore worksheet preview:', error)
          }
        } else {
          console.warn('⚠️ No worksheet found in sessionStorage, but resumePreview=true')
        }
      }

      console.log('✅ Pre-filled configuration from query params:', {
        yearGroupParam,
        topicParam,
        subtopicParam,
        layoutParam,
        visualThemeParam,
        difficultyParam,
        questionCountParam,
        resumePreviewParam
      })
    }
  }, [searchParams])

  const hasConfiguration = layout && yearGroup && topic && subtopic

  const canGenerate = hasConfiguration && generationState !== 'generating'
  const showPreview = generationState === 'completed' && generatedWorksheet
  const showAds = generationState === 'idle' // Only show ads when idle, not during generation
  const showError = generationState === 'error'
  const showGenerating = generationState === 'generating' // Show generating state explicitly

  // Debug logging for preview state
  console.log('🔍 Preview state:', {
    generationState,
    hasGeneratedWorksheet: !!generatedWorksheet,
    showPreview,
    worksheetHtml: generatedWorksheet?.html ? `${generatedWorksheet.html.length} chars` : 'none'
  })
  
  // Curriculum hierarchy state
  const isTopicDisabled = !yearGroup || loadingTopics
  const isSubtopicDisabled = !yearGroup || !topic || loadingSubtopics

  // Extract objects and images from generated worksheet HTML for freshness tracking
  const extractWorksheetData = (html: string): { questions: string[]; images: string[] } => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')

    // Extract question text from worksheet body only (avoid navigation/header noise)
    const questions: string[] = []
    const worksheetBody = doc.querySelector('.worksheet-preview') || doc.body
    const textContent = worksheetBody.textContent || ''

    // Use regex to extract only real counting objects (nouns that appear in counting contexts)
    // This matches patterns like "5 apples", "count the pears", "how many butterflies"
    const objectPattern = /\b(apples?|pears?|oranges?|bananas?|grapes?|strawberr(?:y|ies)|cherr(?:y|ies)|watermelons?|lemons?|peaches?|plums?|flowers?|roses?|tulips?|daisies?|sunflowers?|butterfl(?:y|ies)|bees?|ladybugs?|ants?|spiders?|birds?|chickens?|cows?|pigs?|sheep|horses?|dogs?|cats?|frogs?|fish|ducks?|rabbits?|bears?|elephants?|lions?|tigers?|monkeys?|giraffes?|cars?|trucks?|buses?|trains?|planes?|boats?|bicycles?|pencils?|pens?|crayons?|markers?|books?|scissors?|rulers?|erasers?|balls?|blocks?|toys?|dolls?|teddy bears?|stars?|hearts?|circles?|squares?|triangles?|diamonds?|cookies?|cupcakes?|candies?|lollipops?|carrots?|tomatoes?|potatoes?|corn|broccoli|peas?|balloons?|presents?|candles?|hats?|shoes?|socks?|shirts?|buttons?|leaves?|trees?|acorns?|shells?|rocks?|feathers?|ribbons?|saws?|caterpillars?|snails?|snakes?|paintbrushes?|wrenches?|hammers?|goats?|scarves?|sticks?)\b/gi

    let match
    const foundObjects = new Set<string>()
    while ((match = objectPattern.exec(textContent)) !== null) {
      // Normalize to singular lowercase form
      let obj = match[1].toLowerCase()

      // Handle special plural forms
      if (obj.endsWith('ies') && !obj.endsWith('cookies')) { // berries → berry, but not cookies
        obj = obj.replace(/ies$/, 'y')
      } else if (obj.endsWith('sses') || obj.endsWith('xes') || obj.endsWith('zes') || obj.endsWith('ches') || obj.endsWith('shes')) {
        // buses → bus, boxes → box, etc.
        obj = obj.replace(/es$/, '')
      } else if (obj.endsWith('ves')) {
        // leaves → leaf, but only if not already singular
        obj = obj.replace(/ves$/, 'f')
      } else if (obj.endsWith('s') && !obj.endsWith('ss')) {
        // Remove trailing s (cats → cat), but not ss (grass → grass)
        obj = obj.replace(/s$/, '')
      }

      foundObjects.add(obj)
    }

    // Store found objects as the "questions" array for compatibility
    questions.push(...Array.from(foundObjects))

    // Extract image paths from /images/ directory
    const images: string[] = []
    const imageElements = doc.querySelectorAll('img')
    imageElements.forEach(img => {
      const src = img.getAttribute('src')
      // Only track images from our collections (exclude external URLs, mascots, etc.)
      if (src && src.startsWith('/images/') && !src.includes('/mascot/')) {
        images.push(src)

        // CRITICAL: Extract object name from image filename for freshness tracking
        // Example: "/images/apple.png" -> "apple"
        const fileNameMatch = src.match(/\/([^\/]+)\.(png|jpg|jpeg|svg)$/i)
        if (fileNameMatch) {
          const objectName = fileNameMatch[1].toLowerCase()
          foundObjects.add(objectName)
          console.log(`🖼️ DEBUG: Extracted object from image: ${objectName}`)
        }
      }
    })

    console.log(`🔍 DEBUG: Extracted ${questions.length} vocabulary items:`, questions.slice(0, 5))
    console.log(`🔍 DEBUG: Extracted ${images.length} images:`, images.slice(0, 3))

    // CRITICAL: Ensure we always have questions for freshness to work
    if (questions.length === 0) {
      console.warn('⚠️ No vocabulary extracted! Freshness will fail.')
    }

    return { questions, images }
  }

  const handleGenerate = async () => {
    if (!hasConfiguration) return

    // IMMEDIATE FEEDBACK: Set generating state BEFORE any async operations
    // This prevents blank screen while waiting for server to respond
    setGenerationState('generating')
    setProgress(0)
    setErrorMessage('')
    setGeneratedWorksheet(null)
    setEditMode(false) // Reset edit mode when generating new worksheet

    try {
      // FRESHNESS FIX: Use ref value (synchronous) instead of state (async)
      const worksheetsToSend = previousWorksheetsRef.current

      // 🔍 DEBUG: Log API request payload
      console.log('🔍 DASHBOARD: ========== STARTING GENERATION ==========')
      console.log('🔍 DASHBOARD: Current ref value:', previousWorksheetsRef.current)
      console.log('🔍 DASHBOARD: Sending streaming API request with previousWorksheets:', worksheetsToSend.length, 'worksheets')
      console.log('🔍 DASHBOARD: Full worksheets to send:', JSON.stringify(worksheetsToSend, null, 2))
      if (worksheetsToSend.length > 0) {
        console.log('🔍 DASHBOARD: First previous worksheet:', {
          questions: worksheetsToSend[0].questions.length,
          images: worksheetsToSend[0].images.length,
          sampleImage: worksheetsToSend[0].images[0],
          allQuestions: worksheetsToSend[0].questions,
          allImages: worksheetsToSend[0].images
        })
      } else {
        console.log('⚠️ DASHBOARD: No previous worksheets - this is worksheet #1 (freshness will be skipped)')
      }
      console.log('🔍 DASHBOARD: ====================================================')

      // Call the streaming worksheet generation API using Server-Sent Events
      const requestBody = JSON.stringify({
        layout,
        topic,
        subtopic,
        difficulty,
        questionCount,
        nameList: nameList === 'none' ? '' : nameList,
        yearGroup,
        ...(visualTheme && visualTheme !== 'none' && { visualTheme }),
        previousWorksheets: worksheetsToSend
      })

      const response = await fetch('/api/generate-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      })

      if (!response.ok) {
        throw new Error('Failed to start streaming generation')
      }

      // Read the Server-Sent Events stream
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('No response body available')
      }

      let buffer = ''
      let firstChunkReceived = false
      let tempWorksheet: GeneratedWorksheet | null = null

      console.log('🌊 DASHBOARD: Starting to read SSE stream...')

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          console.log('🌊 DASHBOARD: Stream completed')
          break
        }

        // Decode the chunk and add to buffer
        buffer += decoder.decode(value, { stream: true })

        // Process complete SSE messages (separated by \n\n)
        const messages = buffer.split('\n\n')
        buffer = messages.pop() || '' // Keep incomplete message in buffer

        for (const message of messages) {
          if (!message.trim() || !message.startsWith('data: ')) continue

          try {
            const jsonData = message.replace('data: ', '')
            const event = JSON.parse(jsonData)

            console.log('🌊 DASHBOARD: Received SSE event:', event.type)

            if (event.type === 'start') {
              console.log('🌊 DASHBOARD: Generation started')
              setProgress(10)
              // State is already 'generating' from handleGenerate() start
              // Just update progress here

            } else if (event.type === 'progress') {
              // Progressive HTML update - show partial content!
              if (!firstChunkReceived) {
                console.log('✨ DASHBOARD: First HTML chunk received!')
                firstChunkReceived = true
                setProgress(30)
              }

              // Create temporary worksheet with partial HTML
              tempWorksheet = {
                title: 'Generating...',
                html: event.html,
                metadata: {
                  topic: topic,
                  subtopic: subtopic,
                  difficulty: difficulty,
                  questionCount: questionCount,
                  curriculum: `UK National Curriculum - ${yearGroup}`,
                  generatedAt: new Date().toISOString()
                }
              }

              // Only show preview when we have substantial content (header + at least first question)
              // This prevents blank screen flash when ads disappear
              const MIN_HTML_LENGTH = 3000 // ~header + styles + first question
              if (event.html.length >= MIN_HTML_LENGTH) {
                // Update preview with partial HTML ✨ THIS IS THE KEY!
                setGeneratedWorksheet(tempWorksheet)
                setGenerationState('completed') // Show preview when we have enough content
                console.log(`✨ DASHBOARD: Showing preview with ${event.html.length} chars (substantial content)`)
              } else {
                console.log(`🌊 DASHBOARD: Buffering... ${event.html.length} chars (waiting for ${MIN_HTML_LENGTH})`)
              }

              // Update progress based on HTML length (rough estimate)
              const progressEstimate = Math.min(90, 30 + (event.html.length / 100))
              setProgress(progressEstimate)

            } else if (event.type === 'complete') {
              console.log('✅ DASHBOARD: Generation complete!')
              setProgress(100)

              // Set final worksheet
              if (event.worksheet) {
                // CRITICAL FIX: Extract and update state BEFORE setting completion status
                // This prevents race conditions with automated clicking of "Regenerate" button
                console.log('🔍 DASHBOARD: Extracting worksheet data from generated HTML')
                console.log('🔍 DASHBOARD: HTML length:', event.worksheet.html.length, 'chars')
                console.log('🔍 DASHBOARD: HTML preview (first 500 chars):', event.worksheet.html.substring(0, 500))

                const worksheetData = extractWorksheetData(event.worksheet.html)
                console.log('🔍 DASHBOARD: Extracted data:', {
                  questions: worksheetData.questions.length,
                  images: worksheetData.images.length,
                  firstImage: worksheetData.images[0] || 'none',
                  allQuestions: worksheetData.questions,
                  allImages: worksheetData.images
                })

                // Warn if no images extracted (freshness will fail)
                if (worksheetData.images.length === 0) {
                  console.warn('⚠️ DASHBOARD: No images extracted! Freshness mechanism will not work.')
                  console.warn('⚠️ Check if HTML contains /images/ paths (excluding mascots)')
                }

                // FRESHNESS FIX: Update ref SYNCHRONOUSLY (immediate access for next generation)
                // Then update state (for UI consistency)
                console.log('🔍 DASHBOARD: BEFORE ref update - ref length:', previousWorksheetsRef.current.length)
                previousWorksheetsRef.current = [...previousWorksheetsRef.current, worksheetData]
                console.log('🔍 DASHBOARD: AFTER ref update - ref length:', previousWorksheetsRef.current.length)
                console.log('🔍 DASHBOARD: Full ref content:', JSON.stringify(previousWorksheetsRef.current, null, 2))

                // Also update state for UI consistency (React will batch this asynchronously)
                setPreviousWorksheets(prev => {
                  const updated = [...prev, worksheetData]
                  console.log('🔍 DASHBOARD: Updated previousWorksheets state, new length:', updated.length)
                  if (updated.length > 0) {
                    console.log('🔍 DASHBOARD: Previous worksheet sample:', {
                      questions: updated[updated.length - 1].questions.length,
                      images: updated[updated.length - 1].images.length
                    })
                  }
                  return updated
                })
                console.log(`🔄 Freshness tracking: Stored worksheet data (${worksheetData.questions.length} questions, ${worksheetData.images.length} images)`)

                // NOW set worksheet and completion status (Download button will appear)
                setGeneratedWorksheet(event.worksheet)
                setGenerationState('completed')
              }

            } else if (event.type === 'error') {
              throw new Error(event.message || 'Generation failed')
            }

          } catch (parseError) {
            console.error('❌ DASHBOARD: Error parsing SSE message:', parseError)
          }
        }
      }

      // Ensure we have a final worksheet
      if (!tempWorksheet) {
        throw new Error('No worksheet data received')
      }

    } catch (error) {
      console.error('Generation error:', error)
      setGenerationState('error')
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred')
      setProgress(0)
    }
  }
  
  const handleDownloadPdf = async () => {
    if (!generatedWorksheet || !hasConfiguration) return

    setPdfGenerating(true)
    try {
      // Validate the generated content before sending
      if (!generatedWorksheet.html || generatedWorksheet.html.length < 10) {
        throw new Error('Generated worksheet content is too short or missing')
      }

      // Note: Increased limit to support base64-encoded mascot images (was 50000)
      if (generatedWorksheet.html.length > 1000000) {
        throw new Error('Generated worksheet content is too long for PDF generation (max 1MB)')
      }

      // Strip answer key from HTML if toggle is OFF and inject mascots
      let htmlContent = generatedWorksheet.html
      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlContent, 'text/html')

      if (!showAnswers) {
        // Remove answer key section
        const answerKeyElement = doc.querySelector('.answer-key')
        if (answerKeyElement) {
          answerKeyElement.remove()
        }
      }

      // Inject mascots into the HTML for PDF generation with base64 encoding
      if (generatedWorksheet.mascots && generatedWorksheet.mascots.length > 0) {
        const body = doc.body
        if (body) {
          // Make body position relative if not already
          const bodyStyle = doc.createElement('style')
          bodyStyle.textContent = 'body { position: relative; }'
          doc.head.appendChild(bodyStyle)

          // Create mascot container with absolute positioning
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
          const mascotPromises = generatedWorksheet.mascots.map(async (mascot) => {
            try {
              // Fetch the image and convert to base64
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
              img.src = base64 // Use base64 data URL instead of relative path
              img.alt = 'Mascot'
              img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: contain;
              `

              mascotDiv.appendChild(img)
              mascotContainer.appendChild(mascotDiv)
            } catch (error) {
              console.error('Failed to load mascot image:', mascot.src, error)
            }
          })

          // Wait for all mascots to be converted and added
          await Promise.all(mascotPromises)
          body.appendChild(mascotContainer)
        }
      }

      htmlContent = doc.documentElement.outerHTML

      const config = {
        layout,
        topic,
        subtopic,
        difficulty: difficulty as DifficultyLevel,
        questionCount: parseInt(questionCount.toString()),
        yearGroup,
        studentNames: [] // No personal data in PDFs
      }

      const pdfRequest = {
        config,
        generatedContent: htmlContent, // Use the HTML (with or without answer key)
        title: generatedWorksheet.title
      }

      const response = await fetch('/api/worksheets/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-session-token' // Replace with real auth token
        },
        body: JSON.stringify(pdfRequest)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'PDF generation failed')
      }

      // Handle the PDF download
      const blob = await response.blob()
      const filename = response.headers.get('Content-Disposition')?.match(/filename="([^"]+)"/)?.[1] || 'worksheet.pdf'
      
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      // PDF downloaded successfully
      
    } catch (error) {
      console.error('PDF download error:', error)
      setErrorMessage(`PDF download failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setPdfGenerating(false)
    }
  }

  const handleConfigurationChange = () => {
    if (generationState === 'completed') {
      setGenerationState('idle')
      setProgress(0)
    }
  }

  
  // Load topics when year group changes
  useEffect(() => {
    if (!yearGroup) {
      setAvailableTopics([])
      return
    }
    
    const loadTopics = async () => {
      setLoadingTopics(true)
      // Only clear topic/subtopic on initial load or when topics change
      setAvailableSubtopics([])
      
      try {
        const response = await fetch(`/api/curriculum/topics?yearGroup=${encodeURIComponent(yearGroup)}`)
        if (response.ok) {
          const data = await response.json()
          setAvailableTopics(data.topics || [])
        } else {
          console.error('Failed to load topics')
          setAvailableTopics([])
        }
      } catch (error) {
        console.error('Error loading topics:', error)
        setAvailableTopics([])
      } finally {
        setLoadingTopics(false)
      }
    }
    
    loadTopics()
  }, [yearGroup])
  
  // Load subtopics when topic changes
  useEffect(() => {
    if (!yearGroup || !topic) {
      setAvailableSubtopics([])
      return
    }
    
    const loadSubtopics = async () => {
      setLoadingSubtopics(true)
      // Only clear subtopic if not restoring from URL params
      if (!pendingSubtopicRef.current) {
        setSubtopic('') // Clear subtopic when topic changes
      }

      try {
        const response = await fetch(`/api/curriculum/subtopics?yearGroup=${encodeURIComponent(yearGroup)}&topic=${encodeURIComponent(topic)}`)
        if (response.ok) {
          const data = await response.json()
          setAvailableSubtopics(data.subtopics || [])

          // Restore subtopic from ref if it was set from URL params
          if (pendingSubtopicRef.current) {
            setSubtopic(pendingSubtopicRef.current)
            console.log('✅ Restored subtopic from URL params:', pendingSubtopicRef.current)
            pendingSubtopicRef.current = null // Clear the ref
          }
        } else {
          console.error('Failed to load subtopics')
          setAvailableSubtopics([])
        }
      } catch (error) {
        console.error('Error loading subtopics:', error)
        setAvailableSubtopics([])
      } finally {
        setLoadingSubtopics(false)
      }
    }
    
    loadSubtopics()
  }, [yearGroup, topic])
  
  const handleRefresh = async () => {
    // Simulate refreshing page data
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Reset state if needed
    // Page refreshed
  }
  
  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center">
                <h1 className="text-xl font-bold text-blue-700">WorksheetGenerator.AI</h1>
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
                <Link href="/create" className="text-blue-700 font-medium">
                  <PlusCircle className="w-4 h-4 inline mr-1" />
                  Create Worksheet
                </Link>
                {fromLibrary && (
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                    From Library
                  </span>
                )}
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

      {/* Main Content - Mobile-First Responsive Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-4 md:py-6">
        {/* Mobile: Stack vertically, Tablet: 2 columns, Desktop: Optimized layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-10 gap-4 md:gap-6">
          {/* Configuration Panel - Full width on mobile, 30% on desktop */}
          <div className="w-full lg:col-span-3 order-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Worksheet Configuration
                </CardTitle>
                <CardDescription>
                  Configure your worksheet settings and generate personalized content for your students
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 md:space-y-6">
                {/* Layout Selection - FIRST for pedagogical choice */}
                <div className="space-y-3 md:space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="layout" className="text-base md:text-sm font-semibold">Worksheet Layout</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-5 w-5 md:h-4 md:w-4 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Choose the layout style that best fits your teaching objective</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select value={layout} onValueChange={(value) => { 
                    setLayout(value as LayoutType); 
                    // Ensure question count is appropriate for standard layout
                    if (questionCount > 10) {
                      setQuestionCount(5); // Default safe count for standard layout
                    }
                    handleConfigurationChange(); 
                  }}>
                    <SelectTrigger className="h-12 md:h-10 text-base md:text-sm border-2 border-purple-200 bg-purple-50">
                      <SelectValue placeholder="Select worksheet layout">
                        {layout && (
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{LAYOUT_TEMPLATES[layout].icon}</span>
                            <span>{LAYOUT_TEMPLATES[layout].name}</span>
                          </div>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {getLayoutOptions().map(layoutOption => (
                        <SelectItem key={layoutOption.id} value={layoutOption.id}>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{layoutOption.icon}</span>
                            <div>
                              <div className="font-medium">{layoutOption.name}</div>
                              <div className="text-xs text-slate-500">{layoutOption.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Year Group Selection - SECOND */}
                <div className="space-y-3 md:space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="year-group" className="text-base md:text-sm font-semibold">Year Group</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-5 w-5 md:h-4 md:w-4 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Year group drives curriculum-aligned topics and content difficulty</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select value={yearGroup} onValueChange={(value) => {
                    setYearGroup(value);
                    // Clear topic/subtopic when year group actually changes
                    setTopic('');
                    setSubtopic('');
                    handleConfigurationChange();
                  }}>
                    <SelectTrigger data-testid="year-group-select" className="h-12 md:h-10 text-base md:text-sm border-2 border-blue-200 bg-blue-50">
                      <SelectValue placeholder="Select year group">
                        {yearGroup && YEAR_GROUPS.find(y => y.value === yearGroup)?.label}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent data-testid="year-group-dropdown">
                      {YEAR_GROUPS.map(year => (
                        <SelectItem key={year.value} value={year.value} data-testid={`year-group-option-${year.value.toLowerCase().replace(/\s+/g, '-')}`} disabled={year.disabled}>
                          {year.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!yearGroup && (
                    <div className="flex items-center gap-2 text-amber-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>Please select a year group to continue</span>
                    </div>
                  )}
                </div>

                {/* Topic Selection - Depends on Year Group */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="topic" className="text-base md:text-sm">Topic</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-5 w-5 md:h-4 md:w-4 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Topics are filtered to match your selected year group&apos;s curriculum</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select
                    value={topic}
                    onValueChange={(value) => {
                      setTopic(value);
                      setSubtopic('');
                      handleConfigurationChange();
                    }}
                    disabled={isTopicDisabled}
                  >
                    <SelectTrigger data-testid="topic-select" className={`h-12 md:h-10 text-base md:text-sm ${isTopicDisabled ? 'bg-slate-100' : ''}`}>
                      <SelectValue placeholder={
                        loadingTopics ? "Loading topics..." :
                        !yearGroup ? "Select year group first" :
                        "Select a curriculum topic"
                      } />
                    </SelectTrigger>
                    <SelectContent data-testid="topic-dropdown">
                      {availableTopics.map(topic => (
                        <SelectItem key={topic.value} value={topic.value} data-testid={`topic-option-${topic.value.toLowerCase().replace(/\s+/g, '-')}`}>
                          {topic.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Subtopic Selection - Depends on Year Group + Topic */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="subtopic" className="text-base md:text-sm">Subtopic</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-5 w-5 md:h-4 md:w-4 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Subtopics are specific to your year group and chosen topic</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select
                    value={subtopic}
                    onValueChange={(value) => { setSubtopic(value); handleConfigurationChange(); }}
                    disabled={isSubtopicDisabled}
                  >
                    <SelectTrigger data-testid="subtopic-select" className={`h-12 md:h-10 text-base md:text-sm ${isSubtopicDisabled ? 'bg-slate-100' : ''}`}>
                      <SelectValue placeholder={
                        loadingSubtopics ? "Loading subtopics..." :
                        !yearGroup ? "Select year group first" :
                        !topic ? "Select topic first" :
                        "Select a subtopic"
                      } />
                    </SelectTrigger>
                    <SelectContent data-testid="subtopic-dropdown">
                      {availableSubtopics.map(sub => (
                        <SelectItem key={sub.value} value={sub.value} data-testid={`subtopic-option-${sub.value.toLowerCase().replace(/\s+/g, '-')}`}>
                          {sub.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Show Answers Toggle */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="show-answers" className="text-base md:text-sm font-medium cursor-pointer">
                        Show Answers
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-slate-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Include answer key in the generated worksheet</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <label htmlFor="show-answers" className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        id="show-answers"
                        checked={showAnswers}
                        onChange={(e) => setShowAnswers(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* Difficulty Selection - HIDDEN: Not implemented in backend */}
                <div className="space-y-3 hidden">
                  <Label className="text-base md:text-sm">Difficulty Level</Label>
                  <div className="flex flex-col gap-4 md:gap-3">
                    {[
                      { value: 'easy', label: 'Easy', description: 'Basic concepts and simple problems' },
                      { value: 'average', label: 'Average', description: 'Standard curriculum level' },
                      { value: 'hard', label: 'Hard', description: 'Challenging problems for extension' }
                    ].map(({ value, label, description }) => (
                      <div key={value} className="flex items-start space-x-3 p-3 md:p-2 border rounded-lg hover:bg-slate-50 cursor-pointer touch-manipulation" onClick={() => { setDifficulty(value as DifficultyLevel); handleConfigurationChange(); }}>
                        <input
                          type="radio"
                          id={`difficulty-${value}`}
                          name="difficulty"
                          value={value}
                          checked={difficulty === value}
                          onChange={(e) => { setDifficulty(e.target.value as DifficultyLevel); handleConfigurationChange(); }}
                          className="h-5 w-5 md:h-4 md:w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mt-0.5"
                        />
                        <div className="flex-1">
                          <Label htmlFor={`difficulty-${value}`} className="font-medium text-base md:text-sm cursor-pointer">
                            {label}
                          </Label>
                          <p className="text-sm md:text-xs text-slate-500 mt-1">{description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Question Count - Hidden from UI */}
                <div className="space-y-3" style={{ display: 'none' }}>
                  <Label htmlFor="question-count" className="text-base md:text-sm">Number of Questions: {questionCount}</Label>
                  <div className="relative">
                    <input
                      type="range"
                      id="question-count"
                      min="5"
                      max="10"
                      value={questionCount}
                      onChange={(e) => { setQuestionCount(parseInt(e.target.value)); handleConfigurationChange(); }}
                      className="w-full cursor-pointer slider touch-manipulation question-count-slider"
                      style={{
                        background: '#9ca3af',
                        height: '8px',
                        borderRadius: '4px',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                      }}
                    />
                    <style jsx>{`
                      .question-count-slider::-webkit-slider-track {
                        background: #9ca3af !important;
                        height: 8px !important;
                        border-radius: 4px !important;
                        border: 1px solid #6b7280 !important;
                      }
                      .question-count-slider::-webkit-slider-thumb {
                        -webkit-appearance: none !important;
                        appearance: none !important;
                        height: 24px !important;
                        width: 24px !important;
                        border-radius: 50% !important;
                        background: #2563eb !important;
                        border: 2px solid white !important;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
                        cursor: pointer !important;
                        margin-top: -8px !important;
                      }
                      .question-count-slider::-moz-range-track {
                        background: #9ca3af !important;
                        height: 8px !important;
                        border-radius: 4px !important;
                        border: 1px solid #6b7280 !important;
                      }
                      .question-count-slider::-moz-range-thumb {
                        height: 24px !important;
                        width: 24px !important;
                        border-radius: 50% !important;
                        background: #2563eb !important;
                        border: 2px solid white !important;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
                        cursor: pointer !important;
                        border: none !important;
                      }
                    `}</style>
                  </div>
                  <div className="flex justify-between text-sm md:text-xs text-slate-500">
                    <span>5 questions</span>
                    <span>10 questions</span>
                  </div>
                </div>



                {/* Generation Progress */}
                {generationState === 'generating' && (
                  <div className="space-y-3 p-4 bg-blue-50 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Generating your worksheet...</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <p className="text-xs text-blue-700">
                      Creating curriculum-aligned worksheets
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Enhanced Configuration Panel - USP.2 - DISABLED */}
            <div className="mt-4 w-full hidden">
              <EnhancedConfigurationPanel
                yearGroup={yearGroup}
                topic={topic}
                layout={layout}
                visualTheme={visualTheme}
                nameList={nameList}
                onVisualThemeChange={setVisualTheme}
                onNameListChange={(value) => { setNameList(value); handleConfigurationChange(); }}
              />
            </div>
          </div>

          {/* Preview/Ads Panel - Full width on mobile, 70% on desktop */}
          <div className="w-full lg:col-span-7 order-2">
            <Card className="h-full min-h-[400px] md:min-h-[500px]">
              <CardContent className="p-0 h-full">
                {showGenerating ? (
                  /* Generating State - Immediate feedback */
                  <div className="h-full flex items-center justify-center bg-blue-50">
                    <div className="text-center p-6">
                      <Loader2 className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
                      <h3 className="text-lg font-medium text-blue-900 mb-2">Generating Your Worksheet...</h3>
                      <p className="text-sm text-blue-700 mb-4">
                        Creating curriculum-aligned worksheets
                      </p>
                      <Progress value={progress} className="w-64 mx-auto" />
                      <p className="text-xs text-blue-600 mt-2">{Math.round(progress)}% complete</p>
                    </div>
                  </div>
                ) : showAds ? (
                  /* Library Showcase Carousel */
                  <LibraryShowcase className="h-full" />
                ) : showError ? (
                  /* Error State */
                  <div className="h-full flex items-center justify-center p-4">
                    <div className="text-center max-w-md">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-red-900 mb-2">Generation Failed</h3>
                      <p className="text-sm text-red-700 mb-4">{errorMessage}</p>
                      <Button 
                        onClick={() => setGenerationState('idle')}
                        variant="outline"
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                ) : showPreview && generatedWorksheet ? (
                  /* Real Worksheet Preview with Edit Mode */
                  <div className="h-full flex flex-col">
                    {/* Mode Toggle Button */}
                    <div className="px-4 pt-4 pb-2">
                      <Button
                        onClick={() => setEditMode(!editMode)}
                        variant={editMode ? "default" : "outline"}
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        {editMode ? (
                          <>
                            <Eye className="h-4 w-4" />
                            View Mode
                          </>
                        ) : (
                          <>
                            <Edit3 className="h-4 w-4" />
                            Edit Mode
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Conditional Rendering: Editor or Preview */}
                    {editMode ? (
                      <div className="flex-1 px-4 pb-4 overflow-y-auto">
                        <WorksheetEditor
                          htmlContent={generatedWorksheet.html}
                          initialMascots={generatedWorksheet.mascots}
                          onSave={(updatedContent, mascots) => {
                            // Update the generatedWorksheet with edited content and mascots
                            // Use functional update to avoid closure issues with stale state
                            setGeneratedWorksheet(prev => {
                              if (!prev) return prev
                              console.log('📝 Saving edited worksheet:', {
                                originalLength: prev.html.length,
                                editedLength: updatedContent.length,
                                mascotsCount: mascots?.length || 0
                              })
                              return {
                                ...prev,
                                html: updatedContent,
                                mascots: mascots || []
                              }
                            })
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex-1 p-4">
                        <div className="bg-white border rounded-lg shadow-sm h-full p-4 overflow-y-auto">
                          <style dangerouslySetInnerHTML={{ __html: `
                            .worksheet-preview .answer-key { display: ${showAnswers ? 'block' : 'none'} !important; }
                          ` }} />
                          <div className="relative">
                            <div
                              className="worksheet-preview text-sm"
                              dangerouslySetInnerHTML={{ __html: generatedWorksheet.html }}
                              style={{
                                fontFamily: "'Times New Roman', serif",
                                lineHeight: 1.6,
                                position: 'relative',
                                zIndex: 1
                              }}
                            />
                            {/* Mascot overlay for view mode */}
                            {generatedWorksheet.mascots && generatedWorksheet.mascots.length > 0 && (
                              <div
                                className="mascot-overlay"
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  pointerEvents: 'none',
                                  zIndex: 10
                                }}
                              >
                                {generatedWorksheet.mascots.map(mascot => (
                                  <div
                                    key={mascot.id}
                                    style={{
                                      position: 'absolute',
                                      left: `${mascot.x}px`,
                                      top: `${mascot.y}px`,
                                      width: `${mascot.width}px`,
                                      height: `${mascot.height}px`,
                                      zIndex: mascot.zIndex,
                                      opacity: mascot.opacity,
                                      transform: `rotate(${mascot.rotation}deg)`,
                                      pointerEvents: 'none'
                                    }}
                                  >
                                    <img
                                      src={mascot.src}
                                      alt="Mascot"
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        pointerEvents: 'none'
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Initial State - No content generated yet */
                  <div className="h-full flex items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg m-4">
                    <div className="text-center p-6">
                      <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-3" />
                      <h3 className="text-sm font-medium text-slate-600 mb-1">Ready to Generate</h3>
                      <p className="text-xs text-slate-500">
                        Configure your worksheet settings and click Generate
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons - Mobile optimized */}
        <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 mt-6">
          <Button 
            onClick={handleGenerate}
            disabled={!canGenerate}
            size="touch"
            className={`w-full md:w-auto md:min-w-32 text-lg md:text-base font-semibold ${
              !hasConfiguration ? 'bg-slate-300 cursor-not-allowed' : ''
            }`}
          >
            {generationState === 'generating' ? (
              <>
                <Loader2 className="h-5 w-5 md:h-4 md:w-4 animate-spin mr-2" />
                Generating...
              </>
            ) : showPreview ? (
              'Regenerate'
            ) : hasConfiguration ? (
              'Generate Worksheet'
            ) : (
              `Complete Configuration (${[!layout && 'Layout', !yearGroup && 'Year Group', !topic && 'Topic', !subtopic && 'Subtopic'].filter(Boolean).join(', ')})`
            )}
          </Button>
          
          {!hasConfiguration && (
            <div className="text-center">
              <p className="text-sm text-slate-600 mt-2">
                Follow the flow: Layout → Year Group → Topic → Subtopic
              </p>
            </div>
          )}
          
          {showPreview && (
            <>
              <Button
                variant="outline"
                size="touch"
                className="w-full md:w-auto md:min-w-32 text-lg md:text-base"
                onClick={handleDownloadPdf}
                disabled={pdfGenerating}
              >
                {pdfGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 md:h-4 md:w-4 animate-spin mr-2" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5 md:h-4 md:w-4 mr-2" />
                    Download PDF
                  </>
                )}
              </Button>

              {isAdmin && (
                <Button
                  variant="default"
                  size="touch"
                  className="w-full md:w-auto md:min-w-32 text-lg md:text-base"
                  onClick={() => setShowSaveModal(true)}
                >
                  💾 Save to Library
                </Button>
              )}
            </>
          )}
        </div>
      </main>

      {/* Welcome Tour */}
      {showTour && (
        <WelcomeTour onComplete={() => setShowTour(false)} />
      )}

      {/* Save to Library Modal */}
      {generatedWorksheet && (
        <SaveToLibraryModal
          isOpen={showSaveModal}
          onClose={() => setShowSaveModal(false)}
          worksheetHtml={generatedWorksheet.html}
          showAnswers={showAnswers}
          metadata={generateLibraryMetadata({
            yearGroup,
            topic,
            subtopic,
            layout,
            visualTheme,
            difficulty,
            questionCount,
          })}
          onSuccess={(worksheet) => {
            console.log('✅ Worksheet saved to library:', worksheet)
          }}
        />
      )}

        {/* Footer */}
        <Footer version="v1.0.0-beta" />
      </div>
    </PullToRefresh>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-slate-600">Loading worksheet generator...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}