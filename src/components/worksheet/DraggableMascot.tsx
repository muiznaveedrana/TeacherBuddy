'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Trash2, Lock, Unlock, RotateCw } from 'lucide-react'

interface Mascot {
  id: string
  src: string
  x: number        // pixels
  y: number
  width: number
  height: number
  rotation: number
  opacity: number
  zIndex: number
  locked: boolean
}

interface DraggableMascotProps {
  mascot: Mascot
  onUpdate: (id: string, updates: Partial<Mascot>) => void
  onDelete: (id: string) => void
  isSelected: boolean
  onSelect: (id: string) => void
}

export function DraggableMascot({
  mascot,
  onUpdate,
  onDelete,
  isSelected,
  onSelect
}: DraggableMascotProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, x: 0, y: 0 })
  const mascotRef = useRef<HTMLDivElement>(null)

  // Handle click to select
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!mascot.locked) {
      onSelect(mascot.id)
    }
  }

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (mascot.locked) return

    e.stopPropagation()
    setIsDragging(true)
    setDragStart({
      x: e.clientX - mascot.x,
      y: e.clientY - mascot.y
    })
    onSelect(mascot.id)
  }

  // Handle resize start
  const handleResizeStart = (e: React.MouseEvent) => {
    if (mascot.locked) return

    e.stopPropagation()
    setIsResizing(true)
    setResizeStart({
      width: mascot.width,
      height: mascot.height,
      x: e.clientX,
      y: e.clientY
    })
  }

  // Handle mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !mascot.locked) {
        const newX = e.clientX - dragStart.x
        const newY = e.clientY - dragStart.y

        onUpdate(mascot.id, { x: newX, y: newY })
      }

      if (isResizing && !mascot.locked) {
        const deltaX = e.clientX - resizeStart.x
        const deltaY = e.clientY - resizeStart.y

        // Use the larger delta to maintain aspect ratio
        const delta = Math.max(deltaX, deltaY)

        const newWidth = Math.max(50, resizeStart.width + delta)
        const newHeight = Math.max(50, resizeStart.height + delta)

        onUpdate(mascot.id, { width: newWidth, height: newHeight })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, isResizing, dragStart, resizeStart, mascot.locked, mascot.id, onUpdate])

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(mascot.id)
  }

  const handleToggleLock = (e: React.MouseEvent) => {
    e.stopPropagation()
    onUpdate(mascot.id, { locked: !mascot.locked })
  }

  const handleRotate = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newRotation = (mascot.rotation + 45) % 360
    onUpdate(mascot.id, { rotation: newRotation })
  }

  return (
    <div
      ref={mascotRef}
      className={`absolute cursor-move select-none transition-shadow ${
        isSelected && !mascot.locked ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      } ${mascot.locked ? 'cursor-not-allowed' : ''} ${
        isDragging ? 'opacity-70' : ''
      }`}
      style={{
        left: `${mascot.x}px`,
        top: `${mascot.y}px`,
        width: `${mascot.width}px`,
        height: `${mascot.height}px`,
        zIndex: mascot.zIndex,
        opacity: mascot.opacity,
        transform: `rotate(${mascot.rotation}deg)`,
        pointerEvents: 'auto'
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      {/* Mascot Image */}
      <img
        src={mascot.src}
        alt="Mascot"
        className="w-full h-full object-contain pointer-events-none"
        draggable={false}
        style={{ opacity: mascot.locked ? 0.8 : 1 }}
      />

      {/* Selection Controls */}
      {isSelected && !mascot.locked && (
        <>
          {/* Resize Handle (bottom-right corner) */}
          <div
            className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500 border-2 border-white rounded-full cursor-nwse-resize hover:bg-blue-600 shadow-md"
            onMouseDown={handleResizeStart}
            title="Drag to resize"
          >
            <svg className="w-full h-full p-1 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>

          {/* Quick Action Bar */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 flex items-center gap-1 bg-white rounded-lg shadow-lg border border-gray-200 p-1">
            <button
              onClick={handleRotate}
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              title="Rotate 45°"
            >
              <RotateCw className="h-4 w-4 text-gray-700" />
            </button>
            <button
              onClick={handleToggleLock}
              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
              title="Lock position"
            >
              {mascot.locked ? (
                <Lock className="h-4 w-4 text-gray-700" />
              ) : (
                <Unlock className="h-4 w-4 text-gray-700" />
              )}
            </button>
            <div className="w-px h-4 bg-gray-300"></div>
            <button
              onClick={handleDelete}
              className="p-1.5 hover:bg-red-100 rounded transition-colors"
              title="Delete mascot"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </button>
          </div>
        </>
      )}

      {/* Lock Indicator */}
      {mascot.locked && (
        <div className="absolute top-1 right-1 bg-gray-800 bg-opacity-75 rounded-full p-1">
          <Lock className="h-3 w-3 text-white" />
        </div>
      )}
    </div>
  )
}
