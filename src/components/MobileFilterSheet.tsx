'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { X, SlidersHorizontal, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackMobileFilterSheet, trackQuickFilter, trackFilterChange } from '@/lib/utils/analytics'

// Year groups with dual US/UK labels
const YEAR_GROUPS = [
  { value: 'Reception', label: 'Kindergarten', shortLabel: 'K' },
  { value: 'Year 1', label: 'Grade 1', shortLabel: '1' },
  { value: 'Year 2', label: 'Grade 2', shortLabel: '2' },
  { value: 'Year 3', label: 'Grade 3', shortLabel: '3' },
  { value: 'Year 4', label: 'Grade 4', shortLabel: '4' },
  { value: 'Year 5', label: 'Grade 5', shortLabel: '5' },
  { value: 'Year 6', label: 'Grade 6', shortLabel: '6' },
]

const TOPICS = [
  { value: 'number-counting', label: 'Counting' },
  { value: 'addition-subtraction', label: 'Addition' },
  { value: 'multiplication-division', label: 'Multiplication' },
  { value: 'fractions', label: 'Fractions' },
  { value: 'shape-space', label: 'Shapes' },
  { value: 'measurement', label: 'Measurement' },
  { value: 'number-place-value', label: 'Place Value' },
]

// Quick filter pills - most popular combinations
const QUICK_FILTERS = [
  { label: 'Kindergarten', params: { year_group: 'Reception' } },
  { label: 'Grade 1', params: { year_group: 'Year 1' } },
  { label: 'Grade 2', params: { year_group: 'Year 2' } },
  { label: 'Counting', params: { topic: 'number-counting' } },
  { label: 'Addition', params: { topic: 'addition-subtraction' } },
  { label: 'Shapes', params: { topic: 'shape-space' } },
]

interface MobileFilterSheetProps {
  className?: string
}

export function MobileFilterSheet({ className }: MobileFilterSheetProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>('grade')
  const [isApplying, setIsApplying] = useState(false)

  // Current filter values
  const currentYearGroup = searchParams?.get('year_group') || ''
  const currentTopic = searchParams?.get('topic') || ''

  // Count active filters
  const activeFilterCount = [currentYearGroup, currentTopic].filter(Boolean).length

  // Update filter and navigate
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '')

    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    params.delete('page')

    // Track filter change
    trackFilterChange(key, value || 'all')

    router.push(`/library?${params.toString()}`)
  }

  // Apply quick filter
  const applyQuickFilter = (filterParams: { year_group?: string; topic?: string }, filterLabel: string) => {
    const params = new URLSearchParams()
    Object.entries(filterParams).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })

    // Track quick filter click
    trackQuickFilter(filterLabel)

    router.push(`/library?${params.toString()}`)
  }

  // Check if quick filter is active
  const isQuickFilterActive = (filterParams: Record<string, string>) => {
    return Object.entries(filterParams).every(([key, value]) => {
      return searchParams?.get(key) === value
    })
  }

  // Clear all filters
  const clearFilters = () => {
    router.push('/library')
    setIsOpen(false)
  }

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Quick Filter Pills - Always visible above grid on mobile/tablet */}
      <div className={`lg:hidden ${className}`}>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {/* Filter button */}
          <button
            onClick={() => {
              setIsOpen(true)
              trackMobileFilterSheet('open')
            }}
            className={`
              flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border-2 font-medium text-sm
              transition-all active:scale-95
              ${activeFilterCount > 0
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }
            `}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-white text-blue-600 px-1.5 py-0.5 rounded-full text-xs font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Quick filter pills */}
          {QUICK_FILTERS.map((filter) => {
            const isActive = isQuickFilterActive(filter.params)
            return (
              <button
                key={filter.label}
                onClick={() => applyQuickFilter(filter.params, filter.label)}
                className={`
                  flex-shrink-0 px-4 py-2.5 rounded-full border-2 font-medium text-sm
                  transition-all active:scale-95 whitespace-nowrap
                  ${isActive
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-[hsl(48,20%,99%)] text-gray-700 border-[hsl(38,30%,85%)] hover:border-[hsl(38,40%,75%)]'
                  }
                `}
              >
                {filter.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom Sheet Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={`
          fixed inset-x-0 bottom-0 z-50 lg:hidden
          bg-[hsl(48,20%,99%)] rounded-t-3xl shadow-2xl
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
          max-h-[85vh] flex flex-col
        `}
      >
        {/* Grab handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3 border-b">
          <h2 className="text-lg font-semibold">Filter Worksheets</h2>
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Clear all
              </Button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable filter content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Grade Level Section */}
          <div className="border rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === 'grade' ? null : 'grade')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium">Grade Level</span>
                {currentYearGroup && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                    {YEAR_GROUPS.find(y => y.value === currentYearGroup)?.label || currentYearGroup}
                  </span>
                )}
              </div>
              {expandedSection === 'grade' ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {expandedSection === 'grade' && (
              <div className="p-4 grid grid-cols-3 gap-2">
                <button
                  onClick={() => updateFilter('year_group', 'all')}
                  className={`
                    p-3 rounded-lg border-2 text-sm font-medium transition-all active:scale-95
                    ${!currentYearGroup
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  All
                </button>
                {YEAR_GROUPS.map((year) => (
                  <button
                    key={year.value}
                    onClick={() => updateFilter('year_group', year.value)}
                    className={`
                      p-3 rounded-lg border-2 text-sm font-medium transition-all active:scale-95
                      ${currentYearGroup === year.value
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    {year.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Topic Section */}
          <div className="border rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === 'topic' ? null : 'topic')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium">Topic</span>
                {currentTopic && (
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
                    {TOPICS.find(t => t.value === currentTopic)?.label || currentTopic}
                  </span>
                )}
              </div>
              {expandedSection === 'topic' ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {expandedSection === 'topic' && (
              <div className="p-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateFilter('topic', 'all')}
                  className={`
                    p-3 rounded-lg border-2 text-sm font-medium transition-all active:scale-95
                    ${!currentTopic
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  All Topics
                </button>
                {TOPICS.map((topic) => (
                  <button
                    key={topic.value}
                    onClick={() => updateFilter('topic', topic.value)}
                    className={`
                      p-3 rounded-lg border-2 text-sm font-medium transition-all active:scale-95
                      ${currentTopic === topic.value
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sticky footer with Apply button */}
        <div className="flex-shrink-0 border-t bg-[hsl(48,20%,99%)] p-4 pb-8">
          <Button
            onClick={() => {
              setIsApplying(true)
              trackMobileFilterSheet('apply')
              // Small delay to show the loading state before closing
              setTimeout(() => {
                setIsOpen(false)
                setIsApplying(false)
              }, 300)
            }}
            disabled={isApplying}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-base active:scale-[0.98] disabled:opacity-70"
          >
            {isApplying ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Applying...
              </>
            ) : (
              'Show Results'
            )}
          </Button>
        </div>
      </div>

      {/* Scrollbar hide style */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  )
}
