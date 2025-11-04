'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X, Check, Search } from 'lucide-react'

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
  const [filteredImages, setFilteredImages] = useState<Image[]>([])
  const [selectedImage, setSelectedImage] = useState<string>(currentImagePath)
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [currentCategory, setCurrentCategory] = useState({ type: '', category: '' })
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (isOpen) {
      setShowAll(false) // Reset to category view when reopening
      setSearchQuery('') // Reset search query
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

  // Filter images based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredImages(images)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = images.filter(image =>
        image.name.toLowerCase().includes(query) ||
        image.category.toLowerCase().includes(query)
      )
      setFilteredImages(filtered)
    }
  }, [searchQuery, images])

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

      const loadedImages = data.images || []
      setImages(loadedImages)
      setFilteredImages(loadedImages)
    } catch (error) {
      console.error('Failed to load images:', error)
      setImages([])
      setFilteredImages([])
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
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <Card className="fixed right-0 top-0 h-screen w-full max-w-3xl overflow-hidden text-left transition-transform duration-300 ease-out transform bg-white shadow-2xl relative z-10 flex flex-col">
        {/* Header - Fixed at top */}
        <div className="flex flex-col border-b flex-shrink-0">
          <div className="flex items-center justify-between p-4 pb-3">
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Replace Image</h2>
              <p className="text-sm text-gray-500">
                Current: {extractImageName(currentImagePath)}
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

          {/* Search Box */}
          <div className="px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search images... (e.g., apple, star, circle)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-xs text-gray-500 mt-1">
                Found {filteredImages.length} image{filteredImages.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        {/* Content - Scrollable middle section */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading images...</p>
              </div>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {searchQuery ? `No images found for "${searchQuery}"` : 'No images available'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-blue-500 text-sm mt-2 hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-6 gap-2">
              {filteredImages.map((image) => (
                <button
                  key={image.path}
                  onClick={() => setSelectedImage(image.path)}
                  className={`relative group flex flex-col items-center p-2 rounded-md border transition-all hover:shadow-md ${
                    selectedImage === image.path
                      ? 'border-blue-500 bg-blue-50 border-2'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  title={image.name}
                >
                  {selectedImage === image.path && (
                    <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}

                  <div className="w-16 h-16 flex items-center justify-center mb-1">
                    <img
                      src={image.path}
                      alt={image.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  <p className="text-[10px] text-center text-gray-700 line-clamp-1 w-full">
                    {image.name}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sticky Footer - Always visible at bottom of Card */}
        <div className="flex items-center justify-between px-4 pt-4 pb-6 border-t bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex-shrink-0 z-10">
          <p className="text-sm text-gray-500">
            {selectedImage && selectedImage !== currentImagePath ? (
              <span className="text-blue-600 font-medium">Ready to replace</span>
            ) : (
              <span>Showing {filteredImages.length} of {images.length} images</span>
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
              onClick={handleReplace}
              disabled={!selectedImage || selectedImage === currentImagePath}
              size="sm"
              className={`${
                selectedImage && selectedImage !== currentImagePath
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : ''
              }`}
            >
              Replace
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
