'use client'

import { useState, useMemo } from 'react'
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
import { CURRICULUM_MAPPING } from '@/lib/data/curriculum'

// Year groups with dual US/UK labels for display, value for database queries
const YEAR_GROUPS = [
  { value: 'Reception', label: 'Kindergarten / Reception' },
  { value: 'Year 1', label: 'Grade 1 / Year 1' },
  { value: 'Year 2', label: 'Grade 2 / Year 2' },
  { value: 'Year 3', label: 'Grade 3 / Year 3' },
  { value: 'Year 4', label: 'Grade 4 / Year 4' },
  { value: 'Year 5', label: 'Grade 5 / Year 5' },
  { value: 'Year 6', label: 'Grade 6 / Year 6' },
]

// Helper function to convert kebab-case to Title Case for display
function formatLabel(value: string): string {
  return value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Get all unique topics across all year groups
function getAllTopics(): Array<{ value: string; label: string }> {
  const topicMap = new Map<string, string>()

  Object.values(CURRICULUM_MAPPING).forEach(yearData => {
    Object.entries(yearData.topics).forEach(([key, topic]) => {
      if (!topicMap.has(key)) {
        topicMap.set(key, topic.label)
      }
    })
  })

  return Array.from(topicMap.entries())
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label))
}

// Get topics for a specific year group
function getTopicsForYearGroup(yearGroup: string): Array<{ value: string; label: string }> {
  const yearData = CURRICULUM_MAPPING[yearGroup]
  if (!yearData) return []

  return Object.entries(yearData.topics)
    .map(([key, topic]) => ({ value: key, label: topic.label }))
    .sort((a, b) => a.label.localeCompare(b.label))
}

// Get all unique subtopics across all year groups and topics
function getAllSubtopics(): Array<{ value: string; label: string }> {
  const subtopicMap = new Map<string, string>()

  Object.values(CURRICULUM_MAPPING).forEach(yearData => {
    Object.values(yearData.topics).forEach(topic => {
      topic.subtopics.forEach(subtopic => {
        if (!subtopicMap.has(subtopic.value)) {
          subtopicMap.set(subtopic.value, subtopic.label)
        }
      })
    })
  })

  return Array.from(subtopicMap.entries())
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label))
}

// Get subtopics for a specific topic across all year groups
function getSubtopicsForTopic(topicId: string): Array<{ value: string; label: string }> {
  const subtopicMap = new Map<string, string>()

  Object.values(CURRICULUM_MAPPING).forEach(yearData => {
    const topic = yearData.topics[topicId]
    if (topic) {
      topic.subtopics.forEach(subtopic => {
        if (!subtopicMap.has(subtopic.value)) {
          subtopicMap.set(subtopic.value, subtopic.label)
        }
      })
    }
  })

  return Array.from(subtopicMap.entries())
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label))
}

// Get subtopics for a specific year group (all topics)
function getSubtopicsForYearGroup(yearGroup: string): Array<{ value: string; label: string }> {
  const yearData = CURRICULUM_MAPPING[yearGroup]
  if (!yearData) return []

  const subtopicMap = new Map<string, string>()

  Object.values(yearData.topics).forEach(topic => {
    topic.subtopics.forEach(subtopic => {
      if (!subtopicMap.has(subtopic.value)) {
        subtopicMap.set(subtopic.value, subtopic.label)
      }
    })
  })

  return Array.from(subtopicMap.entries())
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label))
}

// Get subtopics for a specific year group and topic
function getSubtopicsForYearGroupAndTopic(yearGroup: string, topicId: string): Array<{ value: string; label: string }> {
  const yearData = CURRICULUM_MAPPING[yearGroup]
  if (!yearData || !yearData.topics[topicId]) return []

  return yearData.topics[topicId].subtopics
    .map(subtopic => ({ value: subtopic.value, label: subtopic.label }))
    .sort((a, b) => a.label.localeCompare(b.label))
}

// Check if a topic exists for a year group
function isTopicValidForYearGroup(yearGroup: string, topicId: string): boolean {
  if (!yearGroup) return true // All year groups selected
  const yearData = CURRICULUM_MAPPING[yearGroup]
  return yearData ? !!yearData.topics[topicId] : false
}

// Check if a subtopic exists for the current selection
function isSubtopicValidForSelection(yearGroup: string, topicId: string, subtopicValue: string): boolean {
  // No year group or topic selected - check all
  if (!yearGroup && !topicId) {
    return getAllSubtopics().some(s => s.value === subtopicValue)
  }

  // Only topic selected - check across all year groups for that topic
  if (!yearGroup && topicId) {
    return getSubtopicsForTopic(topicId).some(s => s.value === subtopicValue)
  }

  // Only year group selected - check all topics for that year group
  if (yearGroup && !topicId) {
    return getSubtopicsForYearGroup(yearGroup).some(s => s.value === subtopicValue)
  }

  // Both selected - check specific combination
  return getSubtopicsForYearGroupAndTopic(yearGroup, topicId).some(s => s.value === subtopicValue)
}

