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

interface WorksheetEditorProps {
  htmlContent: string
  onSave?: (content: string) => void
}

export function WorksheetEditor({ htmlContent, onSave }: WorksheetEditorProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [showSaved, setShowSaved] = useState(false)

  // Initialize content when component mounts or htmlContent changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = htmlContent
      // Clear localStorage when new worksheet is loaded (prevents old cached worksheets from showing)
      localStorage.removeItem('worksheet-editor-content')
      // Enable editing immediately
      contentRef.current.contentEditable = 'true'
    }
  }, [htmlContent])

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
          <li>• Click "Done" when finished - changes save automatically</li>
          <li>• Use "Download PDF" button to export your worksheet</li>
        </ul>
      </div>

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

        /* Fix for images in contenteditable */
        .worksheet-content[contenteditable="true"] img {
          user-select: none;
          pointer-events: none;
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
      `}</style>
    </div>
  )
}