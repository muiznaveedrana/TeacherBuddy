'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const YEAR_GROUPS = [
  'Reception',
  'Year 1',
  'Year 2',
  'Year 3',
  'Year 4',
  'Year 5',
  'Year 6',
]

const VISUAL_THEMES = ['animals', 'fruits', 'toys', 'vehicles', 'food', 'sports', 'space']

const ACTIVITY_TYPES = [
  'circle-answer',
  'fill-blanks',
  'matching',
  'color-count',
  'trace-write',
  'cut-paste',
]

const SEASONAL_THEMES = ['christmas', 'halloween', 'easter', 'summer', 'spring', 'autumn']

// NOTE: These values MUST match exactly what's stored in the database
const TOPICS = [
  'addition-subtraction',
  'fractions',
  'measurement',
  'multiplication-division',
  'number-counting',
  'number-place-value',
  'shape-space',
]

const SUBTOPICS = [
  'adding-to-20',
  'comparing-numbers',
  'counting-forwards-backwards',
  'counting-to-10',
  'counting-to-20',
  'equal-groups',
  'equivalent-fractions-simple',
  'length-height',
  'mental-strategies',
  'more-or-less',
  'number-bonds-10',
  'number-recognition',
  'numbers-to-20',
  'patterns',
  'rounding-nearest-10',
  'sharing-grouping',
  'size-comparison',
  'times-tables-2-5-10',
  'two-digit-numbers',
  'weight-capacity',
  'word-problems-simple',
]

// Helper function to convert kebab-case to Title Case for display
function formatLabel(value: string): string {
  return value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function LibraryFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Track which dropdown is currently open (only one can be open at a time)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const currentYearGroup = searchParams?.get('year_group') || ''
  const currentTopic = searchParams?.get('topic') || ''
  const currentSubtopic = searchParams?.get('subtopic') || ''
  const currentVisualTheme = searchParams?.get('visual_theme') || ''
  const currentActivityType = searchParams?.get('activity_type') || ''
  const currentSeasonalTheme = searchParams?.get('seasonal_theme') || ''

  const updateFilter = (key: string, value: string) => {
    console.log(`🔧 updateFilter called: key="${key}", value="${value}"`)
    const params = new URLSearchParams(searchParams?.toString() || '')

    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    params.delete('page')
    console.log(`🔧 Pushing to: /library?${params.toString()}`)
    router.push(`/library?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/library')
  }

  const hasActiveFilters = currentYearGroup || currentTopic || currentSubtopic || currentVisualTheme || currentActivityType || currentSeasonalTheme

  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Filters</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear
          </Button>
        )}
      </div>

      <div>
        <Label htmlFor="year_group">Year Group</Label>
        <Select
          value={currentYearGroup}
          onValueChange={(value) => updateFilter('year_group', value)}
          open={openDropdown === 'year_group'}
          onOpenChange={(isOpen) => {
            setOpenDropdown(isOpen ? 'year_group' : null)
            console.log(`📅 Year Group dropdown ${isOpen ? 'OPENED' : 'CLOSED'}`)
          }}
        >
          <SelectTrigger id="year_group" className="mt-1">
            <SelectValue placeholder="All Years" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {YEAR_GROUPS.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="topic">Topic</Label>
        <Select
          value={currentTopic}
          onValueChange={(value) => updateFilter('topic', value)}
          open={openDropdown === 'topic'}
          onOpenChange={(isOpen) => {
            setOpenDropdown(isOpen ? 'topic' : null)
            console.log(`📖 Topic dropdown ${isOpen ? 'OPENED' : 'CLOSED'}`)
          }}
        >
          <SelectTrigger id="topic" className="mt-1">
            <SelectValue placeholder="All Topics" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Topics</SelectItem>
            {TOPICS.map((topic) => (
              <SelectItem key={topic} value={topic}>
                {formatLabel(topic)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="subtopic">Subtopic</Label>
        <Select
          value={currentSubtopic}
          onValueChange={(value) => updateFilter('subtopic', value)}
          open={openDropdown === 'subtopic'}
          onOpenChange={(isOpen) => setOpenDropdown(isOpen ? 'subtopic' : null)}
        >
          <SelectTrigger id="subtopic" className="mt-1">
            <SelectValue placeholder="All Subtopics" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subtopics</SelectItem>
            {SUBTOPICS.map((subtopic) => (
              <SelectItem key={subtopic} value={subtopic}>
                {formatLabel(subtopic)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="visual_theme">Visual Theme</Label>
        <Select
          value={currentVisualTheme}
          onValueChange={(value) => updateFilter('visual_theme', value)}
          open={openDropdown === 'visual_theme'}
          onOpenChange={(isOpen) => setOpenDropdown(isOpen ? 'visual_theme' : null)}
        >
          <SelectTrigger id="visual_theme" className="mt-1">
            <SelectValue placeholder="All Themes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Themes</SelectItem>
            {VISUAL_THEMES.map((theme) => (
              <SelectItem key={theme} value={theme}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="activity_type">Activity Type</Label>
        <Select
          value={currentActivityType}
          onValueChange={(value) => updateFilter('activity_type', value)}
          open={openDropdown === 'activity_type'}
          onOpenChange={(isOpen) => setOpenDropdown(isOpen ? 'activity_type' : null)}
        >
          <SelectTrigger id="activity_type" className="mt-1">
            <SelectValue placeholder="All Activities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Activities</SelectItem>
            {ACTIVITY_TYPES.map((activity) => (
              <SelectItem key={activity} value={activity}>
                {activity.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="seasonal_theme">Seasonal Theme</Label>
        <Select
          value={currentSeasonalTheme}
          onValueChange={(value) => updateFilter('seasonal_theme', value)}
          open={openDropdown === 'seasonal_theme'}
          onOpenChange={(isOpen) => setOpenDropdown(isOpen ? 'seasonal_theme' : null)}
        >
          <SelectTrigger id="seasonal_theme" className="mt-1">
            <SelectValue placeholder="All Seasons" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Seasons</SelectItem>
            {SEASONAL_THEMES.map((season) => (
              <SelectItem key={season} value={season}>
                {season.charAt(0).toUpperCase() + season.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
