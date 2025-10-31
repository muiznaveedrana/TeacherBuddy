'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Bold,
  Italic,
  Underline,
  Check,
  X
} from 'lucide-react'
import { ImagePickerModal } from './ImagePickerModal'

interface WorksheetEditorProps {
  htmlContent: string
  onSave?: (content: string) => void
}

export function WorksheetEditor({ htmlContent, onSave }: WorksheetEditorProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [showSaved, setShowSaved] = useState(false)
  const [showImagePicker, setShowImagePicker] = useState(false)
  const [selectedImageElement, setSelectedImageElement] = useState<HTMLImageElement | null>(null)
  const [replacementCount, setReplacementCount] = useState(0)

  // Initialize content when component mounts or htmlContent changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = htmlContent
      // Clear localStorage when new worksheet is loaded (prevents old cached worksheets from showing)
      localStorage.removeItem('worksheet-editor-content')
      // Enable editing immediately
      contentRef.current.contentEditable = 'true'

      // Add click handlers to all images
      addImageClickHandlers()
    }
  }, [htmlContent])

  // Add click handlers to images for replacement
  const addImageClickHandlers = () => {
    if (!contentRef.current) return

    const images = contentRef.current.querySelectorAll('img')
    images.forEach((img) => {
      // Make images non-editable to prevent contentEditable issues
      img.contentEditable = 'false'
      img.style.cursor = 'pointer'

      // Add hover effect class
      img.classList.add('worksheet-image-replaceable')

      // Add click handler
      img.addEventListener('click', (e) => {
        e.stopPropagation()
        handleImageClick(img)
      })

      // Add tooltip
      img.title = 'Click to change image'
    })
  }

  const handleImageClick = (img: HTMLImageElement) => {
    setSelectedImageElement(img)
    setShowImagePicker(true)
  }

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

      // Call onSave callback if provided
      if (onSave) {
        onSave(content)
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
      setShowSaved(false)
    }
  }

  return (
    <div className="worksheet-editor-container">
      {/* Editor Toolbar */}
      <Card className="mb-4 p-3 bg-white shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Button
              onClick={handleDone}
              variant="default"
              size="sm"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <Check className="h-4 w-4" />
              Done
            </Button>

            <span className="text-sm text-muted-foreground">
              ✏️ Editing... Auto-saves when done
            </span>

            {showSaved && (
              <span className="text-sm text-green-600 font-medium animate-fade-in">
                ✓ Saved
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

      {/* Editable Content Area */}
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
          outline: 'none'
        }}
      />

      {/* Simple Instructions */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">How to Edit:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Click anywhere in the worksheet and start typing</li>
          <li>• Select text and use the formatting buttons (Bold, Italic, etc.)</li>
          <li>• <strong>Click any image</strong> to replace it with a different one</li>
          <li>• Click "Done" when finished - changes save automatically</li>
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