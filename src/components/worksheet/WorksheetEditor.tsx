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
}

interface EditorState {
  html: string
  mascots: Mascot[]
  timestamp: number
}

export function WorksheetEditor({ htmlContent, initialMascots, onSave }: WorksheetEditorProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [showSaved, setShowSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showImagePicker, setShowImagePicker] = useState(false)
  const [selectedImageElement, setSelectedImageElement] = useState<HTMLImageElement | null>(null)
  const [replacementCount, setReplacementCount] = useState(0)

  // Mascot state - initialize with initialMascots if provided
  const [mascots, setMascots] = useState<Mascot[]>(initialMascots || [])
  const [showMascotLibrary, setShowMascotLibrary] = useState(false)
  const [selectedMascotId, setSelectedMascotId] = useState<string | null>(null)

  // History state for undo/redo
  const [history, setHistory] = useState<EditorState[]>([])
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1)
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isUndoingRef = useRef(false)

  const handleImageReplace = (newImagePath: string) => {
    if (!selectedImageElement || !contentRef.current) return

    const oldImagePath = selectedImageElement.src
    const oldImageSrc = new URL(oldImagePath).pathname

    // Find all images with the same src and replace them
    const images = contentRef.current.querySelectorAll('img')
    let count = 0

    images.forEach((img) => {
      const imgSrc = new URL(img.src).pathname
      if (imgSrc === oldImageSrc) {
        img.src = newImagePath
        count++
      }
    })

    setReplacementCount(count)

    // Show toast notification
    showToast(`✓ Replaced ${count} image${count > 1 ? 's' : ''}`)

    // Re-add click handlers to new images
    setTimeout(() => addImageClickHandlers(), 100)
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
    if (contentRef.current) {
      contentRef.current.innerHTML = htmlContent
      contentRef.current.contentEditable = 'true' // Keep in edit mode
      localStorage.removeItem('worksheet-editor-content')
      localStorage.removeItem('worksheet-editor-mascots')
      setMascots([])
      setShowSaved(false)
      // Clear history
      setHistory([])
      setCurrentHistoryIndex(-1)
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
    if (!contentRef.current) return

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
      setTimeout(() => setShowSaved(false), 2000)
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

  // Image click handler
  const handleImageClick = (img: HTMLImageElement) => {
    setSelectedImageElement(img)
    setShowImagePicker(true)
  }

  // Add click handlers to images for replacement
  const addImageClickHandlers = useCallback(() => {
    if (!contentRef.current) return

    const images = contentRef.current.querySelectorAll('img')
    images.forEach((img) => {
      img.contentEditable = 'false'
      img.style.cursor = 'pointer'
      img.classList.add('worksheet-image-replaceable')

      img.addEventListener('click', (e) => {
        e.stopPropagation()
        handleImageClick(img)
      })

      img.title = 'Click to change image'
    })
  }, [])

  // Undo function
  const handleUndo = useCallback(() => {
    if (currentHistoryIndex <= 0 || !contentRef.current) return

    isUndoingRef.current = true
    const newIndex = currentHistoryIndex - 1
    const previousState = history[newIndex]

    if (previousState) {
      contentRef.current.innerHTML = previousState.html
      setMascots(previousState.mascots)
      setCurrentHistoryIndex(newIndex)
      addImageClickHandlers()
    }

    setTimeout(() => {
      isUndoingRef.current = false
    }, 100)
  }, [currentHistoryIndex, history, addImageClickHandlers])

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
    }

    setTimeout(() => {
      isUndoingRef.current = false
    }, 100)
  }, [currentHistoryIndex, history, addImageClickHandlers])

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
      contentRef.current.innerHTML = htmlContent
      // Clear localStorage when new worksheet is loaded (prevents old cached worksheets from showing)
      localStorage.removeItem('worksheet-editor-content')
      localStorage.removeItem('worksheet-editor-mascots')
      // Enable editing immediately
      contentRef.current.contentEditable = 'true'

      // Add click handlers to all images
      addImageClickHandlers()
    }
  }, [htmlContent, addImageClickHandlers])

  // Sync mascots when initialMascots changes
  useEffect(() => {
    if (initialMascots) {
      setMascots(initialMascots)
    }
  }, [initialMascots])

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
      </div>

      {/* Simple Instructions */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">How to Edit:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Click anywhere in the worksheet and start typing</li>
          <li>• Select text and use the formatting buttons (Bold, Italic, etc.)</li>
          <li>• <strong>Click any image</strong> to replace it with a different one</li>
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