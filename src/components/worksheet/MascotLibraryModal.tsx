'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X, Upload, ImagePlus } from 'lucide-react'

interface MascotLibraryModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (mascotPath: string) => void
}

export function MascotLibraryModal({ isOpen, onClose, onSelect }: MascotLibraryModalProps) {
  const [mascots, setMascots] = useState<string[]>([])
  const [selectedMascot, setSelectedMascot] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      loadMascots()
      setSelectedMascot('')
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      // Re-enable body scrolling when modal closes
      document.body.style.overflow = ''
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const loadMascots = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/mascots/list')
      const data = await response.json()

      if (data.mascots) {
        setMascots(data.mascots)
      }
    } catch (error) {
      console.error('Failed to load mascots:', error)
      setMascots([])
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, or SVG)')
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2MB')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('mascot', file)

      const response = await fetch('/api/mascots/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success && data.path) {
        // Add new mascot to the list
        setMascots(prev => [data.path, ...prev])
        setSelectedMascot(data.path)

        // Show success toast
        showToast('✓ Mascot uploaded successfully!')
      } else {
        alert(data.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload mascot')
    } finally {
      setUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const showToast = (message: string) => {
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
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-out'
      setTimeout(() => toast.remove(), 300)
    }, 2000)
  }

  const handleAddMascot = () => {
    if (selectedMascot) {
      onSelect(selectedMascot)
      onClose()
    }
  }

  const extractMascotName = (path: string): string => {
    const filename = path.split('/').pop() || ''
    return filename.replace(/\.(png|jpg|jpeg|svg)$/i, '').replace(/[-_]/g, ' ')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <Card className="fixed right-0 top-0 h-screen w-full max-w-2xl overflow-hidden text-left transition-transform duration-300 ease-out transform bg-white shadow-2xl relative z-10 flex flex-col">
        {/* Header - Fixed at top */}
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <div className="flex-1">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ImagePlus className="h-5 w-5" />
              Add Mascot to Worksheet
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Choose from library or upload your own
            </p>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Upload Section */}
        <div className="p-4 bg-blue-50 border-b flex-shrink-0">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/svg+xml"
            onChange={handleFileUpload}
            className="hidden"
            id="mascot-upload"
          />
          <label
            htmlFor="mascot-upload"
            className={`flex items-center justify-center gap-2 w-full p-3 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors ${
              uploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Upload className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              {uploading ? 'Uploading...' : 'Upload Your Own Mascot (PNG, JPG, SVG)'}
            </span>
          </label>
          <p className="text-xs text-blue-700 mt-2 text-center">
            Max file size: 2MB • Transparent PNGs work best
          </p>
        </div>

        {/* Content - Scrollable middle section */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading mascots...</p>
              </div>
            </div>
          ) : mascots.length === 0 ? (
            <div className="text-center py-12">
              <ImagePlus className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No mascots available yet</p>
              <p className="text-sm text-gray-400 mt-2">Upload your first mascot to get started!</p>
            </div>
          ) : (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Mascot Library ({mascots.length})
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {mascots.map((mascot, index) => (
                  <button
                    key={`${mascot}-${index}`}
                    onClick={() => setSelectedMascot(mascot)}
                    className={`relative group flex flex-col items-center p-4 rounded-lg border-2 transition-all hover:shadow-lg ${
                      selectedMascot === mascot
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    title={extractMascotName(mascot)}
                  >
                    {selectedMascot === mascot && (
                      <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}

                    <div className="w-full h-32 flex items-center justify-center mb-2">
                      <img
                        src={mascot}
                        alt={extractMascotName(mascot)}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    <p className="text-xs text-center text-gray-700 font-medium line-clamp-2 w-full">
                      {extractMascotName(mascot)}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Footer */}
        <div className="flex items-center justify-between px-4 pt-4 pb-6 border-t bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex-shrink-0 z-10">
          <p className="text-sm text-gray-500">
            {selectedMascot ? (
              <span className="text-blue-600 font-medium">Ready to add mascot</span>
            ) : (
              <span>Select a mascot to continue</span>
            )}
          </p>
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddMascot}
              disabled={!selectedMascot}
              size="sm"
              className={`${
                selectedMascot
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : ''
              }`}
            >
              Add to Worksheet
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
