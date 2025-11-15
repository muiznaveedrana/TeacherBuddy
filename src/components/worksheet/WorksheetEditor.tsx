'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Bold,
  Italic,
  Underline,
  Check,
  X,
  ImagePlus,
  Undo2,
  Redo2
} from 'lucide-react'
import { ImagePickerModal } from './ImagePickerModal'
import { MascotLibraryModal } from './MascotLibraryModal'
import { DraggableMascot } from './DraggableMascot'

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

interface WorksheetEditorProps {
  htmlContent: string
  initialMascots?: Mascot[]
  onSave?: (content: string, mascots?: Mascot[]) => void
  onReset?: () => void
  originalHtmlContent?: string  // Optional: explicitly provide original content for reset
  originalMascots?: Mascot[]     // Optional: explicitly provide original mascots for reset
}

interface EditorState {
  html: string
  mascots: Mascot[]
  timestamp: number
}

export function WorksheetEditor({
  htmlContent,
  initialMascots,
  onSave,
  onReset,
  originalHtmlContent,
  originalMascots: originalMascotsProp
}: WorksheetEditorProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [showSaved, setShowSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showImagePicker, setShowImagePicker] = useState(false)
  const [selectedImageElement, setSelectedImageElement] = useState<HTMLImageElement | null>(null)
  const [replacementCount, setReplacementCount] = useState(0)

  // Store original content for reset functionality
  // Use explicitly provided original content if available, otherwise use initial htmlContent
  const originalContentRef = useRef<string>(originalHtmlContent || htmlContent)
  const originalMascotsRef = useRef<Mascot[]>(originalMascotsProp || initialMascots || [])

  // Mascot state - initialize with initialMascots if provided
  const [mascots, setMascots] = useState<Mascot[]>(initialMascots || [])
  const [showMascotLibrary, setShowMascotLibrary] = useState(false)
  const [selectedMascotId, setSelectedMascotId] = useState<string | null>(null)

  // Image resize state
  const [contextMenuImage, setContextMenuImage] = useState<HTMLImageElement | null>(null)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [imageSize, setImageSize] = useState(100) // percentage

  // History state for undo/redo
  const [history, setHistory] = useState<EditorState[]>([])
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1)
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isUndoingRef = useRef(false)
  const isInternalUpdateRef = useRef(false)
  const isSavingRef = useRef(false)

  const handleImageReplace = (newImagePath: string) => {
    if (!selectedImageElement || !contentRef.current) return

    const oldImagePath = selectedImageElement.src
    const oldImageSrc = new URL(oldImagePath).pathname

    // Find all images with the same src and replace them
    const images = contentRef.current.querySelectorAll('img')
    let count = 0

    images.forEach((img, index) => {
      const imgSrc = new URL(img.src).pathname
      if (imgSrc === oldImageSrc) {
        // Preserve size settings before replacing
        const currentWidth = img.style.width
        const currentHeight = img.style.height
        const baselineWidth = img.dataset.baselineWidth

        // Replace the image source
        img.src = newImagePath

        // Generate NEW image ID based on new src
        const srcHash = newImagePath.split('/').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'img'
        img.dataset.imageId = `${srcHash}-${index}`

        // Restore size settings (new image inherits previous size)
        if (currentWidth) img.style.width = currentWidth
        if (currentHeight) img.style.height = currentHeight
        if (baselineWidth) img.dataset.baselineWidth = baselineWidth

        count++
      }
    })

    setReplacementCount(count)

    // Show toast notification
    showToast(`✓ Replaced ${count} image${count > 1 ? 's' : ''}`)

    // Set flag to prevent innerHTML reset when autosave triggers
    isInternalUpdateRef.current = true

    // Save the changes
    setTimeout(() => {
      saveToHistory()
      performAutosave()
      // Re-add click handlers to new images
      addImageClickHandlers()
    }, 100)
  }

  const showToast = (message: string) => {
    // Create toast element
    const toast = document.createElement('div')
    toast.textContent = message
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      z-index: 9999;
      font-weight: 500;
      animation: slideIn 0.3s ease-out;
    `

    document.body.appendChild(toast)

    // Remove after 2 seconds
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-out'
      setTimeout(() => toast.remove(), 300)
    }, 2000)
  }

  const handleDone = () => {
    if (contentRef.current) {
      // Auto-save to localStorage
      const content = contentRef.current.innerHTML
      localStorage.setItem('worksheet-editor-content', content)
      localStorage.setItem('worksheet-editor-mascots', JSON.stringify(mascots))

      // Call onSave callback if provided
      if (onSave) {
        onSave(content, mascots)
      }

      // Show saved indicator briefly
      setShowSaved(true)
      setTimeout(() => setShowSaved(false), 2000)
    }
  }

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (contentRef.current) {
      contentRef.current.focus()
    }
  }

  const handleReset = () => {
    if (!contentRef.current) return

    // Reset to original content
    contentRef.current.innerHTML = originalContentRef.current
    setMascots(originalMascotsRef.current)

    // Clear local storage
    localStorage.removeItem('worksheet-editor-content')
    localStorage.removeItem('worksheet-editor-mascots')

    // Clear history
    setHistory([{
      html: originalContentRef.current,
      mascots: originalMascotsRef.current,
      timestamp: Date.now()
    }])
    setCurrentHistoryIndex(0)

    // Re-add image handlers
    setTimeout(() => addImageClickHandlers(), 100)

    // Show toast notification
    showToast('✓ Worksheet reset to original')

    // If onReset callback provided, call it (for edit page to clear edited state)
    if (onReset) {
      onReset()
    } else if (onSave) {
      // For create page, update parent state with original content
      // This ensures the parent's state reflects the reset
      onSave(originalContentRef.current, originalMascotsRef.current)
    }
  }

  // Save current state to history
  const saveToHistory = useCallback(() => {
    if (!contentRef.current || isUndoingRef.current) return

    const currentState: EditorState = {
      html: contentRef.current.innerHTML,
      mascots: [...mascots],
      timestamp: Date.now()
    }

    console.log('📝 Saving to history:', {
      htmlLength: currentState.html.length,
      htmlSnippet: currentState.html.substring(0, 200),
      hasStyleAttribute: currentState.html.includes('style=')
    })

    setHistory(prev => {
      // Remove any "future" history if we're not at the end
      const newHistory = prev.slice(0, currentHistoryIndex + 1)
      // Add new state
      newHistory.push(currentState)
      // Keep only last 10 states (increased from 3 for better UX)
      return newHistory.slice(-10)
    })

    setCurrentHistoryIndex(prev => Math.min(prev + 1, 9))
  }, [mascots, currentHistoryIndex])

  // Autosave function
  const performAutosave = useCallback(() => {
    if (!contentRef.current || isSavingRef.current) return

    isSavingRef.current = true
    setIsSaving(true)
    const content = contentRef.current.innerHTML

    console.log(`💾 WorksheetEditor: Autosaving with ${mascots.length} mascots`)

    // Save to localStorage
    localStorage.setItem('worksheet-editor-content', content)
    localStorage.setItem('worksheet-editor-mascots', JSON.stringify(mascots))

    // Call onSave callback
    if (onSave) {
      onSave(content, mascots)
      console.log(`📤 WorksheetEditor: Called onSave with ${mascots.length} mascots`)
    }

    // Show saved indicator
    setTimeout(() => {
      setIsSaving(false)
      setShowSaved(true)
      setTimeout(() => {
        setShowSaved(false)
        isSavingRef.current = false // Reset flag after everything is done
      }, 2000)
    }, 300)
  }, [mascots, onSave])

  // Debounced autosave for text changes
  const scheduleAutosave = useCallback(() => {
    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current)
    }

    autosaveTimerRef.current = setTimeout(() => {
      saveToHistory()
      performAutosave()
    }, 1000) // 1 second delay
  }, [saveToHistory, performAutosave])

  // Immediate autosave for mascot changes
  const autosaveImmediate = useCallback(() => {
    saveToHistory()
    performAutosave()
  }, [saveToHistory, performAutosave])

  // Handle image resize
  const handleSizeChange = useCallback((newSize: number) => {
    console.log('🎚️ handleSizeChange called:', { newSize })

    if (!contextMenuImage || !contentRef.current) {
      console.log('❌ No contextMenuImage or contentRef')
      return
    }

    // Try to find current image by ID first, then by src as fallback
    let currentImage: HTMLImageElement | null = null

    const imageId = contextMenuImage.dataset.imageId
    if (imageId) {
      currentImage = contentRef.current.querySelector(`img[data-image-id="${imageId}"]`) as HTMLImageElement
    }

    // Fallback: find by src if no ID match
    if (!currentImage) {
      console.log('⚠️ No imageId, using src fallback:', contextMenuImage.src)
      const images = contentRef.current.querySelectorAll('img')
      currentImage = Array.from(images).find(img => img.src === contextMenuImage.src) as HTMLImageElement || null
    }

    if (!currentImage) {
      console.log('❌ Could not find currentImage (tried ID and src)')
      return
    }

    // Store baseline dimensions if not already stored (initial rendered size)
    if (!currentImage.dataset.baselineWidth) {
      const initialWidth = currentImage.getBoundingClientRect().width || currentImage.width
      currentImage.dataset.baselineWidth = initialWidth.toString()
      console.log('💾 Stored baseline width in resize:', initialWidth)
    }

    const baselineWidth = parseFloat(currentImage.dataset.baselineWidth || '200')
    const newWidth = (baselineWidth * newSize) / 100

    console.log('✅ Resizing image:', {
      baselineWidth,
      newSize: newSize + '%',
      newWidth: newWidth + 'px'
    })

    // Apply size as regular inline styles (without !important)
    // This allows them to be saved in the HTML
    currentImage.style.width = `${newWidth}px`
    currentImage.style.height = 'auto'
    currentImage.style.maxWidth = 'none'
    currentImage.style.maxHeight = 'none'
    currentImage.style.minWidth = 'unset'
    currentImage.style.minHeight = 'unset'
    currentImage.style.objectFit = 'contain'

    console.log('🎨 Applied styles to image:', {
      width: currentImage.style.width,
      height: currentImage.style.height,
      objectFit: currentImage.style.objectFit
    })

    setImageSize(newSize)

    // Close context menu after resizing
    setShowContextMenu(false)

    // CRITICAL: Manually save the HTML content immediately to persist the resize
    // Set flag to prevent innerHTML reset when prop updates
    isInternalUpdateRef.current = true

    // Use setTimeout to ensure DOM has updated before reading innerHTML
    setTimeout(() => {
      console.log('💾 Saving resize after DOM update...')
      saveToHistory()
      performAutosave()
      console.log('✅ Resize saved to history and autosave (internal update flagged)')
    }, 0)

    console.log('🎨 Resize styles applied, autosave scheduled')
  }, [contextMenuImage, saveToHistory, performAutosave])

  // Image click handler
  const handleImageClick = (img: HTMLImageElement) => {
    setSelectedImageElement(img)
    setShowImagePicker(true)
  }

  // Add click handlers to images for replacement
  const addImageClickHandlers = useCallback(() => {
    if (!contentRef.current) return

    const images = contentRef.current.querySelectorAll('img')
    console.log(`🔧 Adding handlers to ${images.length} images`)

    images.forEach((img, index) => {
      img.contentEditable = 'false'
      img.style.cursor = 'pointer'
      img.classList.add('worksheet-image-replaceable')

      // Add unique identifier
      if (!img.dataset.imageId) {
        const srcHash = img.src.split('/').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'img'
        img.dataset.imageId = `${srcHash}-${index}`
      }

      // Remove old handlers before adding new ones to prevent duplicates
      const oldClickHandler = (img as any)._clickHandler
      const oldContextHandler = (img as any)._contextHandler

      if (oldClickHandler) {
        img.removeEventListener('click', oldClickHandler)
      }
      if (oldContextHandler) {
        img.removeEventListener('contextmenu', oldContextHandler)
      }

      // Left click to replace image
      const clickHandler = (e: Event) => {
        console.log('🖱️ Image clicked!', img.src)
        e.stopPropagation()
        handleImageClick(img)
      }
      img.addEventListener('click', clickHandler)
      ;(img as any)._clickHandler = clickHandler

      // Right click to show context menu
      const contextHandler = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        // Store baseline width on first interaction
        if (!img.dataset.baselineWidth) {
          const currentWidth = img.getBoundingClientRect().width || img.width
          img.dataset.baselineWidth = currentWidth.toString()
        }

        // Calculate current size
        const baselineWidth = parseFloat(img.dataset.baselineWidth || '200')
        const currentWidth = img.getBoundingClientRect().width || img.width
        const currentSize = Math.round((currentWidth / baselineWidth) * 100)

        setContextMenuImage(img)
        setImageSize(currentSize)

        // Smart positioning: adjust if near viewport edges
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const menuWidth = 150 // Approximate menu width
        const menuHeight = 150 // Approximate menu height

        let x = e.clientX
        let y = e.clientY

        // Adjust X if too close to right edge
        if (x + menuWidth > viewportWidth - 20) {
          x = viewportWidth - menuWidth - 20
        }

        // Adjust Y if too close to bottom edge
        if (y + menuHeight > viewportHeight - 20) {
          y = viewportHeight - menuHeight - 20
        }

        setContextMenuPosition({ x, y })
        setShowContextMenu(true)
      }
      img.addEventListener('contextmenu', contextHandler)
      ;(img as any)._contextHandler = contextHandler

      img.title = 'Click to replace | Right-click for size options'
    })
  }, [handleImageClick])

  // Undo function
  const handleUndo = useCallback(() => {
    if (currentHistoryIndex <= 0 || !contentRef.current) return

    isUndoingRef.current = true
    const newIndex = currentHistoryIndex - 1
    const previousState = history[newIndex]

    console.log('⏮️ Undoing to state:', {
      newIndex,
      htmlLength: previousState?.html.length,
      hasStyleAttribute: previousState?.html.includes('style=')
    })

    if (previousState) {
      contentRef.current.innerHTML = previousState.html
      setMascots(previousState.mascots)
      setCurrentHistoryIndex(newIndex)
      addImageClickHandlers()

      // Update parent with undone state
      setTimeout(() => {
        isInternalUpdateRef.current = true
        performAutosave()
      }, 50)
    }

    setTimeout(() => {
      isUndoingRef.current = false
    }, 100)
  }, [currentHistoryIndex, history, addImageClickHandlers, performAutosave])

  // Redo function
  const handleRedo = useCallback(() => {
    if (currentHistoryIndex >= history.length - 1 || !contentRef.current) return

    isUndoingRef.current = true
    const newIndex = currentHistoryIndex + 1
    const nextState = history[newIndex]

    if (nextState) {
      contentRef.current.innerHTML = nextState.html
      setMascots(nextState.mascots)
      setCurrentHistoryIndex(newIndex)
      addImageClickHandlers()

      // Update parent with redone state
      setTimeout(() => {
        isInternalUpdateRef.current = true
        performAutosave()
      }, 50)
    }

    setTimeout(() => {
      isUndoingRef.current = false
    }, 100)
  }, [currentHistoryIndex, history, addImageClickHandlers, performAutosave])

  // Add keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Z or Cmd+Z for undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        handleUndo()
      }
      // Ctrl+Y or Ctrl+Shift+Z or Cmd+Shift+Z for redo
      else if (
        ((e.ctrlKey || e.metaKey) && e.key === 'y') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z')
      ) {
        e.preventDefault()
        handleRedo()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleUndo, handleRedo])

  // Initialize content when component mounts or htmlContent changes
  useEffect(() => {
    if (contentRef.current) {
      // Skip resetting innerHTML if this is an internal update (from our own autosave)
      if (isInternalUpdateRef.current) {
        console.log('⏭️ Skipping innerHTML reset (internal update)')
        isInternalUpdateRef.current = false
        // Still add handlers in case they're missing
        setTimeout(() => addImageClickHandlers(), 50)
        return
      }

      // Skip if the content is already the same (prevents unnecessary resets from parent re-renders)
      const currentContent = contentRef.current.innerHTML

      // Compare content, allowing for small differences in whitespace/formatting
      const contentMatches = currentContent === htmlContent ||
        Math.abs(currentContent.length - htmlContent.length) < 200 // Allow serialization differences (increased from 20)

      if (contentMatches) {
        console.log('⏭️ Skipping innerHTML reset (content unchanged or minor differences)')
        // Still ensure handlers are attached
        setTimeout(() => addImageClickHandlers(), 50)
        return
      }

      // Log difference to debug
      console.log('📊 Content comparison:', {
        currentLength: currentContent.length,
        propLength: htmlContent.length,
        diff: Math.abs(currentContent.length - htmlContent.length)
      })

      console.log('🔄 Resetting innerHTML from prop')
      contentRef.current.innerHTML = htmlContent
      // Clear localStorage when new worksheet is loaded (prevents old cached worksheets from showing)
      localStorage.removeItem('worksheet-editor-content')
      localStorage.removeItem('worksheet-editor-mascots')
      // Enable editing immediately
      contentRef.current.contentEditable = 'true'

      // Add click handlers to all images
      setTimeout(() => addImageClickHandlers(), 50)
    }
  }, [htmlContent, addImageClickHandlers])

  // Sync mascots when initialMascots changes
  useEffect(() => {
    if (initialMascots) {
      setMascots(initialMascots)
    }
  }, [initialMascots])

  // Ensure handlers are attached on mount and when content changes
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('⏰ Timeout triggered, calling addImageClickHandlers')
      addImageClickHandlers()
    }, 100)

    return () => clearTimeout(timer)
  }, [htmlContent, addImageClickHandlers]) // Added htmlContent as dependency

  // Add input listener for text changes (debounced autosave)
  useEffect(() => {
    const contentElement = contentRef.current
    if (!contentElement) return

    const handleInput = () => {
      scheduleAutosave()
    }

    contentElement.addEventListener('input', handleInput)
    return () => contentElement.removeEventListener('input', handleInput)
  }, [scheduleAutosave])

  // Initialize history with first state
  useEffect(() => {
    if (contentRef.current && history.length === 0) {
      const initialState: EditorState = {
        html: htmlContent,
        mascots: initialMascots || [],
        timestamp: Date.now()
      }
      setHistory([initialState])
      setCurrentHistoryIndex(0)
    }
  }, [htmlContent, initialMascots, history.length])

  // Auto-trigger save when mascots change (after state updates)
  const prevMascotsRef = useRef<Mascot[]>(initialMascots || [])
  const mascotsSaveScheduledRef = useRef(false)

  useEffect(() => {
    // Only trigger if mascots actually changed (not on initial mount)
    if (prevMascotsRef.current.length > 0 || mascots.length > 0) {
      if (JSON.stringify(prevMascotsRef.current) !== JSON.stringify(mascots)) {
        console.log(`🔄 Mascots changed: ${prevMascotsRef.current.length} → ${mascots.length}, triggering autosave`)

        // Debounce to prevent multiple rapid saves
        if (!mascotsSaveScheduledRef.current) {
          mascotsSaveScheduledRef.current = true
          setTimeout(() => {
            saveToHistory()
            performAutosave()
            mascotsSaveScheduledRef.current = false
          }, 100)
        }
      }
    }
    prevMascotsRef.current = mascots
  }, [mascots, saveToHistory, performAutosave])

  // Mascot handlers
  const handleAddMascot = (mascotPath: string) => {
    const newMascot: Mascot = {
      id: `mascot-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      src: mascotPath,
      x: 100, // Default position
      y: 100,
      width: 150, // Default size
      height: 150,
      rotation: 0,
      opacity: 1,
      zIndex: 1000 + mascots.length,
      locked: false
    }

    setMascots(prev => [...prev, newMascot])
    setSelectedMascotId(newMascot.id)
  }

  const handleUpdateMascot = (id: string, updates: Partial<Mascot>) => {
    setMascots(prev =>
      prev.map(mascot =>
        mascot.id === id ? { ...mascot, ...updates } : mascot
      )
    )
  }

  const handleDeleteMascot = (id: string) => {
    setMascots(prev => prev.filter(mascot => mascot.id !== id))
    if (selectedMascotId === id) {
      setSelectedMascotId(null)
    }
  }

  const handleSelectMascot = (id: string) => {
    setSelectedMascotId(id)
  }

  const handleDeselectMascot = () => {
    setSelectedMascotId(null)
    setShowContextMenu(false) // Close context menu when clicking outside
  }

  return (
    <div className="worksheet-editor-container">
      {/* Editor Toolbar */}
      <Card className="mb-4 p-3 bg-white shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Undo/Redo Controls */}
          <div className="flex items-center gap-1">
            <Button
              onClick={handleUndo}
              variant="ghost"
              size="sm"
              disabled={currentHistoryIndex <= 0}
              className="p-2"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleRedo}
              variant="ghost"
              size="sm"
              disabled={currentHistoryIndex >= history.length - 1}
              className="p-2"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 className="h-4 w-4" />
            </Button>

            <div className="border-l mx-2"></div>

            {/* Status Indicator */}
            {isSaving && (
              <span className="text-sm text-gray-500 animate-pulse">
                💾 Saving...
              </span>
            )}
            {!isSaving && showSaved && (
              <span className="text-sm text-green-600 font-medium animate-fade-in">
                ✓ Saved
              </span>
            )}
            {!isSaving && !showSaved && (
              <span className="text-sm text-gray-400">
                ✏️ Auto-saving
              </span>
            )}
          </div>

          {/* Mascot Tools */}
          <div className="flex items-center gap-1 border-l pl-2">
            <Button
              onClick={() => setShowMascotLibrary(true)}
              variant="ghost"
              size="sm"
              className="p-2"
              title="Add Mascot"
            >
              <ImagePlus className="h-4 w-4" />
            </Button>
            {mascots.length > 0 && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {mascots.length} mascot{mascots.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Formatting Tools */}
          <div className="flex items-center gap-1 border-l pl-2">
              <Button
                onMouseDown={(e) => {
                  e.preventDefault()
                  applyFormat('bold')
                }}
                variant="ghost"
                size="sm"
                className="p-2"
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                onMouseDown={(e) => {
                  e.preventDefault()
                  applyFormat('italic')
                }}
                variant="ghost"
                size="sm"
                className="p-2"
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                onMouseDown={(e) => {
                  e.preventDefault()
                  applyFormat('underline')
                }}
                variant="ghost"
                size="sm"
                className="p-2"
                title="Underline"
              >
                <Underline className="h-4 w-4" />
              </Button>

              <div className="border-l mx-1"></div>

              <select
                onChange={(e) => {
                  if (e.target.value) {
                    applyFormat('fontSize', e.target.value)
                    // Reset to default after applying
                    e.target.value = ""
                  }
                }}
                className="text-sm border rounded px-2 py-1"
                title="Font Size"
                defaultValue=""
              >
                <option value="">Size</option>
                <option value="1">Small</option>
                <option value="3">Normal</option>
                <option value="5">Large</option>
                <option value="7">Huge</option>
              </select>

              <input
                type="color"
                onChange={(e) => applyFormat('foreColor', e.target.value)}
                className="w-8 h-8 border rounded cursor-pointer"
                title="Text Color"
                defaultValue="#000000"
              />
            </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Editable Content Area with Mascot Layer */}
      <div
        ref={containerRef}
        className="worksheet-container relative"
        onClick={handleDeselectMascot}
        style={{ position: 'relative' }}
      >
        <div
          ref={contentRef}
          className="worksheet-content"
          style={{
            fontFamily: "'Times New Roman', serif",
            lineHeight: 1.6,
            minHeight: '500px',
            padding: '20px',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            border: '2px solid #3b82f6',
            outline: 'none',
            position: 'relative',
            zIndex: 1
          }}
        />

        {/* Mascot Layer - Absolute positioned overlay */}
        <div
          className="mascot-layer"
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
          {mascots.map(mascot => (
            <DraggableMascot
              key={mascot.id}
              mascot={mascot}
              onUpdate={handleUpdateMascot}
              onDelete={handleDeleteMascot}
              isSelected={selectedMascotId === mascot.id}
              onSelect={handleSelectMascot}
            />
          ))}
        </div>

        {/* Context Menu for Image Resize */}
        {showContextMenu && (
          <div
            className="image-context-menu"
            style={{
              position: 'fixed',
              left: `${contextMenuPosition.x}px`,
              top: `${contextMenuPosition.y}px`,
              background: 'white',
              padding: '8px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              border: '1px solid #e5e7eb',
              zIndex: 9999,
              minWidth: '150px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#6b7280', marginBottom: '8px', padding: '4px 8px' }}>
              Image Size
            </div>
            <button
              onClick={() => handleSizeChange(70)}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 16px',
                fontSize: '13px',
                textAlign: 'left',
                border: 'none',
                background: imageSize === 70 ? '#eff6ff' : 'transparent',
                color: imageSize === 70 ? '#3b82f6' : '#374151',
                cursor: 'pointer',
                borderRadius: '4px',
                fontWeight: imageSize === 70 ? 600 : 400
              }}
              onMouseEnter={(e) => {
                if (imageSize !== 70) {
                  e.currentTarget.style.background = '#f3f4f6'
                }
              }}
              onMouseLeave={(e) => {
                if (imageSize !== 70) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              Small (70%)
            </button>
            <button
              onClick={() => handleSizeChange(100)}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 16px',
                fontSize: '13px',
                textAlign: 'left',
                border: 'none',
                background: imageSize === 100 ? '#eff6ff' : 'transparent',
                color: imageSize === 100 ? '#3b82f6' : '#374151',
                cursor: 'pointer',
                borderRadius: '4px',
                fontWeight: imageSize === 100 ? 600 : 400
              }}
              onMouseEnter={(e) => {
                if (imageSize !== 100) {
                  e.currentTarget.style.background = '#f3f4f6'
                }
              }}
              onMouseLeave={(e) => {
                if (imageSize !== 100) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              Medium (100%)
            </button>
            <button
              onClick={() => handleSizeChange(150)}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 16px',
                fontSize: '13px',
                textAlign: 'left',
                border: 'none',
                background: imageSize === 150 ? '#eff6ff' : 'transparent',
                color: imageSize === 150 ? '#3b82f6' : '#374151',
                cursor: 'pointer',
                borderRadius: '4px',
                fontWeight: imageSize === 150 ? 600 : 400
              }}
              onMouseEnter={(e) => {
                if (imageSize !== 150) {
                  e.currentTarget.style.background = '#f3f4f6'
                }
              }}
              onMouseLeave={(e) => {
                if (imageSize !== 150) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              Large (150%)
            </button>
          </div>
        )}
      </div>

      {/* Simple Instructions */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">How to Edit:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Click anywhere in the worksheet and start typing</li>
          <li>• Select text and use the formatting buttons (Bold, Italic, etc.)</li>
          <li>• <strong>Click any image</strong> to replace it with a different one</li>
          <li>• <strong>Right-click any image</strong> to resize it (Small 70%, Medium 100%, Large 150%)</li>
          <li>• <strong>Click mascot icon</strong> to add fun characters to your worksheet</li>
          <li>• <strong>Drag mascots</strong> to reposition, resize from corner, or use controls to rotate/delete</li>
          <li>• <strong>Undo/Redo:</strong> Use Ctrl+Z / Ctrl+Y or the toolbar buttons</li>
          <li>• <strong>Auto-saves:</strong> Changes save automatically as you edit</li>
          <li>• Use "Download PDF" button to export your worksheet</li>
        </ul>
      </div>

      {/* Image Picker Modal */}
      <ImagePickerModal
        isOpen={showImagePicker}
        currentImagePath={selectedImageElement?.src || ''}
        onClose={() => setShowImagePicker(false)}
        onSelect={handleImageReplace}
      />

      {/* Mascot Library Modal */}
      <MascotLibraryModal
        isOpen={showMascotLibrary}
        onClose={() => setShowMascotLibrary(false)}
        onSelect={handleAddMascot}
      />

      <style jsx>{`
        /* Make contenteditable work properly */
        .worksheet-content[contenteditable="true"] {
          cursor: text;
        }

        .worksheet-content[contenteditable="true"]:focus {
          outline: none;
        }

        /* Ensure all child elements are editable */
        .worksheet-content[contenteditable="true"] * {
          user-select: text;
        }

        /* Image replacement hover effects */
        .worksheet-image-replaceable {
          transition: all 0.2s ease;
          border-radius: 4px;
        }

        .worksheet-image-replaceable:hover {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
          transform: scale(1.05);
        }

        /* Re-enable pointer events for images so they can be clicked */
        .worksheet-content[contenteditable="true"] img.worksheet-image-replaceable {
          user-select: none;
          pointer-events: auto !important;
        }

        /* Fade-in animation for save indicator */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        /* Toast animations */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}