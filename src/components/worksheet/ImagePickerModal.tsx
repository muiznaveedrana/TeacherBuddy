'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X, Check } from 'lucide-react'

interface Image {
  path: string
  name: string
  category: string
}

interface ImagePickerModalProps {
  isOpen: boolean
  currentImagePath: string
  onClose: () => void
  onSelect: (newImagePath: string) => void
}

export function ImagePickerModal({ isOpen, currentImagePath, onClose, onSelect }: ImagePickerModalProps) {
  const [images, setImages] = useState<Image[]>([])
  const [selectedImage, setSelectedImage] = useState<string>(currentImagePath)
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [currentCategory, setCurrentCategory] = useState({ type: '', category: '' })

  useEffect(() => {
    if (isOpen) {
      setShowAll(false) // Reset to category view when reopening
      loadImages(false)
      setSelectedImage(currentImagePath)
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
  }, [isOpen, currentImagePath])

  useEffect(() => {
    if (isOpen) {
      loadImages(showAll)
    }
  }, [showAll])

  const loadImages = async (loadAll: boolean = false) => {
    setLoading(true)
    try {
      let url = '/api/images/list?'

      if (loadAll) {
        // Load all images
        url = '/api/images/list?type=all'
        setCurrentCategory({ type: 'all', category: 'all' })
      } else {
        // Get type and category from current image path
        const { type, category } = extractTypeAndCategory(currentImagePath)
        setCurrentCategory({ type, category })

        // Fetch available images from the same category
        if (type) url += `type=${type}&`
        if (category) url += `category=${category}`

        // If we don't have type or category, get all images
        if (!type && !category) {
          url = '/api/images/list?type=all'
        }
      }

      console.log('Loading images from:', url)
      const response = await fetch(url)
      const data = await response.json()

      setImages(data.images || [])
    } catch (error) {
      console.error('Failed to load images:', error)
      setImages([])
    } finally {
      setLoading(false)
    }
  }

  const extractTypeAndCategory = (path: string): { type: string, category: string } => {
    // Extract type and category from path like:
    // /images/WORKSHEET_OBJECTS/counting/fruits/apple.png
    // /images/WORKSHEET_OBJECTS/money/UK-coins/1p.png

    const parts = path.split('/')
    const worksheetIndex = parts.indexOf('WORKSHEET_OBJECTS')

    if (worksheetIndex === -1) {
      return { type: 'all', category: 'all' }
    }

    // Type is the folder after WORKSHEET_OBJECTS (e.g., 'counting', 'money')
    const type = parts[worksheetIndex + 1] || 'all'

    // Category is the next folder (e.g., 'fruits', 'UK-coins')
    const category = parts[worksheetIndex + 2] || 'all'

    return { type, category }
  }

  const extractImageName = (path: string): string => {
    const filename = path.split('/').pop() || ''
    return filename.replace(/\.(png|jpg|jpeg|svg)$/i, '').replace(/[-_]/g, ' ')
  }

  const handleReplace = () => {
    if (selectedImage) {
      onSelect(selectedImage)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Center container */}
      <div className="min-h-screen px-4 text-center">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        {/* Modal */}
        <Card className="inline-block w-full max-w-4xl max-h-[85vh] my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-lg relative z-10 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Replace Image</h2>
            <p className="text-sm text-gray-500">
              Current: {extractImageName(currentImagePath)}
              {currentCategory.type && currentCategory.type !== 'all' && (
                <span> • Category: {currentCategory.type}/{currentCategory.category}</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              {showAll ? 'Show Category' : 'Browse All'}
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading images...</p>
              </div>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No images available in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-6 gap-4">
              {images.map((image) => (
                <button
                  key={image.path}
                  onClick={() => setSelectedImage(image.path)}
                  className={`relative group flex flex-col items-center p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                    selectedImage === image.path
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {/* Selected Badge */}
                  {selectedImage === image.path && (
                    <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}

                  {/* Current Badge */}
                  {currentImagePath === image.path && selectedImage !== image.path && (
                    <div className="absolute -top-2 -right-2 bg-gray-500 rounded-full p-1">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}

                  {/* Image */}
                  <div className="w-20 h-20 flex items-center justify-center mb-2">
                    <img
                      src={image.path}
                      alt={image.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {/* Name */}
                  <p className="text-xs text-center text-gray-700 line-clamp-2">
                    {image.name}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
          <Button
            onClick={onClose}
            variant="outline"
            size="sm"
          >
            Cancel
          </Button>
          <Button
            onClick={handleReplace}
            disabled={!selectedImage || selectedImage === currentImagePath}
            size="sm"
            className={`${
              selectedImage && selectedImage !== currentImagePath
                ? 'bg-green-600 hover:bg-green-700 animate-pulse'
                : ''
            }`}
          >
            Replace
          </Button>
        </div>
      </Card>
      </div>
    </div>
  )
}