export function LibraryFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Track which dropdown is currently open (only one can be open at a time)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const currentYearGroup = searchParams?.get('year_group') || ''
  const currentTopic = searchParams?.get('topic') || ''
  const currentSubtopic = searchParams?.get('subtopic') || ''

  // Compute available topics based on year group selection
  const availableTopics = useMemo(() => {
    if (!currentYearGroup) {
      return getAllTopics()
    }
    return getTopicsForYearGroup(currentYearGroup)
  }, [currentYearGroup])

  // Compute available subtopics based on year group and topic selection
  const availableSubtopics = useMemo(() => {
    if (!currentYearGroup && !currentTopic) {
      return getAllSubtopics()
    }
    if (!currentYearGroup && currentTopic) {
      return getSubtopicsForTopic(currentTopic)
    }
    if (currentYearGroup && !currentTopic) {
      return getSubtopicsForYearGroup(currentYearGroup)
    }
    return getSubtopicsForYearGroupAndTopic(currentYearGroup, currentTopic)
  }, [currentYearGroup, currentTopic])

  // Update filter with cascading logic
  const updateFilter = (key: string, value: string) => {
    console.log(`🔧 updateFilter called: key="${key}", value="${value}"`)
    const params = new URLSearchParams(searchParams?.toString() || '')

    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    // Handle cascading filter resets
    if (key === 'year_group') {
      const newYearGroup = value === 'all' ? '' : value
      const existingTopic = params.get('topic')
      const existingSubtopic = params.get('subtopic')

      // Reset topic if it's not valid for the new year group
      if (existingTopic && newYearGroup && !isTopicValidForYearGroup(newYearGroup, existingTopic)) {
        params.delete('topic')
        params.delete('subtopic')
        console.log(`🔄 Cleared topic and subtopic (topic not valid for ${newYearGroup})`)
      } else if (existingSubtopic) {
        // Reset subtopic if it's not valid for new selection
        const topicToCheck = params.get('topic') || ''
        if (!isSubtopicValidForSelection(newYearGroup, topicToCheck, existingSubtopic)) {
          params.delete('subtopic')
          console.log(`🔄 Cleared subtopic (not valid for new selection)`)
        }
      }
    }

    if (key === 'topic') {
      const newTopic = value === 'all' ? '' : value
      const existingSubtopic = params.get('subtopic')

      // Reset subtopic if it's not valid for the new topic
      if (existingSubtopic && !isSubtopicValidForSelection(currentYearGroup, newTopic, existingSubtopic)) {
        params.delete('subtopic')
        console.log(`🔄 Cleared subtopic (not valid for topic ${newTopic})`)
      }
    }

    params.delete('page')
    console.log(`🔧 Pushing to: /library?${params.toString()}`)
    router.push(`/library?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/library')
  }

  const hasActiveFilters = currentYearGroup || currentTopic || currentSubtopic

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
        <Label htmlFor="year_group">Grade Level</Label>
        <Select
          value={currentYearGroup}
          onValueChange={(value) => updateFilter('year_group', value)}
          open={openDropdown === 'year_group'}
          onOpenChange={(isOpen) => {
            setOpenDropdown(isOpen ? 'year_group' : null)
            console.log(`📅 Grade Level dropdown ${isOpen ? 'OPENED' : 'CLOSED'}`)
          }}
        >
          <SelectTrigger id="year_group" className="mt-1">
            <SelectValue placeholder="All Grade Levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grade Levels</SelectItem>
            {YEAR_GROUPS.map((year) => (
              <SelectItem key={year.value} value={year.value}>
                {year.label}
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
            {availableTopics.map((topic) => (
              <SelectItem key={topic.value} value={topic.value}>
                {topic.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {currentYearGroup && availableTopics.length === 0 && (
          <p className="text-xs text-gray-500 mt-1">No topics available for this grade level</p>
        )}
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
            {availableSubtopics.map((subtopic) => (
              <SelectItem key={subtopic.value} value={subtopic.value}>
                {subtopic.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {(currentYearGroup || currentTopic) && availableSubtopics.length === 0 && (
          <p className="text-xs text-gray-500 mt-1">No subtopics available for this selection</p>
        )}
      </div>

      {/* Visual Theme, Activity Type, and Seasonal Theme filters hidden - keeping only Year Group, Topic, and Subtopic */}
    </div>
  )
}
