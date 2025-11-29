'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

type LayoutType = 'standard' | 'two-column' | 'grid' | 'differentiated' | 'reasoning'

interface LayoutOption {
  id: LayoutType
  name: string
  description: string
  icon: string
  preview: React.ReactNode
}

interface VisualLayoutSelectorProps {
  value: LayoutType
  onChange: (layout: LayoutType) => void
  disabled?: boolean
  className?: string
}

const layoutOptions: LayoutOption[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Numbered questions with working space',
    icon: '📝',
    preview: (
      <div className="space-y-1.5 p-2">
        <div className="h-2 w-8 bg-gray-400 rounded" />
        <div className="space-y-1">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full border-2 border-gray-400" />
            <div className="h-3 flex-1 bg-gray-300 rounded" />
          </div>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full border-2 border-gray-400" />
            <div className="h-3 flex-1 bg-gray-300 rounded" />
          </div>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full border-2 border-gray-400" />
            <div className="h-3 flex-1 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'two-column',
    name: 'Two Column',
    description: 'High-volume arithmetic practice',
    icon: '📊',
    preview: (
      <div className="space-y-1.5 p-2">
        <div className="h-2 w-8 bg-gray-400 rounded" />
        <div className="grid grid-cols-2 gap-1">
          <div className="space-y-0.5">
            <div className="h-2 bg-gray-300 rounded" />
            <div className="h-2 bg-gray-300 rounded" />
            <div className="h-2 bg-gray-300 rounded" />
          </div>
          <div className="space-y-0.5">
            <div className="h-2 bg-gray-300 rounded" />
            <div className="h-2 bg-gray-300 rounded" />
            <div className="h-2 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'grid',
    name: 'Grid',
    description: 'Tables for multiplication & place value',
    icon: '🔢',
    preview: (
      <div className="space-y-1.5 p-2">
        <div className="h-2 w-8 bg-gray-400 rounded" />
        <div className="grid grid-cols-3 gap-0.5">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="h-3 bg-gray-300 rounded-sm border border-gray-400" />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'differentiated',
    name: 'Differentiated',
    description: 'Mild/Medium/Hot sections for mixed-ability',
    icon: '🌡️',
    preview: (
      <div className="space-y-1 p-2">
        <div className="h-2 w-8 bg-gray-400 rounded" />
        <div className="flex gap-1">
          <div className="flex-1 h-3 bg-green-300 rounded-sm" />
          <div className="flex-1 h-3 bg-yellow-300 rounded-sm" />
          <div className="flex-1 h-3 bg-orange-300 rounded-sm" />
        </div>
        <div className="flex gap-1">
          <div className="flex-1 h-2 bg-green-200 rounded-sm" />
          <div className="flex-1 h-2 bg-yellow-200 rounded-sm" />
          <div className="flex-1 h-2 bg-orange-200 rounded-sm" />
        </div>
      </div>
    ),
  },
  {
    id: 'reasoning',
    name: 'Reasoning',
    description: 'Problem-solving with explanation boxes',
    icon: '💭',
    preview: (
      <div className="space-y-1.5 p-2">
        <div className="h-2 w-8 bg-gray-400 rounded" />
        <div className="space-y-1">
          <div className="h-4 bg-blue-200 rounded border border-blue-300" />
          <div className="h-6 bg-gray-200 rounded border-2 border-dashed border-gray-300" />
        </div>
      </div>
    ),
  },
]

export function VisualLayoutSelector({
  value,
  onChange,
  disabled = false,
  className,
}: VisualLayoutSelectorProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <label className="block text-sm font-semibold text-gray-700">
        Choose Layout Style
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {layoutOptions.map((layout) => {
          const isSelected = value === layout.id

          return (
            <button
              key={layout.id}
              type="button"
              onClick={() => !disabled && onChange(layout.id)}
              disabled={disabled}
              className={cn(
                'relative flex flex-col rounded-xl border-2 transition-all duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-100'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-md z-10">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
              )}

              {/* Preview Area */}
              <div className={cn(
                'aspect-[4/3] w-full rounded-t-lg border-b overflow-hidden',
                isSelected ? 'border-blue-200 bg-white' : 'border-gray-100 bg-gray-50'
              )}>
                {layout.preview}
              </div>

              {/* Label Area */}
              <div className="p-2 space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">{layout.icon}</span>
                  <span className={cn(
                    'text-sm font-medium truncate',
                    isSelected ? 'text-blue-700' : 'text-gray-900'
                  )}>
                    {layout.name}
                  </span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 text-left">
                  {layout.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Helper Text */}
      <p className="text-xs text-gray-500">
        Select the layout that best matches your teaching objective
      </p>
    </div>
  )
}

export default VisualLayoutSelector
