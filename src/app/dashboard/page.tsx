'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Navigation } from '@/components/ui/navigation'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Footer } from '@/components/ui/footer'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Download, Info, Loader2, AlertCircle } from 'lucide-react'
import WelcomeTour from '@/components/WelcomeTour'
import { PullToRefresh } from '@/components/mobile/PullToRefresh'
import { YEAR_GROUPS } from '@/lib/data/curriculum'
import { LAYOUT_TEMPLATES, DEFAULT_LAYOUT, getLayoutOptions } from '@/lib/data/layouts'
import type { LayoutType, VisualTheme } from '@/lib/types/worksheet'
import { EnhancedConfigurationPanel } from '@/components/worksheet/EnhancedConfigurationPanel'

const mockNameLists = [
  { value: 'year3-class-a', label: 'Year 3 Class A (25 students)' },
  { value: 'year4-maths-group', label: 'Year 4 Maths Group (18 students)' },
  { value: 'reception-class', label: 'Reception Class (20 students)' }
]

type GenerationState = 'idle' | 'generating' | 'completed' | 'error'
type DifficultyLevel = 'easy' | 'average' | 'hard'

interface GeneratedWorksheet {
  title: string
  html: string
  metadata: {
    topic: string
    subtopic: string
    difficulty: string
    questionCount: number
    curriculum: string
    generatedAt: string
  }
}

export default function DashboardPage() {
  const [showTour, setShowTour] = useState(false)
  
  // Configuration state
  const [layout, setLayout] = useState<LayoutType>(DEFAULT_LAYOUT) // Layout selection drives template
  const [yearGroup, setYearGroup] = useState<string>('Year 3') // Default from mock profile - NOW FIRST
  const [availableTopics, setAvailableTopics] = useState<{value: string, label: string}[]>([])
  const [availableSubtopics, setAvailableSubtopics] = useState<{value: string, label: string}[]>([])
  const [topic, setTopic] = useState<string>('')
  const [subtopic, setSubtopic] = useState<string>('')
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy')
  const [questionCount, setQuestionCount] = useState<number>(5)
  const [nameList, setNameList] = useState<string>('')
  
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

  // Cross-iteration freshness tracking
  const [previousWorksheets, setPreviousWorksheets] = useState<Array<{ questions: string[]; images: string[] }>>([])

  // FRESHNESS FIX: Use ref for synchronous access (bypasses React's async state batching)
  // The ref always holds the current value, even during re-renders
  const previousWorksheetsRef = useRef<Array<{ questions: string[]; images: string[] }>>([])

  // 🔍 DEBUG: Log worksheet history state changes
  useEffect(() => {
    console.log('🔍 DASHBOARD: previousWorksheets state updated:', previousWorksheets.length, 'worksheets')
    console.log('🔍 DASHBOARD: Current history:', previousWorksheets)
  }, [previousWorksheets])

  const hasConfiguration = layout && yearGroup && topic && subtopic
  
  const canGenerate = hasConfiguration && generationState !== 'generating'
  const showPreview = generationState === 'completed' && generatedWorksheet
  const showAds = generationState === 'idle' // Only show ads when idle, not during generation
  const showError = generationState === 'error'
  const showGenerating = generationState === 'generating' // Show generating state explicitly
  
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
    const objectPattern = /\b(apples?|pears?|oranges?|bananas?|grapes?|strawberr(?:y|ies)|cherr(?:y|ies)|watermelons?|lemons?|peaches?|plums?|flowers?|roses?|tulips?|daisies?|sunflowers?|butterfl(?:y|ies)|bees?|ladybugs?|ants?|spiders?|birds?|chickens?|cows?|pigs?|sheep|horses?|dogs?|cats?|frogs?|fish|ducks?|rabbits?|bears?|elephants?|lions?|tigers?|monkeys?|giraffes?|cars?|trucks?|buses?|trains?|planes?|boats?|bicycles?|pencils?|pens?|crayons?|markers?|books?|scissors?|rulers?|erasers?|balls?|blocks?|toys?|dolls?|teddy bears?|stars?|hearts?|circles?|squares?|triangles?|diamonds?|cookies?|cupcakes?|candies?|lollipops?|carrots?|tomatoes?|potatoes?|corn|broccoli|peas?|balloons?|presents?|candles?|hats?|shoes?|socks?|shirts?|buttons?|leaves?|trees?|acorns?|shells?|rocks?|feathers?)\b/gi

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

    // Extract image paths from WORKSHEET_OBJECTS collections
    const images: string[] = []
    const imageElements = doc.querySelectorAll('img')
    imageElements.forEach(img => {
      const src = img.getAttribute('src')
      // Only track images from our collections (exclude UI icons, etc.)
      if (src && src.includes('WORKSHEET_OBJECTS')) {
        images.push(src)
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
                  console.warn('⚠️ Check if HTML contains WORKSHEET_OBJECTS image paths')
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
      
      if (generatedWorksheet.html.length > 50000) {
        throw new Error('Generated worksheet content is too long for PDF generation')
      }

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
        generatedContent: generatedWorksheet.html, // Use the HTML directly as preview does
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
      setSubtopic('') // Clear subtopic when topic changes
      
      try {
        const response = await fetch(`/api/curriculum/subtopics?yearGroup=${encodeURIComponent(yearGroup)}&topic=${encodeURIComponent(topic)}`)
        if (response.ok) {
          const data = await response.json()
          setAvailableSubtopics(data.subtopics || [])
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
      {/* Enhanced Navigation */}
      <Navigation 
        user={{
          name: 'Sarah Johnson',
          email: 'sarah.johnson@school.edu.uk'
        }}
        usage={{
          current: 15,
          limit: 30,
          tier: 'Free'
        }}
        notifications={2}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-100 px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb 
            items={[
              { label: 'Worksheet Generator', current: true }
            ]}
            showHome={false}
          />
        </div>
      </div>

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
                        <SelectItem key={year.value} value={year.value} data-testid={`year-group-option-${year.value.toLowerCase().replace(/\s+/g, '-')}`}>
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
                      Creating curriculum-aligned questions with personalized student names
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Enhanced Configuration Panel - USP.2 */}
            <div className="mt-4 w-full">
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
                        Creating curriculum-aligned questions with personalized content
                      </p>
                      <Progress value={progress} className="w-64 mx-auto" />
                      <p className="text-xs text-blue-600 mt-2">{Math.round(progress)}% complete</p>
                    </div>
                  </div>
                ) : showAds ? (
                  /* Ad Placeholder */
                  <div className="h-full flex items-center justify-center bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg m-4">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-slate-300 rounded mx-auto mb-3"></div>
                      <p className="text-sm font-medium text-slate-600">Advertisement</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Support free worksheets
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        Upgrade to Pro to remove ads
                      </p>
                    </div>
                  </div>
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
                  /* Real Worksheet Preview */
                  <div className="p-4 h-full">
                    <div className="bg-white border rounded-lg shadow-sm h-full p-4 overflow-y-auto">
                      <div 
                        className="worksheet-preview text-sm"
                        dangerouslySetInnerHTML={{ __html: generatedWorksheet.html }}
                        style={{
                          fontFamily: "'Times New Roman', serif",
                          lineHeight: 1.6,
                        }}
                      />
                    </div>
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
          )}
        </div>
      </main>

      {/* Welcome Tour */}
      {showTour && (
        <WelcomeTour onComplete={() => setShowTour(false)} />
      )}

        {/* Footer */}
        <Footer version="v1.0.0-beta" />
      </div>
    </PullToRefresh>
  )
}